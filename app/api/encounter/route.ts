import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { constitution, paintingState, memoryEntry, eventHistory } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { interpret } from "@/lib/ai";
import { validate } from "@/lib/rules-engine";
import { z } from "zod";

const Body = z.object({ text: z.string().min(1) });

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "invalid input" }, { status: 400 });

  const [constRow] = await db.select().from(constitution).limit(1);
  const [current] = await db.select().from(paintingState).orderBy(desc(paintingState.version)).limit(1);
  const mem = await db.select().from(memoryEntry).orderBy(desc(memoryEntry.createdAt)).limit(5);

  let proposal;
  try {
    proposal = await interpret(parsed.data.text, constRow, current, mem);
  } catch {
    return NextResponse.json({ outcome: "failure", message: "the painting is quiet right now" });
  }

  const { decision, reason } = validate(proposal, constRow, current);

  if (decision === "commit" && proposal.transformation) {
    const newParams = { ...(current.params as any), ...proposal.transformation };
    const [inserted] = await db.insert(paintingState).values({
      version: current.version + 1,
      parentVersion: current.version,
      params: newParams,
      provenance: { triggeringEventId: null, priorStateVersion: current.version, resultingStateVersion: current.version + 1, constitutionVersion: constRow.version },
    }).returning();
    await db.insert(memoryEntry).values({ type: "transformation", visitorText: parsed.data.text, aiSummary: proposal.response, aiInterpretation: proposal.intent, stateVersionRef: inserted.version });
    await db.insert(eventHistory).values({ type: "transformation", payload: proposal, stateVersionBefore: current.version, stateVersionAfter: inserted.version });
    return NextResponse.json({ outcome: "commit", response: proposal.response, state: inserted });
  }

  await db.insert(memoryEntry).values({ type: decision === "refuse" ? "refusal" : "encounter", visitorText: parsed.data.text, aiSummary: proposal.response, aiInterpretation: proposal.intent, stateVersionRef: current.version });
  return NextResponse.json({ outcome: decision, response: proposal.response ?? reason, reason });
}

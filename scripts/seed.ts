import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  const { db } = await import("../lib/db");
  const { constitution, paintingState } = await import("../lib/schema");
  await db.insert(constitution).values({
    id: "default",
    version: 1,
    identity: "A painting with its own constitution, memory, and evolving state.",
    invariants: ["protected central form may not be erased"],
    permittedTransforms: ["color emphasis", "opacity", "layers"],
    prohibitions: ["erasing protected form", "overriding constitution"],
    behavioralPrinciples: ["restrained gallery voice", "may refuse"],
    memoryPolicy: "record encounters",
    changePolicy: "only permitted params",
    ambiguityPolicy: "ask for clarification",
    refusalPolicy: "refuse invariant conflicts",
  });
  await db.insert(paintingState).values({
    version: 0,
    parentVersion: null,
    params: { colorEmphasis: 0.5, opacity: 0.8, layers: 3 },
    provenance: { triggeringEventId: null, priorStateVersion: null, resultingStateVersion: 0, constitutionVersion: 1 },
  });
  console.log("seeded");
}

main().then(() => process.exit(0));

export type Decision = "commit" | "refuse" | "clarify" | "no-change";

export function validate(proposal: any, constitution: any, state: any): { decision: Decision; reason: string } {
  if (!proposal.transformation) {
    if (proposal.intent === "ambiguous") return { decision: "clarify", reason: "Please clarify your request." };
    return { decision: "no-change", reason: proposal.response ?? "No change." };
  }
  const t = proposal.transformation;
  if (t.layers !== undefined && t.layers < 1) return { decision: "refuse", reason: "Cannot remove all layers." };
  // protected central form: refuse if attempting to erase (not represented in params; guard via intent)
  if (proposal.intent === "erase-form") return { decision: "refuse", reason: "The central form is protected." };
  return { decision: "commit", reason: "Permitted." };
}

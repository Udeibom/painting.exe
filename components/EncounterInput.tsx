"use client";
import { useState } from "react";

const STAGES = ["receiving", "interpreting", "validating", "committing"] as const;

export default function EncounterInput({
  onSubmit,
}: {
  onSubmit: (text: string) => Promise<void>;
}) {
  const [text, setText] = useState("");
  const [stage, setStage] = useState<string | null>(null);

  async function submit() {
    setStage("receiving");
    await onSubmit(text);
    setStage(null);
    setText("");
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-transparent border border-neutral-700 p-2 text-sm"
        rows={2}
      />
      <button onClick={submit} className="self-start border border-neutral-700 px-3 py-1 text-sm">
        Speak
      </button>
      {stage && <p className="text-xs text-neutral-400">{stage}</p>}
    </div>
  );
}

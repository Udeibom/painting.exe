"use client";
import { useState } from "react";
import Painting from "@/components/Painting";
import EncounterInput from "@/components/EncounterInput";

export default function Home() {
  const [state] = useState({ colorEmphasis: 0.5, opacity: 0.8, layers: 3 });
  const [response, setResponse] = useState<string>("");

  async function onSubmit(text: string) {
    await new Promise((r) => setTimeout(r, 300));
    setResponse(`You said: ${text}`);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <div className="w-full max-w-2xl aspect-square">
        <Painting state={state} />
      </div>
      <p className="font-serif text-lg italic">an origin line, attributed to the artist.</p>
      <EncounterInput onSubmit={onSubmit} />
      {response && <p className="text-sm text-neutral-400">{response}</p>}
    </main>
  );
}

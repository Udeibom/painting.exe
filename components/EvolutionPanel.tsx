"use client";
export default function EvolutionPanel({ versions }: { versions: any[] }) {
  return (
    <section className="border border-neutral-800 p-4 text-sm">
      <h2 className="font-serif mb-2">Evolution</h2>
      <ul className="space-y-1">
        {versions.map((v) => (
          <li key={v.version}>v{v.version} — {JSON.stringify(v.params)}</li>
        ))}
      </ul>
    </section>
  );
}

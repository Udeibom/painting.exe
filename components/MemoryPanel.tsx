"use client";
export default function MemoryPanel({ entries }: { entries: any[] }) {
  return (
    <section className="border border-neutral-800 p-4 text-sm">
      <h2 className="font-serif mb-2">Memory</h2>
      <ul className="space-y-2">
        {entries.map((e) => (
          <li key={e.id}>
            <span className="text-neutral-400">{e.type}</span>: {e.visitorText}
            {e.aiSummary && <div className="text-xs text-neutral-500">{e.aiSummary}</div>}
          </li>
        ))}
      </ul>
    </section>
  );
}

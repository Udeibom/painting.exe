"use client";
export default function ConstitutionPanel({ rules }: { rules: string[] }) {
  return (
    <section className="border border-neutral-800 p-4 text-sm">
      <h2 className="font-serif mb-2">Constitution</h2>
      <ul className="list-disc pl-5">
        {rules.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </section>
  );
}

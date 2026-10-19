"use client";
export default function IdentityPanel({ origin }: { origin: string }) {
  return (
    <section className="border border-neutral-800 p-4 text-sm">
      <h2 className="font-serif mb-2">Identity</h2>
      <p className="italic">{origin}</p>
    </section>
  );
}

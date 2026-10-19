"use client";

type State = { colorEmphasis: number; opacity: number; layers: number };

export default function Painting({ state }: { state: State }) {
  const { colorEmphasis, opacity, layers } = state;
  const hue = 30 + colorEmphasis * 60;
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <rect width="400" height="400" fill="#0a0a0a" />
      {Array.from({ length: layers }).map((_, i) => (
        <circle
          key={i}
          cx={200}
          cy={200}
          r={60 + i * 20}
          fill={`hsl(${hue}, 60%, 50%)`}
          opacity={opacity * (1 - i * 0.15)}
        />
      ))}
      <rect x="170" y="170" width="60" height="60" fill="#f5f1ea" opacity={0.9} />
    </svg>
  );
}

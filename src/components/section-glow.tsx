/**
 * Ambient radial gradient overlay — adds subtle depth variation to each
 * section on top of the 3D canvas layer. Pure CSS, no canvas overhead.
 *
 * Alternates position based on the section's parity: odd sections glow
 * from the top-right, even sections from the bottom-left — creating
 * visual rhythm without breaking the dark-stage continuity.
 *
 * Animate `transform` and `opacity` only.
 */
export function SectionGlow({ index }: { index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "70vw",
          height: "70vw",
          maxWidth: 900,
          maxHeight: 900,
          borderRadius: "50%",
          top: isEven ? "-20%" : "auto",
          bottom: isEven ? "auto" : "-20%",
          right: isEven ? "-15%" : "auto",
          left: isEven ? "auto" : "-15%",
          background: isEven
            ? "radial-gradient(closest-side, color-mix(in srgb, var(--amber) 5%, transparent), transparent 70%)"
            : "radial-gradient(closest-side, color-mix(in srgb, var(--teal) 4%, transparent), transparent 70%)",
          opacity: 0.7,
        }}
      />
    </div>
  );
}

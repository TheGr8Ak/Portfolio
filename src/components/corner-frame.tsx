/**
 * Fixed corner bracket marks — the four "⌐" viewport marks that make a
 * full-bleed page read as a contained, designed instrument panel rather
 * than an endless scroll of sections. Purely decorative, pointer-events
 * none, sits above content but below the cursor/nav.
 *
 * Each bracket is a simple two-line L-shape drawn with borders so it
 * inherits --line and needs no SVG asset.
 */
export function CornerFrame() {
  const size = 22;
  const base: React.CSSProperties = {
    position: "fixed",
    width: size,
    height: size,
    pointerEvents: "none",
    zIndex: 45,
    opacity: 0.55,
  };

  return (
    <div aria-hidden="true">
      <span
        style={{
          ...base,
          top: 16,
          left: 16,
          borderTop: "1px solid var(--line)",
          borderLeft: "1px solid var(--line)",
        }}
      />
      <span
        style={{
          ...base,
          top: 16,
          right: 16,
          borderTop: "1px solid var(--line)",
          borderRight: "1px solid var(--line)",
        }}
      />
      <span
        style={{
          ...base,
          bottom: 16,
          left: 16,
          borderBottom: "1px solid var(--line)",
          borderLeft: "1px solid var(--line)",
        }}
      />
      <span
        style={{
          ...base,
          bottom: 16,
          right: 16,
          borderBottom: "1px solid var(--line)",
          borderRight: "1px solid var(--line)",
        }}
      />
    </div>
  );
}

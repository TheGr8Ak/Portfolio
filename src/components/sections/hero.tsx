import { useEffect, useRef } from "react";
import { hero } from "@/lib/content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ScrollCue } from "@/components/scroll-cue";

/**
 * Hero section — name, role line, tagline, 4 stat callouts.
 * The 3D backdrop is now provided by the global StageCanvas in the root
 * layout. This section adds ambient glow blobs on top for warmth.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Pointer-tracked ambient spotlight
  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center min-h-screen overflow-hidden"
      style={{
        paddingBlock: 0,
        background: "transparent",
        // @ts-expect-error -- custom property, not a typed CSS key
        "--mx": "50%",
        "--my": "40%",
      }}
    >
      {/* Ambient glow blobs — pointer-tracked + fixed ember */}
      <div
        className="absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(480px circle at var(--mx) var(--my), color-mix(in srgb, var(--amber) 12%, transparent), transparent 70%)",
          transition: "background 0.15s linear",
        }}
      />
      <div
        className="absolute z-[1]"
        aria-hidden="true"
        style={{
          pointerEvents: "none",
          left: "50%",
          bottom: "-20%",
          width: "60vw",
          height: "60vw",
          maxWidth: 900,
          maxHeight: 900,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--teal) 8%, transparent), transparent 75%)",
        }}
      />

      {/* Content overlay */}
      <div
        className="relative z-10 w-full container-section"
        style={{ paddingBlock: "var(--space-16)" }}
      >
        {/* Status badge */}
        <span
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{
            marginBottom: "var(--space-5)",
            border: "1px solid var(--line)",
            background: "color-mix(in srgb, var(--bg-stage) 80%, transparent)",
          }}
        >
          <span
            className="block rounded-full"
            style={{
              width: 6,
              height: 6,
              background: "var(--amber)",
              boxShadow: "0 0 8px var(--amber)",
            }}
          />
          <span
            className="text-label"
            style={{ color: "var(--paper-dim)", fontSize: "10px" }}
          >
            Open to roles &middot; 2026 grad
          </span>
        </span>

        {/* Name — serif display at top of the h1 scale */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h1)",
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
            fontWeight: 900,
            color: "var(--paper)",
            marginBottom: "var(--space-4)",
          }}
        >
          {hero.name.map((word, i) => (
            <span
              key={i}
              className="block"
              style={
                i === 1
                  ? { color: "var(--amber)", marginTop: "-0.04em" }
                  : undefined
              }
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Role line */}
        <p
          className="text-label"
          style={{
            color: "var(--amber)",
            letterSpacing: "0.25em",
            marginBottom: "var(--space-3)",
          }}
        >
          {hero.role}
        </p>

        {/* Tagline */}
        <p
          className="max-w-xl"
          style={{
            color: "var(--paper-dim)",
            lineHeight: 1.7,
            fontSize: "var(--text-body)",
            marginBottom: "var(--space-8)",
          }}
        >
          {hero.tagline}
        </p>

        {/* Stat callouts — tightened to 8px grid, equal columns */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: "var(--space-4)" }}
        >
          {hero.stats.map((stat) => (
            <div key={stat.l}>
              <span
                className="text-numeral block"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "var(--amber)",
                  marginBottom: "var(--space-1)",
                }}
              >
                {stat.n}
              </span>
              <span
                className="text-label"
                style={{
                  color: "var(--paper-dim)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                }}
              >
                {stat.l}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <ScrollCue />
      </div>
    </section>
  );
}

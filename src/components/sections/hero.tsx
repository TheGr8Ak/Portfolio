import { lazy, Suspense } from "react";
import { hero } from "@/lib/content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const HeroScene = lazy(() =>
  import("@/components/hero-scene").then((m) => ({ default: m.HeroScene })),
);

/**
 * Hero section — name, role line, tagline, 4 stat callouts.
 * The R3F scene is lazy-loaded with React.lazy + Suspense. The fallback
 * is the hero itself without the 3D layer (no spinner, no layout shift),
 * since the hero reads as complete pure typography without the wireframe.
 */
export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex items-center min-h-screen overflow-hidden"
      style={{ paddingBlock: 0 }}
    >
      {/* R3F backdrop — lazy loaded, skipped under reduced motion */}
      {!reduced && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      {/* Content overlay */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-32">
        {/* Name */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[150px] mb-6"
          style={{
            fontFamily: "var(--font-display)",
            lineHeight: 0.88,
            fontWeight: 900,
            color: "var(--paper)",
          }}
        >
          {hero.name.map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </h1>

        {/* Role line */}
        <p
          className="text-[11px] sm:text-xs tracking-[0.25em] mb-6"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--amber)",
          }}
        >
          {hero.role}
        </p>

        {/* Tagline */}
        <p
          className="max-w-xl text-sm md:text-base mb-12"
          style={{
            color: "var(--paper-dim)",
            lineHeight: 1.7,
          }}
        >
          {hero.tagline}
        </p>

        {/* Stat callouts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {hero.stats.map((stat) => (
            <div key={stat.l}>
              <span
                className="block text-3xl md:text-4xl mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--amber)",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {stat.n}
              </span>
              <span
                className="text-[10px] tracking-[0.15em] uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--paper-dim)",
                }}
              >
                {stat.l}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--paper-dim)",
          }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(to bottom, var(--paper-dim), transparent)",
          }}
        />
      </div>
    </section>
  );
}

import type { Project } from "@/lib/content";

/**
 * Project card with hover spec-sheet reveal. Base card shows index, title,
 * description, and tag pills. On hover, an amber overlay circle-clips in
 * from the top-right corner showing the spec entries as a definition list.
 *
 * Uses CSS :hover + clip-path transition (not GSAP) since it's a discrete
 * hover state, not scroll-driven.
 */
export function ProjectCard({
  num,
  title,
  description,
  tags,
  spec,
}: Project) {
  return (
    <div className="card group relative overflow-hidden" data-hover>
      {/* Base card content */}
      <div
        className="relative z-0 flex h-full flex-col p-6 md:p-8"
        style={{
          background: "var(--ink-2)",
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-token)",
          minHeight: 320,
        }}
      >
        {/* Index number */}
        <span
          className="text-[64px] md:text-[80px] leading-none mb-4"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--ink-3)",
            lineHeight: 0.8,
          }}
          aria-hidden="true"
        >
          {num}
        </span>

        {/* Title */}
        <h3
          className="text-xl md:text-2xl mb-3"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--paper)",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-sm mb-6 flex-1"
          style={{ color: "var(--paper-dim)", lineHeight: 1.6 }}
        >
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 text-[10px] tracking-wider uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                background: "var(--ink-3)",
                color: "var(--paper-dim)",
                borderRadius: "var(--radius-token)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Spec-sheet hover overlay */}
      <div
        className="absolute inset-0 z-10 flex flex-col justify-center p-6 md:p-8 transition-[clip-path] duration-[600ms] ease-out"
        style={{
          background: "var(--amber)",
          clipPath: "circle(0% at 88% 12%)",
          borderRadius: "var(--radius-token)",
        }}
        // CSS hover transition via group-hover
        aria-hidden="true"
      >
        <h4
          className="text-lg mb-6 uppercase"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--ink)",
            fontWeight: 800,
          }}
        >
          Spec Sheet
        </h4>
        <dl className="grid gap-3">
          {Object.entries(spec).map(([key, val]) => (
            <div key={key} className="flex justify-between gap-4">
              <dt
                className="text-[11px] uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink)",
                  opacity: 0.7,
                }}
              >
                {key}
              </dt>
              <dd
                className="text-[13px] text-right"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink)",
                  fontWeight: 600,
                }}
              >
                {val}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* CSS to trigger the clip-path on hover */}
      <style>{`
        .card:hover > div[aria-hidden="true"] {
          clip-path: circle(150% at 88% 12%) !important;
        }
      `}</style>
    </div>
  );
}

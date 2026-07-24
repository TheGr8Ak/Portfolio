import type { Project } from "@/lib/content";

/**
 * Project card with hover spec-sheet reveal. Base card shows index, title,
 * description, and tag pills. On hover, an amber overlay circle-clips in
 * from the top-right corner showing the spec entries as a definition list.
 *
 * Uses CSS :hover + clip-path transition (not GSAP) since it's a discrete
 * hover state, not scroll-driven.
 *
 * Typography: index numeral in condensed sans, title in serif display,
 * tags in mono label style.
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
        className="relative z-0 flex h-full flex-col"
        style={{
          padding: "var(--space-4)",
          background: "color-mix(in srgb, var(--ink-2) 80%, transparent)",
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-token)",
          minHeight: 320,
        }}
      >
        {/* Index number — condensed sans */}
        <span
          className="text-numeral"
          style={{
            fontSize: "clamp(4rem, 5vw, 5rem)",
            color: "var(--ink-3)",
            opacity: 0.6,
            marginBottom: "var(--space-2)",
          }}
          aria-hidden="true"
        >
          {num}
        </span>

        {/* Title — serif display */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h3)",
            color: "var(--paper)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            fontWeight: 800,
            marginBottom: "var(--space-2)",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="flex-1"
          style={{
            color: "var(--paper-dim)",
            fontSize: "0.875rem",
            lineHeight: 1.7,
            marginBottom: "var(--space-3)",
          }}
        >
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-label inline-block"
              style={{
                padding: "4px 8px",
                background: "color-mix(in srgb, var(--ink-3) 80%, transparent)",
                color: "var(--paper-dim)",
                borderRadius: "var(--radius-token)",
                fontSize: "10px",
                letterSpacing: "0.12em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Spec-sheet hover overlay */}
      <div
        className="absolute inset-0 z-10 flex flex-col justify-center transition-[clip-path] duration-[600ms] ease-out"
        style={{
          padding: "var(--space-4)",
          background: "var(--amber)",
          clipPath: "circle(0% at 88% 12%)",
          borderRadius: "var(--radius-token)",
        }}
        aria-hidden="true"
      >
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            color: "var(--ink)",
            fontWeight: 800,
            letterSpacing: "-0.01em",
            marginBottom: "var(--space-3)",
          }}
        >
          Spec Sheet
        </h4>
        <dl style={{ display: "grid", gap: "var(--space-1)" }}>
          {Object.entries(spec).map(([key, val]) => (
            <div key={key} className="flex justify-between gap-4">
              <dt
                className="text-label"
                style={{
                  color: "var(--ink)",
                  opacity: 0.7,
                  fontSize: "0.6875rem",
                }}
              >
                {key}
              </dt>
              <dd
                className="text-right"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
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

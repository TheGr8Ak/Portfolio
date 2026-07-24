import { WipeCurtain } from "./wipe-curtain";

interface SectionHeadProps {
  eyebrow: string;
  heading: string[];
  /** Index label, e.g. "01" */
  index?: string;
}

/**
 * Section heading wrapper — eyebrow label + H2 + optional index,
 * wrapped in the wipe-curtain reveal animation. Serif display font
 * for headings, tracked mono for the eyebrow.
 */
export function SectionHead({ eyebrow, heading, index }: SectionHeadProps) {
  return (
    <WipeCurtain>
      <div style={{ marginBottom: "var(--space-8)" }}>
        {/* Eyebrow */}
        <p
          className="text-label"
          style={{
            color: "var(--paper-dim)",
            marginBottom: "var(--space-2)",
          }}
        >
          {eyebrow}
        </p>

        {/* Heading */}
        <div className="flex items-end gap-6">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              color: "var(--paper)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              fontWeight: 800,
            }}
          >
            {heading.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>

          {index && (
            <span
              className="hidden md:block"
              style={{
                fontFamily: "var(--font-condensed)",
                fontSize: "clamp(5rem, 8vw, 7.5rem)",
                color: "#DDD3BC",
                lineHeight: 0.8,
                opacity: 0.7,
              }}
              aria-hidden="true"
            >
              {index}
            </span>
          )}
        </div>
      </div>
    </WipeCurtain>
  );
}

import { WipeCurtain } from "./wipe-curtain";

interface SectionHeadProps {
  eyebrow: string;
  heading: string[];
  /** Index label, e.g. "01" */
  index?: string;
}

/**
 * Section heading wrapper — eyebrow label + H2 + optional index,
 * wrapped in the wipe-curtain reveal animation.
 */
export function SectionHead({ eyebrow, heading, index }: SectionHeadProps) {
  return (
    <WipeCurtain>
      <div className="mb-12 md:mb-16">
        {/* Eyebrow */}
        <p
          className="mb-4 text-[11px] tracking-[0.2em] uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--paper-dim)",
          }}
        >
          {eyebrow}
        </p>

        {/* Heading */}
        <div className="flex items-end gap-6">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--paper)",
              lineHeight: 0.92,
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
              className="hidden md:block text-[80px] lg:text-[120px] leading-none"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--ink-3)",
                lineHeight: 0.8,
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

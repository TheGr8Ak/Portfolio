import { useReveal } from "@/hooks/use-reveal";

interface SkillChipsProps {
  title: string;
  items: readonly string[];
}

/**
 * Skill chip grid — group heading + grid of mono-font chips with
 * sharp corners and semi-transparent background. Reveals on scroll.
 */
export function SkillChips({ title, items }: SkillChipsProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <h3
        className="text-label"
        style={{
          color: "var(--amber)",
          marginBottom: "var(--space-2)",
        }}
      >
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-block transition-colors duration-200 hover:bg-amber hover:text-ink"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              padding: "6px 12px",
              background: "color-mix(in srgb, var(--ink-3) 80%, transparent)",
              color: "var(--paper)",
              borderRadius: "var(--radius-token)",
              border: "1px solid var(--line)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

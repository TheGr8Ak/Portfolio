import { useReveal } from "@/hooks/use-reveal";

interface SkillChipsProps {
  title: string;
  items: readonly string[];
}

/**
 * Skill chip grid — group heading + grid of mono-font chips with
 * sharp corners and ink-3 background. Reveals on scroll.
 */
export function SkillChips({ title, items }: SkillChipsProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <h3
        className="text-[11px] tracking-[0.2em] uppercase mb-4"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--amber)",
        }}
      >
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-block px-3 py-1.5 text-[12px] transition-colors duration-200 hover:bg-amber hover:text-ink"
            style={{
              fontFamily: "var(--font-mono)",
              background: "var(--ink-3)",
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

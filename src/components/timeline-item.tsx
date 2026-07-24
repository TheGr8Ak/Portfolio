import { useReveal } from "@/hooks/use-reveal";
import type { ExperienceEntry } from "@/lib/content";

/**
 * Timeline row — left border + dot, role title in display font,
 * org + meta line, bullet list. Fade-up reveal on scroll.
 */
export function TimelineItem({ role, org, meta, bullets }: ExperienceEntry) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="relative pl-8 pb-12 last:pb-0">
      {/* Vertical line */}
      <div
        className="absolute left-0 top-2 bottom-0 w-px"
        style={{ background: "var(--line)" }}
        aria-hidden="true"
      />
      {/* Dot */}
      <div
        className="absolute left-0 top-2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
        style={{
          background: "var(--amber)",
          border: "2px solid var(--ink)",
        }}
        aria-hidden="true"
      />

      {/* Role title */}
      <h3
        className="text-xl md:text-2xl mb-1"
        style={{
          fontFamily: "var(--font-display)",
          textTransform: "uppercase",
          lineHeight: 1,
          color: "var(--paper)",
        }}
      >
        {role}
      </h3>

      {/* Org */}
      <p
        className="text-sm mb-1"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--amber)",
          fontWeight: 600,
        }}
      >
        {org}
      </p>

      {/* Meta */}
      <p
        className="text-[11px] tracking-wider uppercase mb-4"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--paper-dim)",
        }}
      >
        {meta}
      </p>

      {/* Bullets */}
      <ul className="space-y-2">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="text-sm leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-amber"
            style={{ color: "var(--paper-dim)" }}
          >
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useReveal } from "@/hooks/use-reveal";
import type { ExperienceEntry } from "@/lib/content";

/**
 * Timeline row — proper left rail (fixed-width connector line + dot),
 * role title in serif display, org in accent, meta in label style,
 * bullet list with generous spacing. Fade-up reveal on scroll.
 *
 * The rail is 24px wide with the dot centered; content starts at pl-12
 * giving 48px of breathing room.
 */
export function TimelineItem({ role, org, meta, bullets }: ExperienceEntry) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        paddingLeft: "var(--space-6)",
        paddingBottom: "var(--space-6)",
      }}
    >
      {/* Vertical connector line — centered at 12px from left */}
      <div
        className="absolute top-3 bottom-0"
        style={{
          left: 11,
          width: 1,
          background: "var(--line)",
        }}
        aria-hidden="true"
      />

      {/* Dot — centered on the line */}
      <div
        className="absolute rounded-full"
        style={{
          left: 7,
          top: 8,
          width: 10,
          height: 10,
          background: "var(--amber)",
          border: "2px solid var(--bg-stage)",
          boxShadow: "0 0 12px var(--amber-dim)",
        }}
        aria-hidden="true"
      />

      {/* Content card */}
      <div
        style={{
          padding: "var(--space-3)",
          paddingLeft: "var(--space-4)",
          borderRadius: "var(--radius-token)",
        }}
      >
        {/* Role title — serif display */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h3)",
            lineHeight: 1.1,
            color: "var(--paper)",
            fontWeight: 800,
            letterSpacing: "-0.01em",
            marginBottom: "var(--space-1)",
          }}
        >
          {role}
        </h3>

        {/* Org — accent color, mono */}
        <p
          className="text-label"
          style={{
            color: "var(--amber)",
            fontWeight: 600,
            fontSize: "0.8125rem",
            letterSpacing: "0.1em",
            marginBottom: "4px",
          }}
        >
          {org}
        </p>

        {/* Meta — date/location */}
        <p
          className="text-label"
          style={{
            color: "var(--paper-dim)",
            marginBottom: "var(--space-3)",
          }}
        >
          {meta}
        </p>

        {/* Bullets */}
        <ul style={{ display: "grid", gap: "var(--space-1)" }}>
          {bullets.map((b, i) => (
            <li
              key={i}
              className="relative"
              style={{
                paddingLeft: "var(--space-3)",
                color: "var(--paper-dim)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                maxWidth: "36rem",
              }}
            >
              <span
                className="absolute"
                style={{
                  left: 0,
                  color: "var(--amber)",
                  fontFamily: "var(--font-mono)",
                }}
                aria-hidden="true"
              >
                —
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

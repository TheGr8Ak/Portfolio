import { hackathons } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { useReveal } from "@/hooks/use-reveal";
import { SectionGlow } from "@/components/section-glow";

/**
 * Circuits section — hackathon entries. Each row shows the hackathon
 * name, description, and a tag badge.
 */
export function Circuits() {
  return (
    <section id="circuits" style={{ background: "transparent" }}>
      <SectionGlow index={4} />
      <div className="container-section relative z-[2]">
        <SectionHead
          eyebrow="04 / CIRCUITS"
          heading={["Race-day", "proving grounds."]}
          index="04"
        />

        <div style={{ display: "grid", gap: "var(--space-3)" }}>
          {hackathons.map((hack) => (
            <HackathonRow key={hack.name} {...hack} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HackathonRow({
  name,
  desc,
  tag,
}: {
  name: string;
  desc: string;
  tag: string;
}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row md:items-center justify-between"
      style={{
        gap: "var(--space-2)",
        padding: "var(--space-3)",
        background: "color-mix(in srgb, var(--ink-2) 80%, transparent)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-token)",
      }}
    >
      <div className="flex-1">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h3)",
            color: "var(--paper)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            marginBottom: "var(--space-1)",
          }}
        >
          {name}
        </h3>
        <p
          style={{
            color: "var(--paper-dim)",
            fontSize: "0.875rem",
            lineHeight: 1.7,
          }}
        >
          {desc}
        </p>
      </div>

      <span
        className="text-label inline-block self-start whitespace-nowrap"
        style={{
          padding: "6px 12px",
          background: "color-mix(in srgb, var(--ink-3) 80%, transparent)",
          color: "var(--teal)",
          borderRadius: "var(--radius-token)",
          border: "1px solid var(--line)",
          fontSize: "10px",
          letterSpacing: "0.15em",
        }}
      >
        {tag}
      </span>
    </div>
  );
}

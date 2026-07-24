import { hackathons } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { useReveal } from "@/hooks/use-reveal";

/**
 * Circuits section — hackathon entries. Each row shows the hackathon
 * name, description, and a tag badge.
 */
export function Circuits() {
  return (
    <section id="circuits">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHead
          eyebrow="04 / CIRCUITS"
          heading={["Race-day", "proving grounds."]}
          index="04"
        />

        <div className="space-y-6">
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
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6"
      style={{
        background: "var(--ink-2)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-token)",
      }}
    >
      <div className="flex-1">
        <h3
          className="text-lg md:text-xl mb-2"
          style={{
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            color: "var(--paper)",
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {name}
        </h3>
        <p
          className="text-sm"
          style={{ color: "var(--paper-dim)", lineHeight: 1.6 }}
        >
          {desc}
        </p>
      </div>

      <span
        className="inline-block self-start px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase whitespace-nowrap"
        style={{
          fontFamily: "var(--font-mono)",
          background: "var(--ink-3)",
          color: "var(--teal)",
          borderRadius: "var(--radius-token)",
          border: "1px solid var(--line)",
        }}
      >
        {tag}
      </span>
    </div>
  );
}

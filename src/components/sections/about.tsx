import { about } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { useReveal } from "@/hooks/use-reveal";

/**
 * About section — two paragraphs + "Driver Card" side panel with
 * key-value rows. The Driver Card echoes the telemetry/data aesthetic.
 */
export function About() {
  const contentRef = useReveal<HTMLDivElement>();

  return (
    <section id="about">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHead
          eyebrow={about.eyebrow}
          heading={about.heading}
          index="01"
        />

        <div ref={contentRef} className="grid md:grid-cols-5 gap-12 md:gap-16">
          {/* Paragraphs — 3 cols */}
          <div className="md:col-span-3 space-y-6">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "var(--paper-dim)" }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Driver Card — 2 cols */}
          <div className="md:col-span-2">
            <div
              className="p-6"
              style={{
                background: "var(--ink-2)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-token)",
              }}
            >
              <h3
                className="text-[11px] tracking-[0.2em] uppercase mb-6"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--amber)",
                }}
              >
                Driver Card
              </h3>

              <dl className="space-y-4">
                {about.driverCard.map((row) => (
                  <div
                    key={row.k}
                    className="flex justify-between items-baseline pb-3"
                    style={{
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <dt
                      className="text-[11px] tracking-wider uppercase"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--paper-dim)",
                      }}
                    >
                      {row.k}
                    </dt>
                    <dd
                      className="text-[13px] font-semibold"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: row.accent
                          ? "var(--amber)"
                          : "var(--paper)",
                      }}
                    >
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

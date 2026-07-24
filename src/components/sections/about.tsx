import { about } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { useReveal } from "@/hooks/use-reveal";
import { SectionGlow } from "@/components/section-glow";

/**
 * About section — two paragraphs + "Driver Card" side panel with
 * key-value rows. Uses serif display via SectionHead, token-based spacing.
 */
export function About() {
  const contentRef = useReveal<HTMLDivElement>();

  return (
    <section id="about" style={{ background: "transparent" }}>
      <SectionGlow index={1} />
      <div className="container-section relative z-[2]">
        <SectionHead
          eyebrow={about.eyebrow}
          heading={about.heading}
          index="01"
        />

        <div
          ref={contentRef}
          className="grid md:grid-cols-5"
          style={{ gap: "var(--space-8)" }}
        >
          {/* Paragraphs — 3 cols */}
          <div className="md:col-span-3" style={{ display: "grid", gap: "var(--space-3)" }}>
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  color: "var(--paper-dim)",
                  fontSize: "var(--text-body)",
                  lineHeight: 1.7,
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Driver Card — 2 cols */}
          <div className="md:col-span-2">
            <div
              style={{
                padding: "var(--space-3)",
                background: "color-mix(in srgb, var(--ink-2) 80%, transparent)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-token)",
              }}
            >
              <h3
                className="text-label"
                style={{
                  color: "var(--amber)",
                  marginBottom: "var(--space-3)",
                }}
              >
                Driver Card
              </h3>

              <dl style={{ display: "grid", gap: "var(--space-2)" }}>
                {about.driverCard.map((row) => (
                  <div
                    key={row.k}
                    className="flex justify-between items-baseline"
                    style={{
                      paddingBottom: "var(--space-1)",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <dt
                      className="text-label"
                      style={{ color: "var(--paper-dim)" }}
                    >
                      {row.k}
                    </dt>
                    <dd
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
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

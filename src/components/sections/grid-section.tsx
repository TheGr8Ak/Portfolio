import { education, certifications } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { useReveal } from "@/hooks/use-reveal";
import { SectionGlow } from "@/components/section-glow";

/**
 * Grid section — education list + certifications list in a 2-column layout
 * with shared baseline alignment. Uses consistent serif display and token spacing.
 */
export function Grid() {
  return (
    <section id="grid" style={{ background: "transparent" }}>
      <SectionGlow index={6} />
      <div className="container-section relative z-[2]">
        <SectionHead
          eyebrow="06 / GRID"
          heading={["Formation", "history."]}
          index="06"
        />

        <div
          className="grid md:grid-cols-2"
          style={{ gap: "var(--space-8)" }}
        >
          {/* Education */}
          <EducationList />
          {/* Certifications */}
          <CertificationList />
        </div>
      </div>
    </section>
  );
}

function EducationList() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <h3
        className="text-label"
        style={{
          color: "var(--amber)",
          marginBottom: "var(--space-3)",
        }}
      >
        Education
      </h3>

      {/* Accent vertical bar — intentional Vogue-style graphic rule */}
      <div
        style={{
          borderLeft: "2px solid var(--amber)",
          paddingLeft: "var(--space-3)",
          display: "grid",
          gap: "var(--space-3)",
        }}
      >
        {education.map((edu) => (
          <div
            key={edu.school}
            style={{
              paddingBottom: "var(--space-3)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div
              className="flex justify-between items-start"
              style={{ gap: "var(--space-2)", marginBottom: "4px" }}
            >
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.125rem",
                  color: "var(--paper)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                {edu.school}
              </h4>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  color: "var(--amber)",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {edu.score}
              </span>
            </div>
            <p
              className="text-label"
              style={{
                color: "var(--paper-dim)",
                fontSize: "0.75rem",
              }}
            >
              {edu.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificationList() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <h3
        className="text-label"
        style={{
          color: "var(--amber)",
          marginBottom: "var(--space-3)",
        }}
      >
        Certifications
      </h3>

      {/* Matching accent rule for visual alignment with Education column */}
      <div
        style={{
          borderLeft: "2px solid var(--teal)",
          paddingLeft: "var(--space-3)",
          display: "grid",
          gap: "var(--space-2)",
        }}
      >
        {certifications.map((cert, i) => (
          <div
            key={`${cert.name}-${i}`}
            className="flex justify-between items-baseline"
            style={{
              gap: "var(--space-2)",
              paddingBottom: "var(--space-1)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <span
              style={{
                color: "var(--paper)",
                fontSize: "0.875rem",
              }}
            >
              {cert.name}
            </span>
            <span
              className="text-label whitespace-nowrap"
              style={{
                color: "var(--paper-dim)",
                fontSize: "0.6875rem",
              }}
            >
              {cert.by}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

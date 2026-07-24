import { education, certifications } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { useReveal } from "@/hooks/use-reveal";

/**
 * Grid section — education list + certifications list in a 2-column layout.
 */
export function Grid() {
  return (
    <section id="grid">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHead
          eyebrow="06 / GRID"
          heading={["Formation", "history."]}
          index="06"
        />

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
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
        className="text-[11px] tracking-[0.2em] uppercase mb-6"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--amber)",
        }}
      >
        Education
      </h3>

      <div className="space-y-6">
        {education.map((edu) => (
          <div
            key={edu.school}
            className="pb-6"
            style={{ borderBottom: "1px solid var(--line)" }}
          >
            <div className="flex justify-between items-start gap-4 mb-1">
              <h4
                className="text-base md:text-lg"
                style={{
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                  color: "var(--paper)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                }}
              >
                {edu.school}
              </h4>
              <span
                className="text-[13px] whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--amber)",
                  fontWeight: 600,
                }}
              >
                {edu.score}
              </span>
            </div>
            <p
              className="text-[12px]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--paper-dim)",
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
        className="text-[11px] tracking-[0.2em] uppercase mb-6"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--amber)",
        }}
      >
        Certifications
      </h3>

      <div className="space-y-4">
        {certifications.map((cert, i) => (
          <div
            key={`${cert.name}-${i}`}
            className="flex justify-between items-baseline gap-4 pb-3"
            style={{ borderBottom: "1px solid var(--line)" }}
          >
            <span
              className="text-sm"
              style={{ color: "var(--paper)" }}
            >
              {cert.name}
            </span>
            <span
              className="text-[11px] tracking-wider uppercase whitespace-nowrap"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--paper-dim)",
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

import { skills } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { SkillChips } from "@/components/skill-chips";
import { SectionGlow } from "@/components/section-glow";

/**
 * Telemetry section — 4 skill-chip groups: Languages, Frameworks,
 * Databases & Cloud, AI/ML Concepts.
 */
export function Telemetry() {
  return (
    <section id="telemetry" style={{ background: "transparent" }}>
      <SectionGlow index={5} />
      <div className="container-section relative z-[2]">
        <SectionHead
          eyebrow="05 / TELEMETRY"
          heading={["Full stack", "readout."]}
          index="05"
        />

        <div
          className="grid md:grid-cols-2"
          style={{ gap: "var(--space-6)" }}
        >
          <SkillChips title="Languages" items={skills.languages} />
          <SkillChips title="Frameworks & Libraries" items={skills.frameworks} />
          <SkillChips title="Databases & Cloud" items={skills.databases} />
          <SkillChips title="AI/ML Concepts" items={skills.concepts} />
        </div>
      </div>
    </section>
  );
}

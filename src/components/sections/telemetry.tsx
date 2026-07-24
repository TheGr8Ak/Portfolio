import { skills } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { SkillChips } from "@/components/skill-chips";

/**
 * Telemetry section — 4 skill-chip groups: Languages, Frameworks,
 * Databases & Cloud, AI/ML Concepts.
 */
export function Telemetry() {
  return (
    <section id="telemetry">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHead
          eyebrow="05 / TELEMETRY"
          heading={["Full stack", "readout."]}
          index="05"
        />

        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          <SkillChips title="Languages" items={skills.languages} />
          <SkillChips title="Frameworks & Libraries" items={skills.frameworks} />
          <SkillChips title="Databases & Cloud" items={skills.databases} />
          <SkillChips title="AI/ML Concepts" items={skills.concepts} />
        </div>
      </div>
    </section>
  );
}

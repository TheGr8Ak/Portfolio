import { experience } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { TimelineItem } from "@/components/timeline-item";
import { SectionGlow } from "@/components/section-glow";

/**
 * Experience section — vertical timeline with role entries.
 * Wider layout (no max-w-2xl) for more breathing room.
 */
export function Experience() {
  return (
    <section id="experience" style={{ background: "transparent" }}>
      <SectionGlow index={2} />
      <div className="container-section relative z-[2]">
        <SectionHead
          eyebrow="02 / TRACK RECORD"
          heading={["Built on", "real laps."]}
          index="02"
        />

        <div className="max-w-3xl">
          {experience.map((entry) => (
            <TimelineItem key={entry.role + entry.org} {...entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

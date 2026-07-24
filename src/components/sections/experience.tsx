import { experience } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { TimelineItem } from "@/components/timeline-item";

/**
 * Experience section — vertical timeline with role entries.
 */
export function Experience() {
  return (
    <section id="experience">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHead
          eyebrow="02 / TRACK RECORD"
          heading={["Built on", "real laps."]}
          index="02"
        />

        <div className="max-w-2xl">
          {experience.map((entry) => (
            <TimelineItem key={entry.role + entry.org} {...entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { projects as projectsData } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { ProjectCard } from "@/components/project-card";
import { SectionGlow } from "@/components/section-glow";

/**
 * Projects section — 2×2 grid of project cards with hover spec-sheet reveal.
 */
export function Projects() {
  return (
    <section id="projects" style={{ background: "transparent" }}>
      <SectionGlow index={3} />
      <div className="container-section relative z-[2]">
        <SectionHead
          eyebrow="03 / GARAGE"
          heading={["What I've", "engineered."]}
          index="03"
        />

        <div
          className="grid md:grid-cols-2"
          style={{ gap: "var(--space-3)" }}
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.num} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

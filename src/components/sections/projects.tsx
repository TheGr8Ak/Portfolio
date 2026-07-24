import { projects as projectsData } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { ProjectCard } from "@/components/project-card";

/**
 * Projects section — 2×2 grid of project cards with hover spec-sheet reveal.
 */
export function Projects() {
  return (
    <section id="projects">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHead
          eyebrow="03 / GARAGE"
          heading={["What I've", "engineered."]}
          index="03"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <ProjectCard key={project.num} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

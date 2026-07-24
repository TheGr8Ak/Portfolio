import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Circuits } from "@/components/sections/circuits";
import { Telemetry } from "@/components/sections/telemetry";
import { Grid } from "@/components/sections/grid-section";
import { Contact } from "@/components/sections/contact";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Circuits />
      <Telemetry />
      <Grid />
      <Contact />
    </main>
  );
}

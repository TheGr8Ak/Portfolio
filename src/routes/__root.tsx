import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Cursor } from "@/components/cursor";
import { ProgressBar } from "@/components/progress-bar";
import { SectorRail } from "@/components/sector-rail";
import { LenisProvider } from "@/hooks/use-lenis";
import { LetterLink } from "@/components/letter-link";
import { brand } from "@/lib/content";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Aaryaman Kattali — AIML Engineer Portfolio",
      },
      {
        name: "description",
        content:
          "Portfolio of Aaryaman Kattali — AIML Engineer specializing in agentic AI systems, computer vision pipelines, and machine learning. Based in Mumbai, India.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <LenisProvider>
          <Cursor />
          <ProgressBar />
          <SectorRail />
          <Header />
          {children}
        </LenisProvider>
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Minimal top header — brand mark on the left, 3 letter-link nav items
 * on the right (pointing to in-page anchors). Visible on all breakpoints.
 */
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 lg:px-20 py-5">
      {/* Brand */}
      <a
        href="#hero"
        className="flex items-baseline gap-1"
        aria-label="Back to top"
        data-hover
      >
        <span
          className="text-lg font-bold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--paper)",
          }}
        >
          {brand.mark}
        </span>
        <span
          className="text-[10px] tracking-wider"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--paper-dim)",
          }}
        >
          {brand.suffix}
        </span>
        <span
          className="text-[10px] tracking-wider ml-2 hidden sm:inline"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--paper-dim)",
          }}
        >
          {brand.tag}
        </span>
      </a>

      {/* Nav links */}
      <nav className="flex items-center gap-6" aria-label="Primary navigation">
        <LetterLink href="#experience" label="Track Record" />
        <LetterLink href="#projects" label="Garage" />
        <LetterLink href="#contact" label="Pit Lane" />
      </nav>
    </header>
  );
}

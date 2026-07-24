import { contact, brand } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { useReveal } from "@/hooks/use-reveal";
import { SectionGlow } from "@/components/section-glow";
import { Mail, Phone } from "lucide-react";

const Github = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0 .2-3.8s-1.2-.4-3.9 1.4a13 13 0 0 0-7 0C5.2 2 4 2 4 2a5.5 5.5 0 0 0 .2 3.8A5.5 5.5 0 0 0 2.5 9.6c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/>
  </svg>
);

const Linkedin = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  "mailto:": <Mail size={16} />,
  "tel:": <Phone size={16} />,
  "linkedin": <Linkedin size={16} />,
  "github": <Github size={16} />,
};

function getIcon(href: string) {
  for (const [key, icon] of Object.entries(iconMap)) {
    if (href.includes(key)) return icon;
  }
  return null;
}

/**
 * Contact / Pit Lane section — serif display heading, lead CTA, 4 contact
 * links in a grid, and a minimal footer. Restructured to match the rest of
 * the site with StageCanvas backdrop and editorial typography.
 */
export function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact" style={{ background: "transparent" }}>
      <SectionGlow index={7} />
      <div className="container-section relative z-[2]">
        {/* Serif display heading — matches hero name weight */}
        <div style={{ marginBottom: "var(--space-8)" }}>
          <p
            className="text-label"
            style={{
              color: "var(--paper-dim)",
              marginBottom: "var(--space-2)",
            }}
          >
            {contact.eyebrow}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              color: "var(--paper)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              fontWeight: 800,
            }}
          >
            {contact.heading.map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <span style={{ color: "var(--amber)" }}>{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>
        </div>

        <div ref={ref} className="max-w-3xl">
          <p
            style={{
              color: "var(--paper-dim)",
              lineHeight: 1.7,
              fontSize: "var(--text-body)",
              marginBottom: "var(--space-6)",
            }}
          >
            {contact.lead}
          </p>

          {/* Contact links — 2-column grid */}
          <div
            className="grid sm:grid-cols-2"
            style={{ gap: "var(--space-2)" }}
          >
            {contact.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 transition-colors duration-200 group"
                style={{
                  padding: "var(--space-2)",
                  background: "color-mix(in srgb, var(--ink-2) 80%, transparent)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius-token)",
                }}
                data-hover
              >
                <span
                  className="transition-colors duration-200"
                  style={{ color: "var(--amber)" }}
                >
                  {getIcon(link.href)}
                </span>
                <span
                  className="transition-colors duration-200 group-hover:text-amber"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8125rem",
                    color: "var(--paper)",
                  }}
                >
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex flex-col sm:flex-row justify-between"
          style={{
            marginTop: "var(--space-16)",
            paddingTop: "var(--space-4)",
            gap: "var(--space-2)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <span
            className="text-label"
            style={{ color: "var(--paper-dim)" }}
          >
            {brand.footerName}
          </span>
          <span
            className="text-label"
            style={{ color: "var(--paper-dim)" }}
          >
            {brand.footerNote}
          </span>
        </div>
      </div>
    </section>
  );
}

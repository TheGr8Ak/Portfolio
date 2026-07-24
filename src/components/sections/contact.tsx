import { contact, brand } from "@/lib/content";
import { SectionHead } from "@/components/section-head";
import { useReveal } from "@/hooks/use-reveal";
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
 * Contact / Pit Lane section — heading, lead CTA, 4 contact links,
 * and a minimal footer.
 */
export function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHead
          eyebrow={contact.eyebrow}
          heading={contact.heading}
          index="07"
        />

        <div ref={ref} className="max-w-2xl">
          <p
            className="text-sm md:text-base mb-10"
            style={{ color: "var(--paper-dim)", lineHeight: 1.7 }}
          >
            {contact.lead}
          </p>

          {/* Contact links */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contact.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 p-4 transition-colors duration-200 group"
                style={{
                  background: "var(--ink-2)",
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
                  className="text-[13px] transition-colors duration-200 group-hover:text-amber"
                  style={{
                    fontFamily: "var(--font-mono)",
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
          className="mt-24 pt-8 flex flex-col sm:flex-row justify-between gap-4"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <span
            className="text-[11px] tracking-[0.15em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--paper-dim)",
            }}
          >
            {brand.footerName}
          </span>
          <span
            className="text-[11px] tracking-[0.15em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--paper-dim)",
            }}
          >
            {brand.footerNote}
          </span>
        </div>
      </div>
    </section>
  );
}

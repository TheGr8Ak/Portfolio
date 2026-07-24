import { useMemo } from "react";

interface LetterLinkProps {
  href: string;
  label: string;
}

/**
 * Letter-hover nav link — two stacked rows of per-letter <span>s. On
 * hover, both rows translate up 100% with staggered delay (~18ms per
 * letter), creating a "flip" effect where the amber duplicate underneath
 * replaces the default-color original. overflow: hidden on the wrapper.
 */
export function LetterLink({ href, label }: LetterLinkProps) {
  const letters = useMemo(() => label.split(""), [label]);

  return (
    <a
      href={href}
      className="relative inline-block overflow-hidden group"
      style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" }}
    >
      {/* Top row — default color */}
      <span className="flex transition-transform duration-300 ease-out group-hover:-translate-y-full" aria-hidden="false">
        {letters.map((ch, i) => (
          <span
            key={`top-${i}`}
            className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full"
            style={{
              transitionDelay: `${i * 18}ms`,
              color: "var(--paper-dim)",
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>

      {/* Bottom row — amber, positioned directly beneath */}
      <span
        className="absolute left-0 top-full flex transition-transform duration-300 ease-out group-hover:-translate-y-full"
        aria-hidden="true"
      >
        {letters.map((ch, i) => (
          <span
            key={`bot-${i}`}
            className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full"
            style={{
              transitionDelay: `${i * 18}ms`,
              color: "var(--amber)",
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </a>
  );
}

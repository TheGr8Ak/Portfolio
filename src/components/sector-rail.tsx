import { useActiveSection } from "@/hooks/use-active-section";
import { useLenis } from "@/hooks/use-lenis";
import { sectors } from "@/lib/content";

/**
 * Fixed vertical sector rail on the left edge — one dot + mono label per
 * section. Active section dot fills amber with a soft glow. Labels are
 * hidden until the rail is hovered (opacity transition). Hidden below md.
 */
export function SectorRail() {
  const active = useActiveSection();
  const { lenis } = useLenis();

  const handleClick = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 md:flex"
    >
      <ul className="group flex flex-col gap-5 list-none">
        {sectors.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => handleClick(s.id)}
                className="flex items-center gap-3 bg-transparent border-none p-0"
                aria-label={`Navigate to ${s.label}`}
                aria-current={isActive ? "true" : undefined}
              >
                {/* Dot */}
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? 10 : 6,
                    height: isActive ? 10 : 6,
                    background: isActive
                      ? "var(--amber)"
                      : "var(--paper-dim)",
                    boxShadow: isActive
                      ? "0 0 8px var(--amber), 0 0 16px var(--amber-dim)"
                      : "none",
                  }}
                />
                {/* Label — hidden until rail hovered */}
                <span
                  className="font-mono text-[11px] tracking-wider uppercase transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  style={{
                    color: isActive ? "var(--amber)" : "var(--paper-dim)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {s.index} {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

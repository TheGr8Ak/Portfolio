import { useState, useEffect } from "react";
import { sectors } from "@/lib/content";

/**
 * Watches all sections (by their `id` attribute matching `sectors[]`) with
 * an IntersectionObserver at threshold 0.5. Returns the `id` of whichever
 * section has the most visibility.
 */
export function useActiveSection(): string {
  const [active, setActive] = useState<string>(sectors[0].id);

  useEffect(() => {
    const sectionEls = sectors
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        }
        if (best) {
          setActive(best.target.id);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sectionEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return active;
}

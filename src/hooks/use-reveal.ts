import { useEffect, useRef, type RefObject } from "react";

/**
 * One-shot reveal: fades in + translates up when the element enters the
 * viewport at threshold 0.15. Uses CSS classes from styles.css
 * (`.reveal-hidden` / `.reveal-visible`), keeping it CSS-transition-based —
 * not GSAP — since this is a fire-once trigger, not scroll-scrubbed.
 *
 * Design decision: we leave these subtle transitions enabled even under
 * prefers-reduced-motion, because they are <700ms opacity/transform only.
 * The global CSS rule in styles.css already zeroes transition-duration in
 * that media query, so the element still becomes visible instantly.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("reveal-hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}

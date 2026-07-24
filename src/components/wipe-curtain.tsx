import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface WipeCurtainProps {
  children: React.ReactNode;
}

/**
 * Amber clip-path curtain that scroll-scrubs off the section heading.
 * Initially covers the heading with a diagonal edge; as the user scrolls
 * the section into view, GSAP + ScrollTrigger animates the clip-path to
 * collapse rightward, revealing the content beneath.
 *
 * Reduced-motion fallback: curtain is hidden outright so the heading is
 * always visible and never stuck mid-wipe.
 */
export function WipeCurtain({ children }: WipeCurtainProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !wrapperRef.current || !curtainRef.current) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          curtainRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 92% 100%, 0% 100%)",
          },
          {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            ease: "none",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 82%",
              end: "top 45%",
              scrub: 0.4,
            },
          },
        );
      }, wrapperRef);
    })();

    return () => {
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <div ref={wrapperRef} className="relative">
      {children}
      {/* Amber curtain overlay */}
      {!reduced && (
        <div
          ref={curtainRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "var(--amber)",
            clipPath: "polygon(0% 0%, 100% 0%, 92% 100%, 0% 100%)",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
}

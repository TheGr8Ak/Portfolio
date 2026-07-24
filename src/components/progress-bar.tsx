import { useEffect, useRef, useState } from "react";

/**
 * 2px fixed progress bar at the very top of the viewport. Width driven
 * by scroll position. When Lenis is active it reads from Lenis's scroll
 * event for in-sync inertia tracking; falls back to native scroll if
 * Lenis is unavailable.
 */
export function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (docHeight > 0) {
        setWidth((scrollTop / docHeight) * 100);
      }
    };

    // Use passive scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2,
        width: `${width}%`,
        background: "var(--amber)",
        zIndex: 9998,
        transition: "width 0.1s linear",
        willChange: "width",
      }}
    />
  );
}

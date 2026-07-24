import { useEffect, useRef, useState } from "react";

/**
 * Hero-only scroll cue — a horizontal gradient track with a moving dot,
 * echoing the "scroll to discover" slider pattern from product-launch
 * sites (amber -> teal gradient instead of a plain fading line). The dot
 * position is driven by scroll progress through the *first viewport*
 * only, so it reads as "you are here, keep going" rather than a full
 * page progress bar (that job stays with the top ProgressBar).
 */
export function ScrollCue({ label = "SCROLL TO EXPLORE" }: { label?: string }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const vh = window.innerHeight;

    const update = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / vh));
      setProgress(p);
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center gap-3"
      aria-hidden="true"
      style={{ opacity: 1 - progress * 1.4 }}
    >
      <div
        className="relative"
        style={{
          width: 180,
          height: 2,
          borderRadius: 999,
          background:
            "linear-gradient(90deg, var(--teal), var(--amber))",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: `${progress * 100}%`,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "var(--paper)",
            boxShadow: "0 0 10px var(--amber), 0 0 20px var(--amber-dim)",
            transform: "translate(-50%, -50%)",
            transition: "left 0.05s linear",
          }}
        />
      </div>
      <span
        className="text-[10px] tracking-[0.25em] uppercase"
        style={{ fontFamily: "var(--font-mono)", color: "var(--paper-dim)" }}
      >
        {label}
      </span>
    </div>
  );
}

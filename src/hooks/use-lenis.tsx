import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useReducedMotion } from "./use-reduced-motion";

// Lenis and GSAP are imported dynamically to avoid SSR issues
type LenisInstance = import("lenis").default;

interface LenisContextValue {
  lenis: LenisInstance | null;
  /** Current scroll progress 0 → 1 */
  progress: number;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  progress: 0,
});

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<LenisInstance | null>(null);
  const progressRef = useRef(0);
  // We use a state object to force re-renders when progress changes significantly
  // but also expose the ref for high-frequency reads (progress bar)
  const contextRef = useRef<LenisContextValue>({
    lenis: null,
    progress: 0,
  });

  useEffect(() => {
    if (reduced) {
      // Reduced motion — skip Lenis entirely, let the browser handle scrolling.
      // Still need to register ScrollTrigger for the wipe-curtain fallback checks.
      import("gsap").then(({ gsap }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger);
        });
      });
      return;
    }

    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;
      contextRef.current = { lenis, progress: 0 };

      // Sync Lenis scroll events → ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Expose scroll progress for the progress bar
      lenis.on(
        "scroll",
        (e: { scroll: number; limit: number; progress: number }) => {
          progressRef.current = e.progress;
          contextRef.current = { lenis, progress: e.progress };
        },
      );

      // Drive Lenis from GSAP ticker for a single unified rAF loop
      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
        lenisRef.current = null;
      };
    })();

    return () => {
      cleanup?.();
    };
  }, [reduced]);

  return (
    <LenisContext value={contextRef.current}>{children}</LenisContext>
  );
}

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Site-wide 3D backdrop — a single glossy torus-knot on a near-black stage,
 * lit by one hard directional spotlight. The object rotates slowly and drifts
 * based on scroll progress, creating a persistent cinematic presence across
 * all sections.
 *
 * Mounted as `position: fixed` behind all page content. Client-only
 * (no SSR) and skipped entirely under `prefers-reduced-motion`.
 *
 * Performance: DPR capped at 1.5, single geometry, single material, no
 * post-processing.
 */

/**
 * Public API — mount this once in the root layout.
 * Skips rendering entirely under prefers-reduced-motion (body gets the
 * .no-canvas class instead, which triggers the CSS gradient fallback).
 *
 * Uses useEffect + dynamic import to guarantee client-only loading,
 * avoiding SSR issues with @react-three/fiber.
 */
export function StageCanvas() {
  const reduced = useReducedMotion();
  const [CanvasComponent, setCanvasComponent] = useState<React.ComponentType | null>(null);

  // Add/remove the no-canvas class for the CSS fallback gradient
  useEffect(() => {
    if (reduced) {
      document.body.classList.add("no-canvas");
    } else {
      document.body.classList.remove("no-canvas");
    }
    return () => document.body.classList.remove("no-canvas");
  }, [reduced]);

  // Dynamically import the canvas module only on the client
  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    import("./stage-canvas-inner").then((mod) => {
      if (!cancelled) {
        setCanvasComponent(() => mod.StageCanvasInner);
      }
    });
    return () => { cancelled = true; };
  }, [reduced]);

  if (reduced || !CanvasComponent) return null;

  return (
    <Suspense fallback={null}>
      <CanvasComponent />
    </Suspense>
  );
}

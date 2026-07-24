import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Inner canvas component — separated from stage-canvas.tsx so the
 * @react-three/fiber imports are never touched during SSR.
 * This file is dynamically imported by StageCanvas on the client only.
 *
 * NOTE: this used to include <Environment preset="night" /> from drei,
 * which fetches an HDR image from a remote CDN for reflections. If that
 * fetch is slow/blocked (flaky network, ad-blocker, corporate proxy),
 * the Suspense boundary around this whole component (in stage-canvas.tsx)
 * falls back to `null` and never recovers — which is exactly the
 * "renders for half a second then disappears forever" bug. Removed in
 * favor of a small local light rig so there's zero network dependency.
 */

function StageObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#09bee3ff"),
        metalness: 0.5,
        roughness: 0.35,
      }),
    [],
  );

  const geometry = useMemo(
    () => new THREE.TorusKnotGeometry(2.2, 0.7, 200, 32, 2, 3),
    [],
  );

  useFrame(({ pointer, clock }) => {
    if (!meshRef.current) return;

    // Pointer parallax (soft follow)
    targetRef.current.x = pointer.x * 0.15;
    targetRef.current.y = pointer.y * 0.15;
    mouseRef.current.x +=
      (targetRef.current.x - mouseRef.current.x) * 0.03;
    mouseRef.current.y +=
      (targetRef.current.y - mouseRef.current.y) * 0.03;

    // Scroll-driven rotation — read scroll progress directly from DOM
    const scrollY = window.scrollY || 0;
    const docHeight = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const scrollProgress = scrollY / docHeight;

    const t = clock.getElapsedTime();

    // Slow continuous rotation + scroll-linked rotation
    meshRef.current.rotation.y =
      t * 0.06 + scrollProgress * Math.PI * 2 + mouseRef.current.x;
    meshRef.current.rotation.x =
      Math.sin(t * 0.03) * 0.15 +
      scrollProgress * 0.8 +
      mouseRef.current.y * 0.4;
    meshRef.current.rotation.z = Math.sin(t * 0.02) * 0.08;

    // Subtle vertical drift with scroll
    meshRef.current.position.y =
      -scrollProgress * 1.5 + Math.sin(t * 0.04) * 0.2;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} />
  );
}

function SceneContents() {
  const { camera } = useThree();

  // Set camera position once
  useMemo(() => {
    camera.position.set(0, 0, 9);
  }, [camera]);

  return (
    <>
      {/* Single hard key light — cinematic spotlight from upper-right */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.5}
        color="#f8f0e3"
      />
      {/* Subtle warm fill from below-left to prevent total blackout on underside */}
      <directionalLight
        position={[-3, -4, 2]}
        intensity={0.3}
        color="#e8ddc8"
      />
      {/* Rim light from behind-left for a reflective edge, standing in
          for what the HDR environment map used to provide */}
      <directionalLight
        position={[-6, 2, -4]}
        intensity={1.1}
        color="#ffffff"
      />
      {/* Soft top-down fill, warm cream bounce from "below" */}
      <hemisphereLight
        color="#ffffff"
        groundColor="#F7F3EA"
        intensity={0.45}
      />
      {/* Slightly higher ambient so the object never reads as a black hole
          against the light page */}
      <ambientLight intensity={0.18} />

      <StageObject />
    </>
  );
}

/**
 * The fixed full-viewport canvas that sits behind all page content.
 * Renders a single glossy 3D object with cinematic lighting.
 */
export function StageCanvasInner() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        camera={{ fov: 50 }}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}

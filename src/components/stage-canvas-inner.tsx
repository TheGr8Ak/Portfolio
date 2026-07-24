import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/**
 * Inner canvas component — separated from stage-canvas.tsx so the
 * @react-three/fiber imports are never touched during SSR.
 * This file is dynamically imported by StageCanvas on the client only.
 */

function StageObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1d22"),
        metalness: 0.88,
        roughness: 0.12,
        envMapIntensity: 1.2,
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
      {/* Subtle fill from below-left to prevent total blackout on underside */}
      <directionalLight
        position={[-3, -4, 2]}
        intensity={0.3}
        color="#4fd1c5"
      />
      {/* Very dim ambient so the dark side isn't pure black */}
      <ambientLight intensity={0.08} />

      <StageObject />

      {/* Environment map for metallic reflections */}
      <Environment preset="night" />
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
        gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "#0A0B0D" }}
        camera={{ fov: 50 }}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}

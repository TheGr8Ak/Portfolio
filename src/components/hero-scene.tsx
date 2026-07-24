import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * React Three Fiber hero backdrop — wireframe icosahedron + particle
 * sphere shell. Absolutely positioned behind hero text, transparent bg,
 * pointer-events none.
 *
 * This component is lazy-loaded via React.lazy in hero.tsx and skipped
 * entirely when prefers-reduced-motion is on.
 */
export function HeroScene() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}

function SceneContents() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  // Track mouse for parallax
  useFrame(({ pointer, clock }) => {
    targetRef.current.x = pointer.x * 0.3;
    targetRef.current.y = pointer.y * 0.3;

    mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05;

    if (groupRef.current) {
      groupRef.current.rotation.y =
        clock.getElapsedTime() * 0.08 + mouseRef.current.x;
      groupRef.current.rotation.x = mouseRef.current.y * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <WireframeIcosahedron />
      <ParticleField />
    </group>
  );
}

function WireframeIcosahedron() {
  const geo = useMemo(() => {
    const icosaGeo = new THREE.IcosahedronGeometry(3, 1);
    return new THREE.WireframeGeometry(icosaGeo);
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial
        color="#f2a83c"
        transparent
        opacity={0.32}
      />
    </lineSegments>
  );
}

function ParticleField() {
  const COUNT = 240;

  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);

    // Uniform spherical distribution on a shell between radius 5.2–7.6
    // Using proper θ/φ sampling (not per-axis random which clumps at poles)
    for (let i = 0; i < COUNT; i++) {
      const radius = 5.2 + Math.random() * 2.4;
      const theta = Math.acos(2 * Math.random() - 1); // polar angle, uniform on sphere
      const phi = Math.random() * Math.PI * 2; // azimuthal angle

      pos[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(theta);
    }

    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#4fd1c5"
        size={0.045}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group, Points } from "three";

const ACCENT = "#e8ff00";

// Nube de partículas en cáscara esférica (nodos flotantes).
function Particles({ count = 240 }: { count?: number }) {
  const ref = useRef<Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.7 + Math.random() * 0.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        color={ACCENT}
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

// Núcleo: icosaedros wireframe anidados que giran e se inclinan hacia el cursor.
function Obj() {
  const tilt = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (spin.current) {
      spin.current.rotation.y += delta * 0.18;
      spin.current.rotation.x += delta * 0.06;
    }
    if (tilt.current) {
      const tx = mouse.current.y * 0.35;
      const ty = mouse.current.x * 0.45;
      tilt.current.rotation.x += (tx - tilt.current.rotation.x) * 0.04;
      tilt.current.rotation.y += (ty - tilt.current.rotation.y) * 0.04;
    }
  });

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <mesh>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.5} />
        </mesh>
        <mesh scale={0.58}>
          <icosahedronGeometry args={[2, 0]} />
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.28} />
        </mesh>
      </group>
      <Particles />
    </group>
  );
}

export function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Obj />
    </Canvas>
  );
}

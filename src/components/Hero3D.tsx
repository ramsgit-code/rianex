"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group, Points } from "three";

const ACCENT = "#12130f";

// Nube de partículas en cáscara esférica (halo ambiente alrededor del cerebro).
function Particles({ count = 160 }: { count?: number }) {
  const ref = useRef<Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.9 + Math.random() * 0.6;
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
        size={0.028}
        color={ACCENT}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Dibuja una silueta de cerebro (vista frontal) a base de circulos superpuestos
// -formando los lobulos- y la rasteriza en un canvas oculto. No tenemos un modelo
// 3D real, asi que en vez de eso: sampleamos puntos dentro de la silueta y les
// damos volumen (profundidad tipo elipsoide) para que lea como un objeto 3D.
function buildBrainGeometry(count: number) {
  const W = 480;
  const H = 360;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { positions: new Float32Array(0), edgePositions: new Float32Array(0) };

  // lobulos del hemisferio izquierdo (frontal, parietal, temporal, occipital);
  // el derecho es el espejo. deja un hueco vertical al centro (cisura interhemisferica).
  const leftLobes: [number, number, number][] = [
    [150, 92, 56],
    [206, 80, 42],
    [220, 150, 56],
    [128, 160, 48],
    [106, 208, 42],
    [188, 228, 48],
    [150, 142, 42],
    [168, 206, 36],
  ];
  const circles: [number, number, number][] = [];
  for (const [x, y, r] of leftLobes) {
    circles.push([x, y, r]);
    circles.push([W - x, y, r]);
  }
  // cerebelo, debajo y al centro
  circles.push([214, 280, 26], [266, 280, 26], [240, 272, 22]);

  ctx.fillStyle = "#fff";
  for (const [x, y, r] of circles) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const img = ctx.getImageData(0, 0, W, H).data;
  const candidates: [number, number][] = [];
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (img[(y * W + x) * 4 + 3] > 128) candidates.push([x, y]);
    }
  }
  if (candidates.length === 0) {
    return { positions: new Float32Array(0), edgePositions: new Float32Array(0) };
  }

  const scale = 2.3 / (W / 2);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const [px, py] = candidates[Math.floor(Math.random() * candidates.length)];
    const nx = (px - W / 2) / (W / 2);
    const ny = (py - H / 2) / (H / 2);
    const rr = Math.min(1, Math.sqrt(nx * nx + ny * ny));
    const zMax = Math.sqrt(Math.max(0, 1 - rr * rr)) * 1.15;
    positions[i * 3] = (px - W / 2) * scale;
    positions[i * 3 + 1] = -(py - H / 2) * scale;
    positions[i * 3 + 2] = (Math.random() * 2 - 1) * zMax;
  }

  // conexiones: cada nodo con sus ~2 vecinos mas cercanos dentro de un radio maximo
  // (asi lee como red neuronal, no como nube de puntos suelta).
  const maxDistSq = 0.62 * 0.62;
  const maxPerNode = 2;
  const edgeSet = new Set<string>();
  const edgePts: number[] = [];
  for (let i = 0; i < count; i++) {
    const ax = positions[i * 3];
    const ay = positions[i * 3 + 1];
    const az = positions[i * 3 + 2];
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      const dx = ax - positions[j * 3];
      const dy = ay - positions[j * 3 + 1];
      const dz = az - positions[j * 3 + 2];
      const d = dx * dx + dy * dy + dz * dz;
      if (d < maxDistSq) dists.push({ j, d });
    }
    dists.sort((a, b) => a.d - b.d);
    for (let k = 0; k < Math.min(maxPerNode, dists.length); k++) {
      const j = dists[k].j;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);
      edgePts.push(ax, ay, az, positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
    }
  }

  return { positions, edgePositions: new Float32Array(edgePts) };
}

// Nucleo: nube de nodos con forma de cerebro + sus conexiones, gira e se inclina
// hacia el cursor.
function Brain() {
  const { positions, edgePositions } = useMemo(() => buildBrainGeometry(260), []);
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
      spin.current.rotation.y += delta * 0.12;
    }
    if (tilt.current) {
      const tx = mouse.current.y * 0.3;
      const ty = mouse.current.x * 0.4;
      tilt.current.rotation.x += (tx - tilt.current.rotation.x) * 0.04;
      tilt.current.rotation.y += (ty - tilt.current.rotation.y) * 0.04;
    }
  });

  if (positions.length === 0) return null;

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            color={ACCENT}
            transparent
            opacity={0.88}
            sizeAttenuation
          />
        </points>
        {edgePositions.length > 0 && (
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color={ACCENT} transparent opacity={0.16} />
          </lineSegments>
        )}
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
      <Brain />
    </Canvas>
  );
}

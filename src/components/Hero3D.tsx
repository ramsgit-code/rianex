"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CanvasTexture, Color, type BufferAttribute, type Group, type Points } from "three";

const INK = new Color("#12130f");
const SIGNAL = new Color("#9ba600");

const COUNT = 3400;
const GRID = 256;
const WIDTH = 4.3; // ancho de la figura en unidades del mundo
const DEPTH = 0.5; // grosor maximo ("abombado") de cada icono
const MORPH_S = 1.6;
const MAX_DELAY = 0.35;

// Cada icono se dibuja en 2D sobre un canvas; luego se samplean puntos dentro de la silueta
// y se les da volumen. accent marca las zonas que van en lima.
type ShapeDef = {
  draw: (ctx: CanvasRenderingContext2D) => void;
  accent: (x: number, y: number) => boolean;
};

// orden = orden de las frases del titular (captacion, seguimiento, propuestas, IA)
const SHAPES: ShapeDef[] = [
  // imán (captación de leads)
  {
    draw: (ctx) => {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 56;
      ctx.lineCap = "butt";
      ctx.beginPath();
      ctx.moveTo(58, 214);
      ctx.lineTo(58, 118);
      ctx.arc(128, 118, 70, Math.PI, 0);
      ctx.lineTo(198, 214);
      ctx.stroke();
    },
    accent: (_x, y) => y > 176,
  },
  // bocadillo de chat (seguimiento de clientes)
  {
    draw: (ctx) => {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.roundRect(34, 44, 188, 136, 40);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(70, 170);
      ctx.lineTo(52, 226);
      ctx.lineTo(120, 176);
      ctx.fill();
      ctx.globalCompositeOperation = "destination-out";
      for (const x of [88, 128, 168]) {
        ctx.beginPath();
        ctx.arc(x, 112, 13, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    },
    accent: (x, y) => [88, 128, 168].some((cx) => (x - cx) ** 2 + (y - 112) ** 2 < 24 ** 2),
  },
  // documento (propuestas comerciales)
  {
    draw: (ctx) => {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(58, 26);
      ctx.lineTo(160, 26);
      ctx.lineTo(200, 66);
      ctx.lineTo(200, 232);
      ctx.lineTo(58, 232);
      ctx.closePath();
      ctx.fill();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillRect(84, 96, 90, 12);
      ctx.fillRect(84, 124, 90, 12);
      ctx.fillRect(84, 152, 58, 12);
      // check de "aceptada"
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(142, 196);
      ctx.lineTo(156, 208);
      ctx.lineTo(178, 184);
      ctx.stroke();
      ctx.globalCompositeOperation = "source-over";
    },
    accent: (x, y) => x > 128 && y > 172 && y < 222,
  },
  // chispa ✦ (procesos con IA)
  {
    draw: (ctx) => {
      ctx.fillStyle = "#fff";
      const star = (cx: number, cy: number, r: number, k: number) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy - r);
        ctx.quadraticCurveTo(cx + r * k, cy - r * k, cx + r, cy);
        ctx.quadraticCurveTo(cx + r * k, cy + r * k, cx, cy + r);
        ctx.quadraticCurveTo(cx - r * k, cy + r * k, cx - r, cy);
        ctx.quadraticCurveTo(cx - r * k, cy - r * k, cx, cy - r);
        ctx.fill();
      };
      star(116, 140, 104, 0.16);
      star(206, 50, 34, 0.18);
    },
    accent: (x, y) => x > 160 && y < 100,
  },
];

type Sample = { pos: Float32Array; col: Float32Array };

function sampleShape(def: ShapeDef): Sample {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = GRID;
  const ctx = canvas.getContext("2d");
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  if (!ctx) return { pos, col };
  def.draw(ctx);
  const img = ctx.getImageData(0, 0, GRID, GRID).data;

  // distancia de cada pixel al borde (chamfer, 2 pasadas): da el perfil "abombado"
  const INF = 1e9;
  const dist = new Float32Array(GRID * GRID);
  for (let i = 0; i < GRID * GRID; i++) dist[i] = img[i * 4 + 3] > 128 ? INF : 0;
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const i = y * GRID + x;
      if (!dist[i]) continue;
      const up = y > 0 ? dist[i - GRID] : 0;
      const left = x > 0 ? dist[i - 1] : 0;
      dist[i] = Math.min(dist[i], up + 1, left + 1);
    }
  }
  let maxD = 1;
  const inside: number[] = [];
  for (let y = GRID - 1; y >= 0; y--) {
    for (let x = GRID - 1; x >= 0; x--) {
      const i = y * GRID + x;
      if (!dist[i]) continue;
      const down = y < GRID - 1 ? dist[i + GRID] : 0;
      const right = x < GRID - 1 ? dist[i + 1] : 0;
      dist[i] = Math.min(dist[i], down + 1, right + 1);
      maxD = Math.max(maxD, dist[i]);
      inside.push(i);
    }
  }
  if (inside.length === 0) return { pos, col };

  const scale = WIDTH / GRID;
  for (let n = 0; n < COUNT; n++) {
    const i = inside[Math.floor(Math.random() * inside.length)];
    const px = (i % GRID) + Math.random();
    const py = Math.floor(i / GRID) + Math.random();
    const profile = Math.sqrt(dist[i] / maxD) * DEPTH;
    // casi todos en la superficie (delante/detras); unos pocos dentro, para dar cuerpo
    const z = Math.random() < 0.85 ? (Math.random() < 0.5 ? -1 : 1) * profile : (Math.random() * 2 - 1) * profile;
    pos[n * 3] = (px - GRID / 2) * scale;
    pos[n * 3 + 1] = -(py - GRID / 2) * scale;
    pos[n * 3 + 2] = z;
    const c = def.accent(px, py) ? SIGNAL : INK;
    col[n * 3] = c.r;
    col[n * 3 + 1] = c.g;
    col[n * 3 + 2] = c.b;
  }
  return { pos, col };
}

// Textura circular para los puntos (por defecto three los pinta cuadrados).
function makeDotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.6, "rgba(255,255,255,1)");
    g.addColorStop(0.75, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new CanvasTexture(c);
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Nube de particulas que se transforma en el icono de la frase activa del titular.
function Morph({ shape }: { shape: number }) {
  const ref = useRef<Points>(null);
  const dot = useMemo(() => makeDotTexture(), []);
  const shapes = useMemo(() => SHAPES.map(sampleShape), []);

  const anim = useMemo(() => {
    // arranca como una nube dispersa y se ensambla en la primera forma
    const from = new Float32Array(COUNT * 3);
    const dir = new Float32Array(COUNT * 3);
    const delay = new Float32Array(COUNT);
    const phase = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const ux = Math.sin(phi) * Math.cos(theta);
      const uy = Math.sin(phi) * Math.sin(theta);
      const uz = Math.cos(phi);
      const r = 2.5 + Math.random() * 1.5;
      from[i * 3] = ux * r;
      from[i * 3 + 1] = uy * r;
      from[i * 3 + 2] = uz * r;
      dir[i * 3] = ux;
      dir[i * 3 + 1] = uy;
      dir[i * 3 + 2] = uz;
      delay[i] = Math.random() * MAX_DELAY;
      phase[i] = Math.random() * Math.PI * 2;
    }
    return { from, dir, delay, phase, target: -1, start: 0 };
  }, []);

  const positions = useMemo(() => new Float32Array(anim.from), [anim]);
  const colors = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = INK.r;
      arr[i * 3 + 1] = INK.g;
      arr[i * 3 + 2] = INK.b;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const want = ((shape % shapes.length) + shapes.length) % shapes.length;
    if (want !== anim.target) {
      // la transicion sale de donde esten las particulas ahora mismo
      anim.from.set(positions);
      anim.target = want;
      anim.start = t;
    }
    const to = shapes[anim.target];
    const p = (t - anim.start) / MORPH_S;

    for (let i = 0; i < COUNT; i++) {
      const local = Math.min(1, Math.max(0, (p - anim.delay[i]) / (1 - MAX_DELAY)));
      const e = ease(local);
      const burst = Math.sin(Math.PI * local) * 0.7;
      for (let a = 0; a < 3; a++) {
        const k = i * 3 + a;
        positions[k] =
          anim.from[k] +
          (to.pos[k] - anim.from[k]) * e +
          anim.dir[k] * burst +
          Math.sin(t * 1.3 + anim.phase[i] + a * 2.1) * 0.018;
      }
      if (local > 0.5) {
        colors[i * 3] = to.col[i * 3];
        colors[i * 3 + 1] = to.col[i * 3 + 1];
        colors[i * 3 + 2] = to.col[i * 3 + 2];
      }
    }
    const geo = ref.current?.geometry;
    if (geo) {
      (geo.attributes.position as BufferAttribute).needsUpdate = true;
      (geo.attributes.color as BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} map={dot} vertexColors transparent depthWrite={false} sizeAttenuation />
    </points>
  );
}

// Balanceo suave + inclinacion hacia el cursor. Sin giro completo: son iconos planos
// abombados y de canto no se leerian.
function Tilt({ children }: { children: ReactNode }) {
  const tilt = useRef<Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    if (tilt.current) {
      const sway = Math.sin(state.clock.elapsedTime * 0.45) * 0.35;
      const tx = -mouse.current.y * 0.25;
      const ty = mouse.current.x * 0.35 + sway;
      tilt.current.rotation.x += (tx - tilt.current.rotation.x) * 0.04;
      tilt.current.rotation.y += (ty - tilt.current.rotation.y) * 0.04;
    }
  });

  return <group ref={tilt}>{children}</group>;
}

export function Hero3D({ shape = 0 }: { shape?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Tilt>
        <Morph shape={shape} />
      </Tilt>
    </Canvas>
  );
}

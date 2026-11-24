import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

const COLORS = ['#e879f9', '#c084fc', '#a855f7', '#fbbf24', '#ffffff', '#f472b6'];

export function PurpleFireworks({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const burst = (cx: number, cy: number) => {
      for (let i = 0; i < 42; i++) {
        const angle = (Math.PI * 2 * i) / 42 + (Math.random() - 0.5) * 0.2;
        const speed = 2.2 + Math.random() * 4.5;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 2 + Math.random() * 2.5,
        });
      }
    };

    burst(canvas.width * 0.3, canvas.height * 0.32);
    burst(canvas.width * 0.7, canvas.height * 0.28);
    const t1 = window.setTimeout(() => burst(canvas.width * 0.5, canvas.height * 0.25), 350);
    const t2 = window.setTimeout(() => burst(canvas.width * 0.25, canvas.height * 0.45), 720);
    const t3 = window.setTimeout(() => burst(canvas.width * 0.75, canvas.height * 0.42), 1050);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.055;
        p.alpha -= 0.014;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" aria-hidden="true" />;
}

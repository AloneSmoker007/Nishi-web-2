import { useEffect, useRef, useState } from 'react';
import { RotateCcw, Sparkles, Trophy } from 'lucide-react';

interface StarEntity {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  hue: number;
}

function playChime(pitch = 660) {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.45, ctx.currentTime + 0.16);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.26);
  } catch {
    // ignore if audio context blocked
  }
}

export function SevenStarQuest() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [caught, setCaught] = useState(0);
  const [started, setStarted] = useState(false);
  const starsRef = useRef<StarEntity[]>([]);
  const caughtRef = useRef(0);

  const resetGame = () => {
    caughtRef.current = 0;
    setCaught(0);
    setStarted(true);
    starsRef.current = Array.from({ length: 7 }, () => ({
      x: 40 + Math.random() * 520,
      y: 30 + Math.random() * 240,
      r: 18 + Math.random() * 6,
      vx: (Math.random() - 0.5) * 1.4,
      vy: 0.5 + Math.random() * 0.85,
      hue: 270 + Math.random() * 45,
    }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#160734');
      grad.addColorStop(1, '#260c54');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      if (!started) return;

      for (const s of starsRef.current) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 24 || s.x > w - 24) s.vx *= -1;
        if (s.y > h + 20) {
          s.y = -18;
          s.x = 30 + Math.random() * (w - 60);
        }

        const glow = ctx.createRadialGradient(s.x, s.y, 2, s.x, s.y, s.r * 1.6);
        glow.addColorStop(0, '#ffffff');
        glow.addColorStop(0.35, `hsla(${s.hue}, 95%, 78%, 0.95)`);
        glow.addColorStop(1, 'rgba(168, 85, 247, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 1.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('★', s.x, s.y);
      }
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [started]);

  const handleCanvasTap = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!started || caughtRef.current >= 7) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const idx = starsRef.current.findIndex((s) => Math.hypot(s.x - x, s.y - y) <= s.r * 2.1);
    if (idx !== -1) {
      starsRef.current.splice(idx, 1);
      caughtRef.current += 1;
      setCaught(caughtRef.current);
      playChime(520 + caughtRef.current * 65);
    }
  };

  return (
    <section id="quest" className="relative z-10 mx-auto max-w-5xl px-4 py-16">
      <div className="mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">Interactive Mini-Game</p>
        <h2 className="font-script mt-1 text-5xl text-white drop-shadow-[0_0_16px_rgba(216,130,255,0.75)]">
          Seven-Star Quest
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-purple-200/85">
          Tap the 7 drifting purple stars across the night sky to unlock Nishi’s Golden ARMY Pass.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-purple-300/25 bg-[#150630]/85 p-4 shadow-[0_20px_60px_rgba(6,2,18,0.7)] backdrop-blur-md">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/35 bg-purple-900/60 px-3.5 py-1 text-xs font-bold text-white">
            <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" /> Stars Collected: {caught} / 7
          </span>
          <button
            type="button"
            onClick={resetGame}
            className="inline-flex items-center gap-1.5 rounded-full border border-purple-300/35 bg-gradient-to-r from-fuchsia-600 to-purple-600 px-4 py-1.5 text-xs font-bold text-white transition hover:scale-105"
          >
            <RotateCcw className="h-3.5 w-3.5" /> {started ? 'Play Again' : 'Start Quest'}
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-purple-300/20">
          <canvas
            ref={canvasRef}
            width={640}
            height={300}
            onPointerDown={handleCanvasTap}
            className="block h-[240px] w-full cursor-crosshair touch-none sm:h-[300px]"
          />

          {!started && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0422]/75 p-4 text-center">
              <p className="font-script text-3xl text-fuchsia-100">Catch all 7 Purple Stars ✨</p>
              <button
                type="button"
                onClick={resetGame}
                className="mt-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(217,70,239,0.7)] transition hover:scale-105"
              >
                Start Seven-Star Quest ★
              </button>
            </div>
          )}

          {caught >= 7 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#140530]/88 p-6 text-center backdrop-blur-sm">
              <Trophy className="mb-2 h-10 w-10 text-amber-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.8)]" />
              <h3 className="font-script text-4xl text-amber-200">Golden ARMY Pass Unlocked!</h3>
              <p className="mt-1 max-w-md text-xs text-purple-100">
                All 7 stars belong to Nishi’s sky — RM, Jin, SUGA, j-hope, Jimin, V, and Jung Kook forever 💜
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';

interface BurstParticle {
  id: number;
  x: number;
  emoji: string;
  scale: number;
}

const EMOJIS = ['💜', '✨', '🦋', '💜', '⭐', '💜'];

export function FloatingMagic() {
  const [count, setCount] = useState<number>(() => {
    const saved = Number(localStorage.getItem('nishi_purple_hearts') || '7');
    return Number.isFinite(saved) && saved >= 0 ? saved : 7;
  });
  const [particles, setParticles] = useState<BurstParticle[]>([]);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handlePurpleTap = () => {
    const next = count + 1;
    setCount(next);
    localStorage.setItem('nishi_purple_hearts', String(next));

    const now = Date.now();
    const batch: BurstParticle[] = Array.from({ length: 6 }, (_, i) => ({
      id: now + i,
      x: (i - 2.5) * 26 + (Math.random() * 14 - 7),
      emoji: EMOJIS[i % EMOJIS.length],
      scale: 0.85 + Math.random() * 0.5,
    }));

    setParticles((prev) => [...prev.slice(-18), ...batch]);
    window.setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !batch.some((b) => b.id === p.id)));
    }, 1500);
  };

  return (
    <AnimatePresence>
      {showTop && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          className="pointer-events-none fixed bottom-4 right-3 z-40 flex flex-col items-end gap-2.5 md:bottom-5 md:right-5"
        >
          {/* Rising heart burst */}
          <div className="relative h-0 w-0" aria-hidden="true">
            {particles.map((p) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 1, y: 0, x: 0, scale: p.scale }}
                animate={{ opacity: 0, y: -150, x: p.x, scale: p.scale * 1.25 }}
                transition={{ duration: 1.35, ease: 'easeOut' }}
                className="pointer-events-none absolute bottom-12 right-6 text-lg drop-shadow-[0_0_10px_rgba(216,130,255,0.9)]"
              >
                {p.emoji}
              </motion.span>
            ))}
          </div>

          {/* Scroll to top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-purple-300/35 bg-[#1b093b]/90 text-purple-100 shadow-[0_8px_24px_rgba(6,2,18,0.75)] backdrop-blur-md transition hover:scale-110 hover:border-fuchsia-300/70"
          >
            <ArrowUp className="h-4 w-4" />
          </button>

          {/* I Purple You button */}
          <motion.button
            type="button"
            onClick={handlePurpleTap}
            whileTap={{ scale: 0.92 }}
            aria-label={`Send a purple heart, ${count} sent`}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-fuchsia-300/60 bg-gradient-to-r from-fuchsia-600/95 via-purple-600/95 to-violet-700/95 px-4 py-2.5 text-xs font-bold text-white shadow-[0_10px_30px_rgba(192,102,255,0.55)] backdrop-blur-md transition hover:scale-105"
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>I Purple You</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-extrabold">{count}</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

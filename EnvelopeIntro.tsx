import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [stage, setStage] = useState<'sealed' | 'opening' | 'letter'>('sealed');
  const reduceMotion = useReducedMotion();

  const handleOpen = () => {
    if (stage !== 'sealed') return;
    setStage('opening');
    window.setTimeout(() => setStage('letter'), reduceMotion ? 120 : 620);
  };

  return (
    <section
      id="envelope-intro"
      role="dialog"
      aria-modal="true"
      aria-label="A letter for Nishi"
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-[#080217]/95 px-4 py-8 backdrop-blur-xl"
    >
      {/* soft glowing backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.28),transparent_68%)] blur-2xl" />
        <div className="absolute left-[18%] top-[22%] h-2 w-2 rounded-full bg-fuchsia-200/80 shadow-[0_0_16px_rgba(232,121,249,0.9)]" />
        <div className="absolute right-[22%] top-[30%] h-1.5 w-1.5 rounded-full bg-purple-100/80 shadow-[0_0_14px_rgba(216,180,254,0.9)]" />
        <div className="absolute bottom-[26%] left-[30%] h-1.5 w-1.5 rounded-full bg-amber-200/80 shadow-[0_0_14px_rgba(253,230,138,0.9)]" />
        <div className="absolute bottom-[32%] right-[28%] h-2 w-2 rounded-full bg-purple-200/70 shadow-[0_0_16px_rgba(216,180,254,0.9)]" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-fuchsia-300"
      >
        <Sparkles className="h-3.5 w-3.5" /> A Letter Has Arrived
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="font-script relative z-10 mt-1 text-center text-4xl text-white drop-shadow-[0_0_20px_rgba(216,130,255,0.85)] sm:text-5xl"
      >
        For Nishi
      </motion.h1>

      <p className="relative z-10 mt-1 text-center text-xs text-purple-200/80">
        Someone made a whole universe for you 💜
      </p>

      {/* Envelope */}
      <div className="relative z-10 mt-8 w-full max-w-[330px]">
        <AnimatePresence mode="wait">
          {stage !== 'letter' ? (
            <motion.button
              key="envelope"
              type="button"
              onClick={handleOpen}
              aria-label="Open the letter for Nishi"
              initial={{ opacity: 0, scale: 0.9, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.08, y: -24 }}
              transition={{ type: 'spring', stiffness: 170, damping: 20 }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              whileTap={{ scale: 0.97 }}
              className="group relative block w-full cursor-pointer"
            >
              <span className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(232,121,249,0.32),transparent_70%)] blur-xl" />

              <svg viewBox="0 0 330 220" className="relative w-full drop-shadow-[0_18px_40px_rgba(8,2,23,0.85)]">
                <defs>
                  <linearGradient id="envBody" x1="0" y1="0" x2="0.4" y2="1">
                    <stop offset="0%" stopColor="#4c1d95" />
                    <stop offset="55%" stopColor="#3b1178" />
                    <stop offset="100%" stopColor="#25104c" />
                  </linearGradient>
                  <linearGradient id="envFlap" x1="0" y1="0" x2="0.3" y2="1">
                    <stop offset="0%" stopColor="#6d28d9" />
                    <stop offset="100%" stopColor="#3f0f7a" />
                  </linearGradient>
                  <linearGradient id="envSeal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffd6f5" />
                    <stop offset="55%" stopColor="#e879f9" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>

                {/* letter peeking out */}
                <motion.g
                  initial={{ y: 26 }}
                  animate={stage === 'opening' ? { y: -34 } : { y: 22 }}
                  transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: 'easeOut' }}
                >
                  <rect x="42" y="40" width="246" height="140" rx="8" fill="#f7ecd8" />
                  <rect x="42" y="40" width="246" height="140" rx="8" fill="url(#envBody)" opacity="0.06" />
                  <text
                    x="165"
                    y="104"
                    textAnchor="middle"
                    fill="#5b1a8a"
                    fontSize="17"
                    fontStyle="italic"
                    fontFamily="'Great Vibes', cursive"
                  >
                    Nishi ♥
                  </text>
                  <text x="165" y="130" textAnchor="middle" fill="#8b5a2b" fontSize="9" letterSpacing="3">
                    A PURPLE SECRET
                  </text>
                </motion.g>

                {/* envelope body */}
                <path d="M22 78 L165 158 L308 78 L308 190 Q308 200 298 200 L32 200 Q22 200 22 190 Z" fill="url(#envBody)" />
                <path d="M22 78 L165 158 L308 78" fill="none" stroke="#a855f7" strokeOpacity="0.45" strokeWidth="1.5" />

                {/* flap */}
                <motion.path
                  d="M22 78 L165 6 L308 78 L165 150 Z"
                  fill="url(#envFlap)"
                  stroke="#c084fc"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                  style={{ originX: '165px', originY: '78px' }}
                  animate={stage === 'opening' ? { rotateX: -168 } : { rotateX: 0 }}
                  transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: 'easeInOut' }}
                />

                {/* wax seal */}
                <motion.g
                  animate={stage === 'opening' ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{ originX: '165px', originY: '92px' }}
                >
                  <circle cx="165" cy="92" r="23" fill="url(#envSeal)" />
                  <circle cx="165" cy="92" r="23" fill="none" stroke="#fbcfe8" strokeOpacity="0.6" strokeWidth="1.5" />
                  <path
                    d="M165 102c-5.6-3.5-9.3-6.6-9.3-10.4 0-2.7 2-4.6 4.5-4.6 1.6 0 3.1.8 4.2 2.3 1.1-1.5 2.6-2.3 4.2-2.3 2.5 0 4.5 1.9 4.5 4.6 0 3.8-3.7 6.9-9.3 10.4z"
                    fill="#5b0f7a"
                  />
                </motion.g>
              </svg>

              <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-fuchsia-200/70 bg-gradient-to-r from-fuchsia-600 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-[0_0_24px_rgba(192,102,255,0.7)] transition group-hover:scale-105">
                <Heart className="h-3.5 w-3.5 fill-current" /> Tap to open your letter
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-fuchsia-300/35 bg-gradient-to-b from-[#2a1055]/92 to-[#120629]/96 p-6 text-center shadow-[0_24px_70px_rgba(147,51,234,0.42)]"
            >
              <p className="font-script text-3xl text-white">Welcome to ♥</p>
              <p className="font-script text-4xl leading-tight text-fuchsia-100 drop-shadow-[0_0_18px_rgba(216,130,255,0.85)]">
                Nishi’s Purple Universe
              </p>
              <p className="mt-3 text-xs leading-relaxed text-purple-100/85">
                Seven stars, one purple sky, and a thousand little dreams — all waiting for you inside.
              </p>
              <button
                type="button"
                onClick={onOpen}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-200/70 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-700 px-6 py-3 text-sm font-bold text-white shadow-[0_0_28px_rgba(192,102,255,0.75)] transition hover:scale-105"
              >
                <Sparkles className="h-4 w-4" /> Step Inside
              </button>
              <p className="mt-3 text-[11px] text-purple-300/70">A little secret is waiting on the next screen 💜</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="relative z-10 mt-6 text-[11px] tracking-[0.18em] text-purple-300/60">WITH LOVE, YOUR BILAL 💜</p>
    </section>
  );
}

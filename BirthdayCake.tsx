import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cake, Flame, Gem, RotateCcw, Sparkles, Wind } from 'lucide-react';

const CANDLE_COUNT = 7;

const CONFETTI = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${2 + ((i * 13) % 96)}%`,
  delay: (i % 8) * 0.07,
  size: 6 + (i % 4) * 2,
  color: ['#e879f9', '#c084fc', '#fde68a', '#f472b6', '#a855f7', '#fbcfe8'][i % 6],
  rotate: (i % 2 === 0 ? 1 : -1) * (140 + i * 22),
}));

const DRIP_HEIGHTS = ['15px', '22px', '13px', '19px', '24px', '14px', '20px', '12px', '17px'];

export function BirthdayCake() {
  const [lit, setLit] = useState<boolean[]>(() => Array(CANDLE_COUNT).fill(true));
  const [wishMade, setWishMade] = useState(false);

  const litCount = lit.filter(Boolean).length;
  const allOut = litCount === 0;

  const extinguishOne = (index: number) => {
    setLit((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = false;
      if (next.every((c) => !c)) setWishMade(true);
      return next;
    });
  };

  const blowAll = () => {
    setLit(Array(CANDLE_COUNT).fill(false));
    setWishMade(true);
  };

  const relight = () => {
    setLit(Array(CANDLE_COUNT).fill(true));
    setWishMade(false);
  };

  return (
    <section id="cake" className="mx-auto max-w-5xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-purple-300/25 bg-gradient-to-br from-[#230c4c]/98 via-[#170736]/98 to-[#100426]/99 p-6 text-center shadow-[0_20px_60px_rgba(6,2,18,0.65)] backdrop-blur-md sm:p-10"
      >
        {/* soft halo behind the cake */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.22),transparent_66%)] blur-2xl"
        />

        {/* Confetti burst */}
        <AnimatePresence>
          {wishMade && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              {CONFETTI.map((c) => (
                <motion.span
                  key={c.id}
                  initial={{ y: 0, opacity: 1, rotate: 0, scale: 0.8 }}
                  animate={{ y: 620, opacity: 0, rotate: c.rotate, scale: 1.15 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.6, delay: c.delay, ease: 'easeOut' }}
                  style={{
                    left: c.left,
                    width: c.size,
                    height: c.size * 1.5,
                    backgroundColor: c.color,
                    borderRadius: 2,
                  }}
                  className="absolute top-1/3 shadow-[0_0_10px_rgba(255,255,255,0.55)]"
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <p className="relative inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
          <Cake className="h-3.5 w-3.5" /> Make a Birthday Wish
        </p>
        <h2 className="font-script relative mt-1 text-5xl text-white drop-shadow-[0_0_16px_rgba(216,130,255,0.85)]">
          Nishi’s Purple Cake
        </h2>
        <p className="relative mx-auto mt-1 max-w-md text-sm leading-relaxed text-purple-200/85">
          Seven glowing candles — one for every star of OT7. Close your eyes, make a wish, then tap each candle to
          blow it out.
        </p>

        {/* ================= CAKE ================= */}
        <div className="relative mx-auto mt-12 flex w-full max-w-[362px] flex-col items-center sm:max-w-[470px] lg:max-w-[540px]">
          {/* Candles */}
          <div className="relative z-40 flex items-end justify-center gap-1.5 sm:gap-3">
            {lit.map((isLit, i) => (
              <button
                key={i}
                type="button"
                onClick={() => extinguishOne(i)}
                aria-label={isLit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is already out`}
                className="group relative flex flex-col items-center pt-10"
              >
                {/* Flame (absolutely placed so the button box never shifts) */}
                <div className="pointer-events-none absolute left-1/2 top-0 flex h-10 w-7 -translate-x-1/2 items-end justify-center">
                  {isLit ? (
                    <>
                      <span className="absolute h-8 w-8 rounded-full bg-amber-300/25 blur-md" />
                      <motion.span
                        animate={{ scaleX: [1, 1.1, 0.95, 1.06, 1], scaleY: [1, 1.14, 0.97, 1.08, 1] }}
                        transition={{ duration: 1.1 + (i % 4) * 0.18, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative block h-7 w-3 bg-gradient-to-t from-orange-500 via-amber-300 to-white shadow-[0_0_16px_rgba(253,224,71,0.95)]"
                        style={{ borderRadius: '50% 50% 45% 45% / 68% 68% 32% 32%' }}
                      />
                    </>
                  ) : (
                    <motion.span
                      key={`smoke-${i}`}
                      initial={{ opacity: 0.7, y: 4, scale: 0.5 }}
                      animate={{ opacity: 0, y: -26, scale: 1.7 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      className="block h-3 w-3 rounded-full bg-purple-100/40 blur-[3px]"
                    />
                  )}
                </div>

                {/* Candle stick */}
                <span
                  className={`relative block h-12 w-2 rounded-[2px] shadow-[inset_-2px_0_0_rgba(0,0,0,0.22),0_2px_4px_rgba(0,0,0,0.35)] transition group-hover:brightness-110 sm:h-14 sm:w-2.5 ${
                    i % 2 === 0
                      ? 'bg-gradient-to-b from-fuchsia-100 via-fuchsia-400 to-purple-600'
                      : 'bg-gradient-to-b from-amber-50 via-amber-300 to-amber-500'
                  }`}
                >
                  <span className="absolute inset-x-0 top-1/3 h-[3px] bg-white/40" />
                  <span className="absolute inset-x-0 top-2/3 h-[3px] bg-white/30" />
                  <span className="absolute -top-1.5 left-1/2 h-1.5 w-[2px] -translate-x-1/2 rounded-full bg-[#2a1040]" />
                </span>
              </button>
            ))}
          </div>

          {/* ===== TOP TIER ===== */}
          <div className="relative z-30 mt-1 w-[62%] sm:w-[66%] lg:w-[68%]">
            <div className="absolute -top-[9px] left-0 right-0 h-[20px] rounded-[50%] bg-gradient-to-b from-white via-[#fdeef8] to-[#f4d2ec] shadow-[inset_0_2px_0_rgba(255,255,255,0.95)]" />
            <div
              className="relative h-[64px] w-full overflow-hidden shadow-[0_12px_22px_rgba(74,20,96,0.4)] sm:h-[80px] lg:h-[92px]"
              style={{
                background: 'linear-gradient(180deg,#fffbff 0%,#fde2f6 34%,#f0b9e4 68%,#d993d2 100%)',
                borderRadius: '0 0 50% 50% / 0 0 30% 30%',
              }}
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white/80 to-transparent" />
              <span className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-white/45 to-transparent" />
              <span className="pointer-events-none absolute inset-y-0 right-0 w-5 bg-gradient-to-l from-[#8b4b96]/30 to-transparent" />

              <span className="absolute left-3 top-2.5 h-1 w-1 rounded-full bg-white" />
              <span className="absolute left-1/2 top-3 h-1 w-1 rounded-full bg-white/90" />
              <span className="absolute right-4 top-2.5 h-1 w-1 rounded-full bg-white" />
              <span className="absolute right-1/3 top-6 h-[3px] w-[3px] rounded-full bg-fuchsia-400/80" />
              <span className="absolute left-1/4 top-7 h-[3px] w-[3px] rounded-full bg-fuchsia-400/70" />
              <span className="absolute left-[60%] top-8 h-[3px] w-[3px] rounded-full bg-amber-400/70" />
            </div>
            {/* gold rim */}
            <div className="absolute inset-x-1 bottom-0 h-[4px] rounded-[50%] bg-gradient-to-r from-amber-500/30 via-amber-100/95 to-amber-500/30 shadow-[0_0_8px_rgba(253,230,138,0.5)]" />

            {/* Frosting drips spilling onto the middle tier */}
            <div className="pointer-events-none absolute inset-x-0 top-full flex">
              {DRIP_HEIGHTS.map((h, idx) => (
                <span
                  key={idx}
                  style={{ height: h }}
                  className="-ml-px flex-1 rounded-b-full bg-gradient-to-b from-[#e9b5e3] via-[#f6d3ef] to-[#fdeaf9] shadow-[0_4px_8px_rgba(58,8,78,0.3)] first:ml-0"
                />
              ))}
            </div>
          </div>

          {/* ===== MIDDLE TIER ===== */}
          <div className="relative z-20 -mt-[6px] w-[82%] sm:w-[85%] lg:w-[86%]">
            <div className="absolute -top-[8px] left-0 right-0 h-[16px] rounded-[50%] bg-gradient-to-b from-[#f7d9f2] to-[#e0a6dc]" />
            <div
              className="relative h-[74px] w-full overflow-hidden shadow-[0_14px_28px_rgba(60,10,90,0.55)] sm:h-[92px] lg:h-[104px]"
              style={{
                background: 'linear-gradient(180deg,#c455ee 0%,#9b32d6 34%,#6c14a8 70%,#4a0a7c 100%)',
                borderRadius: '0 0 50% 50% / 0 0 26% 26%',
              }}
            >
              <span className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-white/22 to-transparent" />
              <span className="pointer-events-none absolute inset-y-0 right-0 w-7 bg-gradient-to-l from-black/40 to-transparent" />

              {/* piped pearl border */}
              <div className="absolute inset-x-3 -top-[1px] flex justify-around">
                {Array.from({ length: 9 }).map((_, idx) => (
                  <span
                    key={idx}
                    className="h-2.5 w-2.5 rounded-full bg-gradient-to-b from-white to-pink-200 shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                  />
                ))}
              </div>

              <div className="relative flex h-full items-center justify-center pt-3">
                <span className="font-script text-[2rem] leading-none text-amber-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] sm:text-4xl">
                  Nishi ♥
                </span>
              </div>

              <span className="absolute left-4 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full border border-amber-200/40 bg-white/15 backdrop-blur">
                <Gem className="h-2.5 w-2.5 text-amber-200" />
              </span>
              <span className="absolute right-4 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full border border-amber-200/40 bg-white/15 backdrop-blur">
                <Gem className="h-2.5 w-2.5 text-amber-200" />
              </span>
            </div>
            <div className="absolute inset-x-2 bottom-0 h-[3px] rounded-[50%] bg-gradient-to-r from-transparent via-amber-100/80 to-transparent" />
          </div>

          {/* ===== BOTTOM TIER ===== */}
          <div className="relative z-10 -mt-[4px] w-full">
            <div className="absolute -top-[8px] left-0 right-0 h-[16px] rounded-[50%] bg-gradient-to-b from-[#8a2fc0] to-[#5c1596]" />
            <div
              className="relative h-[88px] w-full overflow-hidden shadow-[0_22px_50px_rgba(3,0,12,0.9)] sm:h-[108px] lg:h-[122px]"
              style={{
                background: 'linear-gradient(180deg,#5f18a4 0%,#3d0b76 38%,#28064f 72%,#160330 100%)',
                borderRadius: '0 0 50% 50% / 0 0 20% 20%',
              }}
            >
              <span className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white/14 to-transparent" />
              <span className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/50 to-transparent" />

              {[
                'left-7 top-4 rotate-12',
                'left-14 top-9 -rotate-12',
                'left-24 top-3 rotate-45',
                'right-7 top-5 -rotate-12',
                'right-14 top-10 rotate-12',
                'right-24 top-3 -rotate-45',
              ].map((cls) => (
                <span
                  key={cls}
                  className={`absolute h-[3px] w-2 rounded-full bg-fuchsia-300/90 shadow-[0_0_7px_rgba(232,121,249,0.9)] ${cls}`}
                />
              ))}

              <div className="relative flex h-full flex-col items-center justify-center gap-1.5">
                <div className="flex items-center gap-2.5 text-amber-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] sm:text-xs">20 · 06 · 2008</span>
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-200/80">
                  BTS · OT7 · Forever
                </span>
              </div>
            </div>
            <div className="absolute inset-x-2 bottom-0 h-[4px] rounded-[50%] bg-gradient-to-r from-purple-900 via-amber-200/70 to-purple-900 shadow-[0_0_12px_rgba(253,230,138,0.35)]" />
          </div>

          {/* ===== PLATE + REFLECTION ===== */}
          <div
            className="relative z-0 -mt-[6px] h-[22px] w-[112%] rounded-[50%] shadow-[0_14px_26px_rgba(1,0,6,0.55)]"
            style={{
              background:
                'linear-gradient(180deg, #fffdf8 0%, #fbeef9 26%, #edc9ea 52%, #c095dd 78%, #8d5bbf 100%)',
            }}
          >
            <span className="absolute inset-x-[7%] top-[4px] h-[6px] rounded-[50%] bg-white/80" />
            <span className="absolute inset-x-[16%] bottom-[3px] h-[3px] rounded-[50%] bg-[#4b1e78]/40 blur-[2px]" />
          </div>
          <div className="mt-1 h-6 w-[84%] rounded-[50%] bg-fuchsia-400/22 blur-lg" />
        </div>

        {/* Status + actions */}
        <div className="relative mt-7 flex flex-col items-center gap-3">
          {allOut ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-amber-200/40 bg-fuchsia-600/20 px-5 py-3 text-sm font-semibold text-amber-100 shadow-[0_0_30px_rgba(232,121,249,0.35)]"
            >
              🎉 Happy Birthday, Nishi! May every purple wish in your heart come true 💜✨
            </motion.div>
          ) : (
            <p className="inline-flex items-center gap-1.5 text-xs text-purple-200/85">
              <Flame className="h-3.5 w-3.5 text-amber-300" />
              {litCount} of {CANDLE_COUNT} candles still glowing
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            {!allOut ? (
              <button
                type="button"
                onClick={blowAll}
                className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/70 bg-gradient-to-r from-fuchsia-600 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-[0_0_24px_rgba(192,102,255,0.65)] transition hover:scale-105"
              >
                <Wind className="h-4 w-4" /> Blow Out All Candles
              </button>
            ) : (
              <button
                type="button"
                onClick={relight}
                className="inline-flex items-center gap-2 rounded-full border border-purple-300/40 bg-purple-900/60 px-5 py-2.5 text-xs font-bold text-purple-100 transition hover:bg-purple-800/70"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Relight Candles
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

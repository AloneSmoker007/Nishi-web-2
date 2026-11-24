import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarHeart, Clock, Sparkles, Star } from 'lucide-react';

const BIRTH_DATE = new Date('2008-06-20T00:00:00');

function getCountdownState(now: Date) {
  const year = now.getFullYear();
  let nextBirthday = new Date(year, 5, 20, 0, 0, 0); // June 20 (month 5)
  if (now > nextBirthday) {
    nextBirthday = new Date(year + 1, 5, 20, 0, 0, 0);
  }

  const isBirthdayToday = now.getMonth() === 5 && now.getDate() === 20;
  const diffMs = Math.max(0, nextBirthday.getTime() - now.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  const daysAlive = Math.max(0, Math.floor((now.getTime() - BIRTH_DATE.getTime()) / (1000 * 60 * 60 * 24)));

  return { days, hours, minutes, seconds, daysAlive, isBirthdayToday, nextYear: nextBirthday.getFullYear() };
}

// Deterministic decorative stars + a Gemini/June constellation arc
const SKY_STARS = [
  { cx: 78, cy: 96, r: 2.3, bright: true },
  { cx: 112, cy: 76, r: 2.8, bright: true },
  { cx: 152, cy: 84, r: 2.1, bright: true },
  { cx: 186, cy: 112, r: 2.7, bright: true },
  { cx: 214, cy: 146, r: 2.2, bright: true },
  { cx: 170, cy: 174, r: 2.6, bright: true },
  { cx: 120, cy: 164, r: 2.4, bright: true },
  { cx: 64, cy: 150, r: 1.4, bright: false },
  { cx: 94, cy: 132, r: 1.2, bright: false },
  { cx: 142, cy: 126, r: 1.6, bright: false },
  { cx: 198, cy: 78, r: 1.3, bright: false },
  { cx: 228, cy: 108, r: 1.2, bright: false },
  { cx: 234, cy: 182, r: 1.4, bright: false },
  { cx: 150, cy: 216, r: 1.5, bright: false },
  { cx: 92, cy: 206, r: 1.2, bright: false },
  { cx: 56, cy: 192, r: 1.1, bright: false },
  { cx: 164, cy: 52, r: 1.3, bright: false },
  { cx: 128, cy: 48, r: 1.1, bright: false },
  { cx: 204, cy: 210, r: 1.2, bright: false },
];

export function BirthdayStarMap() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const stats = getCountdownState(now);

  return (
    <section id="starmap" className="mx-auto max-w-5xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-purple-300/25 bg-gradient-to-br from-[#210b47]/90 via-[#150631]/94 to-[#0d0320]/96 p-6 shadow-[0_20px_60px_rgba(6,2,18,0.65)] backdrop-blur-md sm:p-8"
      >
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Circular Night Sky Star Map */}
          <div className="flex flex-col items-center">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-2 border-amber-200/50 bg-[radial-gradient(circle_at_center,#271058_0%,#12052b_62%,#080217_100%)] p-3 shadow-[0_0_60px_rgba(168,85,247,0.4)] sm:h-72 sm:w-72">
              <svg viewBox="0 0 280 280" className="h-full w-full">
                <defs>
                  <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="45%" stopColor="#f0abfc" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Celestial rings */}
                <circle cx="140" cy="140" r="126" fill="none" stroke="#fde68a" strokeOpacity="0.28" strokeWidth="1" />
                <circle
                  cx="140"
                  cy="140"
                  r="98"
                  fill="none"
                  stroke="#c084fc"
                  strokeOpacity="0.22"
                  strokeDasharray="3 5"
                  strokeWidth="1"
                />
                <circle cx="140" cy="140" r="64" fill="none" stroke="#c084fc" strokeOpacity="0.16" strokeWidth="1" />

                {/* Constellation threads connecting the 7 main stars */}
                <polyline
                  points="78,96 112,76 152,84 186,112 214,146 170,174 120,164 78,96"
                  fill="none"
                  stroke="#fde68a"
                  strokeOpacity="0.55"
                  strokeWidth="1.2"
                />

                {/* Stars */}
                {SKY_STARS.map((s, idx) => (
                  <g key={idx}>
                    {s.bright && <circle cx={s.cx} cy={s.cy} r={s.r * 3.4} fill="url(#starGlow)" />}
                    <circle
                      cx={s.cx}
                      cy={s.cy}
                      r={s.r}
                      fill={s.bright ? '#fffbeb' : '#e9d5ff'}
                      opacity={s.bright ? 1 : 0.7}
                    />
                  </g>
                ))}
              </svg>

              <span className="absolute -bottom-3 rounded-full border border-amber-200/60 bg-[#1a083a] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200 shadow-lg">
                June 20, 2008 · Night Sky
              </span>
            </div>
          </div>

          {/* Story + Live Countdown */}
          <div className="text-center md:text-left">
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
              <Star className="h-3.5 w-3.5" /> The Night You Were Born
            </p>
            <h2 className="font-script mt-1 text-5xl text-white drop-shadow-[0_0_16px_rgba(216,130,255,0.8)]">
              Written in the Stars
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-purple-100/85">
              On <span className="font-semibold text-amber-200">June 20, 2008</span>, the sky arranged its brightest
              constellations just for you. Since that day, you have been lighting up the universe for{' '}
              <span className="font-bold text-fuchsia-200">{stats.daysAlive.toLocaleString()}</span> days.
            </p>

            {/* Countdown */}
            <div className="mt-5 rounded-2xl border border-purple-300/25 bg-[#12052b]/85 p-4">
              <p className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-fuchsia-300 md:justify-start">
                {stats.isBirthdayToday ? (
                  <>
                    <Sparkles className="h-3.5 w-3.5" /> Today is Nishi’s Birthday! 🎉
                  </>
                ) : (
                  <>
                    <Clock className="h-3.5 w-3.5" /> Countdown to June 20, {stats.nextYear}
                  </>
                )}
              </p>

              <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                {[
                  { label: 'Days', value: stats.days },
                  { label: 'Hours', value: stats.hours },
                  { label: 'Mins', value: stats.minutes },
                  { label: 'Secs', value: stats.seconds },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="rounded-xl border border-purple-300/20 bg-purple-950/60 px-2 py-2.5"
                  >
                    <span className="font-display block text-xl font-bold text-white sm:text-2xl">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-purple-300/80">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-purple-200/80">
              <CalendarHeart className="h-3.5 w-3.5 text-fuchsia-300" />
              Every June 20th is my favorite day on the calendar 💜
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Crown, Disc3, Heart, Music, Pause, Play, Sparkles, Star } from 'lucide-react';
import { FAVORITE_BTS_SONGS, OT7_MEMBERS, PRESERVED_ARMY_QUOTE, TRACKS, type Track } from '../data/universe';
import { PurpleFireworks } from './PurpleFireworks';

interface UniverseSectionsProps {
  currentTrack: Track;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
}

export function UniverseSections({ currentTrack, isPlaying, onSelectTrack }: UniverseSectionsProps) {
  const [selectedMember, setSelectedMember] = useState(OT7_MEMBERS[5]); // V highlighted by default
  const [letterOpen, setLetterOpen] = useState(false);

  return (
    <div className="relative z-10 space-y-6 pb-20">
      {/* 2. The Purple Promise */}
      <section id="promise" className="mx-auto max-w-5xl px-4 py-14">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="rounded-3xl border border-purple-300/25 bg-gradient-to-br from-[#230c4c]/85 via-[#170736]/90 to-[#110428]/95 p-7 text-center shadow-[0_20px_60px_rgba(6,2,18,0.65)] backdrop-blur-md sm:p-10"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">The Purple Promise</p>
          <h2 className="font-script mt-1 text-5xl text-white drop-shadow-[0_0_16px_rgba(216,130,255,0.8)]">
            I Purple You Forever
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-purple-100/90">
            Purple is the last color of the rainbow — it means trusting, loving, and staying together for a very long
            time. Just like your promise: always staying by each other’s side through every season.
          </p>
          <blockquote className="mx-auto mt-5 max-w-xl rounded-2xl border border-fuchsia-300/30 bg-purple-950/60 px-5 py-4 text-sm font-medium italic text-fuchsia-100">
            “{PRESERVED_ARMY_QUOTE}”
            <footer className="mt-1 text-[11px] not-italic text-purple-300">— Nishi’s message for ARMY 💜</footer>
          </blockquote>
        </motion.div>
      </section>

      {/* HD AI Art — 7 Magical Realms Portal */}
      <section id="realms" className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: '#ot7', title: 'OT7 Constellation', desc: 'Seven stars shining as one family.', img: '/assets/ai/realm-ot7-alt.jpg' },
            { href: '#music', title: 'Music Galaxy', desc: '7 full playable tracks & BTS favorites.', img: '/assets/ai/realm-music.jpg' },
            { href: '#taehyung', title: "V's Violet Corner", desc: 'Kim Taehyung’s royal violet sanctuary.', img: '/assets/ai/v-violet-corner.jpg' },
            { href: '#busan', title: 'Busan Memories', desc: 'Unforgettable concert lights & keepsakes.', img: '/assets/ai/realm-memory.jpg' },
            { href: '#quest', title: 'Seven-Star Quest', desc: 'Playable 60fps star-catching mini-game.', img: '/assets/ai/realm-quest.jpg' },
            { href: '#wishes', title: 'Star Wishes', desc: 'Launch your wishes into the night sky.', img: '/assets/ai/realm-wishes.jpg' },
          ].map((r, i) => (
            <motion.a
              key={r.title}
              href={r.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative h-52 overflow-hidden rounded-2xl border border-purple-300/25 bg-[#170736] shadow-[0_14px_40px_rgba(6,2,18,0.65)]"
            >
              <img
                src={r.img}
                alt={r.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0322] via-[#0d0322]/45 to-transparent opacity-90 transition group-hover:opacity-75" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-lg font-bold text-white">{r.title}</h3>
                <p className="mt-0.5 text-xs text-purple-200/90">{r.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Full-Width OT7 Constellation Cinematic Band */}
      <section id="constellation-band" className="relative w-full overflow-hidden">
        <img
          src="/assets/ai/realm-ot7-alt.jpg"
          alt="Seven glowing constellation stars over a mirrored purple ocean"
          className="h-[46vh] min-h-[300px] w-full object-cover object-center"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b041c]/40 via-transparent to-[#0b041c]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b041c]/70 via-transparent to-[#0b041c]/70" />

        {/* Seven-star constellation overlay — glowing stars only, no text */}
        <svg
          viewBox="0 0 1000 460"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="ot7StarGlow">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="35%" stopColor="#f3d9ff" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#c084fc" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ot7Thread" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#fde68a" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.15" />
            </linearGradient>
            <filter id="ot7Soft" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.4" />
            </filter>
          </defs>

          <g stroke="url(#ot7Thread)" strokeWidth="1.1" fill="none">
            <path d="M118 150 L262 96 L408 132 L520 74 L648 118 L786 88 L880 156" />
            <path d="M520 74 L536 196" strokeOpacity="0.35" />
          </g>

          {[
            [118, 150, 6.5],
            [262, 96, 8.5],
            [408, 132, 6],
            [520, 74, 9.5],
            [648, 118, 6.5],
            [786, 88, 8],
            [880, 156, 6],
          ].map(([cx, cy, r], i) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r={r * 4.2} fill="url(#ot7StarGlow)" filter="url(#ot7Soft)">
                <animate
                  attributeName="opacity"
                  values="0.45;0.95;0.45"
                  dur={`${3.4 + i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={cx} cy={cy} r={r * 0.55} fill="#fffdf7">
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur={`${2.2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>

        <a href="#ot7" aria-label="Open the OT7 constellation" className="absolute inset-0" />
      </section>

      {/* 3. OT7 Seven-Star Interactive Constellation */}
      <section id="ot7" className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">Seven Stars · Equal Light</p>
          <h2 className="font-script mt-1 text-5xl text-white">OT7 Constellation</h2>
          <p className="mt-1 text-sm text-purple-200/85">Tap any star in the constellation to read their tribute.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative h-[280px] overflow-hidden rounded-3xl border border-purple-300/25 bg-[radial-gradient(circle_at_50%_40%,#2d1060,#110428_75%)] p-4">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-45" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#e879f9"
                strokeWidth="0.45"
                points={OT7_MEMBERS.map((m) => `${m.starX},${m.starY}`).join(' ')}
              />
            </svg>
            {OT7_MEMBERS.map((m) => {
              const active = selectedMember.id === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMember(m)}
                  style={{ left: `${m.starX}%`, top: `${m.starY}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 text-xs font-bold transition ${
                    active
                      ? 'scale-115 border border-amber-200 bg-fuchsia-500 text-white shadow-[0_0_22px_rgba(232,121,249,0.95)]'
                      : 'border border-purple-300/40 bg-[#250e4d]/90 text-purple-100 hover:bg-purple-600'
                  }`}
                >
                  ★ {m.stage}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col justify-center rounded-3xl border border-purple-300/25 bg-[#190838]/85 p-6 backdrop-blur-md">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-fuchsia-300/35 bg-fuchsia-500/20 px-3 py-1 text-[11px] font-bold text-fuchsia-200">
              <Crown className="h-3.5 w-3.5" /> {selectedMember.role}
            </span>
            <h3 className="font-display mt-3 text-3xl font-bold text-white">{selectedMember.stage}</h3>
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-300">{selectedMember.fullName}</p>
            <p className="mt-3 text-sm leading-relaxed text-purple-100/90">{selectedMember.note}</p>
          </div>
        </div>
      </section>

      {/* 4. V's Violet Corner */}
      <section id="taehyung" className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid items-center gap-6 overflow-hidden rounded-3xl border border-fuchsia-300/30 bg-gradient-to-r from-[#270d52]/90 to-[#14062e]/95 p-6 shadow-[0_20px_60px_rgba(10,3,26,0.7)] md:grid-cols-2 md:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">Special Royal Corner</p>
            <h2 className="font-script mt-1 text-5xl text-white">V’s Violet Corner</h2>
            <p className="mt-3 text-sm leading-relaxed text-purple-100/90">
              Dedicated to Kim Taehyung — the soul behind “I Purple You”, velvet baritone vocals, timeless style, and
              the warmest purple light in Nishi’s universe.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Kim Taehyung', 'I Purple You 💜', 'Violet Star', 'Winter Bear'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-fuchsia-300/30 bg-purple-900/50 px-3 py-1 text-xs font-semibold text-fuchsia-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-purple-300/25">
            <img
              src="/assets/ai/v-violet-corner.jpg"
              alt="Royal purple galaxy prince portrait for V's Violet Corner"
              className="h-72 w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 5. Music Galaxy */}
      <section id="music" className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">7 Playable Tracks</p>
          <h2 className="font-script mt-1 text-5xl text-white">Music Galaxy</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-purple-300/25 bg-[#170736]/85 p-5 backdrop-blur-md">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
              <Disc3 className="h-4 w-4 text-fuchsia-300" /> Universe Soundtrack (Real Audio)
            </h3>
            <ul className="space-y-2">
              {TRACKS.map((t, idx) => {
                const active = currentTrack.id === t.id;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => onSelectTrack(idx)}
                      className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition ${
                        active
                          ? 'border-fuchsia-300/70 bg-fuchsia-600/30 text-white'
                          : 'border-purple-300/15 bg-purple-950/50 text-purple-100 hover:bg-purple-800/40'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span>{t.emoji}</span>
                        <span>
                          <strong className="block text-xs font-bold">{t.title}</strong>
                          <span className="text-[11px] text-purple-200/75">{t.subtitle}</span>
                        </span>
                      </span>
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-purple-700/70 text-white">
                        {active && isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-3xl border border-purple-300/25 bg-[#170736]/85 p-5 backdrop-blur-md">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
              <Music className="h-4 w-4 text-fuchsia-300" /> Nishi’s Favorite BTS Songs
            </h3>
            <div className="space-y-2.5">
              {FAVORITE_BTS_SONGS.map((s) => (
                <div
                  key={s.title}
                  className="flex items-center justify-between rounded-xl border border-purple-300/15 bg-purple-950/55 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-bold text-white">{s.title}</p>
                    <p className="text-xs text-purple-200/75">{s.era}</p>
                  </div>
                  <span className="rounded-full bg-fuchsia-500/20 px-2.5 py-1 text-[11px] font-semibold text-fuchsia-200">
                    {s.mood}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Busan Memories + 8. BMW Dream Road */}
      <section id="busan" className="mx-auto grid max-w-5xl gap-5 px-4 py-12 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-purple-300/25 bg-[#170736]/85 backdrop-blur-md">
          <img
            src="/assets/nishi-busan-memory.jpg"
            alt="Busan concert memory"
            className="h-56 w-full object-cover"
            loading="lazy"
          />
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-fuchsia-300">Special Keepsake</p>
            <h3 className="font-script mt-1 text-4xl text-white">Busan Memories</h3>
            <p className="mt-2 text-sm text-purple-100/85">
              Ocean lights, stadium purple waves, and the unforgettable Busan concert memory kept glowing forever.
            </p>
          </div>
        </div>

        <div id="bmw" className="overflow-hidden rounded-3xl border border-purple-300/25 bg-[#170736]/85 backdrop-blur-md">
          <img
            src="/assets/ai/realm-road.jpg"
            alt="Purple night highway BMW dream road"
            className="h-56 w-full object-cover"
            loading="lazy"
          />
          <div className="p-6">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.22em] text-fuchsia-300">
              <Car className="h-3.5 w-3.5" /> Dream Drive
            </p>
            <h3 className="font-script mt-1 text-4xl text-white">BMW Dream Road</h3>
            <p className="mt-2 text-sm text-purple-100/85">
              Midnight purple highway, favorite BTS tracks on full volume, and Nishi’s dream BMW cruising under the
              stars.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Final Letter & Secret Ending */}
      <section id="letter" className="mx-auto max-w-4xl px-4 py-14 text-center">
        <div className="rounded-3xl border border-fuchsia-300/35 bg-gradient-to-b from-[#270d54]/90 to-[#12052b]/95 p-8 shadow-[0_24px_70px_rgba(147,51,234,0.38)] backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">Secret Gift Box</p>
          <h2 className="font-script mt-1 text-5xl text-white">A Letter For Nishi</h2>

          {/* Animated Glowing Gift Box */}
          <div className="mt-7 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="relative"
            >
              {/* pulsing halo rings */}
              <span className="pointer-events-none absolute -inset-5 rounded-full bg-[radial-gradient(circle,rgba(232,121,249,0.42),transparent_70%)] blur-xl" />
              <span className="animate-ping pointer-events-none absolute -inset-2 rounded-[2rem] border border-fuchsia-300/30" />
              <span className="animate-float-slow pointer-events-none absolute -left-8 -top-5 text-xl">✨</span>
              <span className="animate-float-slow pointer-events-none absolute -right-7 top-7 text-base" style={{ animationDelay: '-1.6s' }}>⭐</span>
              <span className="animate-float-slow pointer-events-none absolute -bottom-3 -left-5 text-base" style={{ animationDelay: '-3.1s' }}>💜</span>

              <button
                type="button"
                id="open-purple-memory"
                onClick={() => setLetterOpen((v) => !v)}
                className="group relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-[1.75rem] border-2 border-amber-300/80 bg-gradient-to-br from-fuchsia-600/80 via-purple-700/90 to-indigo-950 shadow-[0_0_60px_rgba(217,70,239,0.75)] transition duration-300 hover:scale-105 active:scale-95"
                style={{ transform: letterOpen ? 'rotate(-4deg) scale(1.06)' : undefined }}
                aria-label={letterOpen ? 'Close Your Purple Memory' : 'Open Your Purple Memory'}
              >
                <img
                  src="/assets/ai/surprise-box.jpg"
                  alt="Glowing purple gift box"
                  className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#12052b]/70 via-transparent to-[#12052b]/30" />
                <span className="relative z-10 text-7xl drop-shadow-[0_8px_22px_rgba(0,0,0,0.8)]">
                  {letterOpen ? '💌' : '🎁'}
                </span>
              </button>
            </motion.div>

            <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-200">
              <Sparkles className="h-3.5 w-3.5" />
              {letterOpen ? 'Your Purple Memory Is Open · Tap To Close' : 'Tap The Gift Box · Open Your Purple Memory'}
            </p>
          </div>

          {letterOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="mt-6 rounded-2xl border border-amber-100/75 bg-gradient-to-br from-[#fff8eb] via-[#f6e7cc] to-[#ebd2ad] p-6 text-left text-[#3b1b4d] shadow-2xl"
            >
              <p className="font-script text-3xl text-purple-900">To my dearest Nishi ♥</p>
              <p className="mt-3 text-sm leading-relaxed">
                This entire purple universe was built just for you — from the seven stars of BTS and V’s Violet Corner
                to your dream BMW road and Busan memories. No matter how far the miles are, may your days always stay
                bright, peaceful, and full of purple magic.
              </p>
              <p className="mt-3 text-sm font-semibold text-purple-900">Happy Purple Day, Nishi 💜✨</p>
              <p className="font-script mt-3 text-right text-2xl text-purple-900">With love, Your Bilal 💜</p>
            </motion.div>
          )}
          <PurpleFireworks active={letterOpen} />

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-purple-200/75">
            <Heart className="h-3.5 w-3.5 fill-fuchsia-400 text-fuchsia-400" />
            <span>Happy Purple Day · With love, Your Bilal 💜</span>
            <Star className="h-3.5 w-3.5 text-amber-300" />
          </p>
        </div>
      </section>
    </div>
  );
}

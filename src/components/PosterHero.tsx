import { useState } from 'react';
import {
  Cake,
  Camera,
  ChevronDown,
  ChevronRight,
  Crown,
  Gem,
  Gift,
  Heart,
  Home,
  Images,
  Infinity as InfinityIcon,
  Mail,
  Menu,
  MessageCircleHeart,
  Moon,
  Music,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Sparkles,
  Star,
  Sun,
  X,
} from 'lucide-react';
import type { Track } from '../data/universe';

interface PosterHeroProps {
  track: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  shuffle: boolean;
  repeat: boolean;
  glowMode: 'vivid' | 'twilight';
  onToggleGlow: () => void;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onSeek: (pct: number) => void;
}

function fmt(sec: number) {
  if (!Number.isFinite(sec) || sec <= 0) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function PosterHero({
  track,
  isPlaying,
  currentTime,
  duration,
  shuffle,
  repeat,
  glowMode,
  onToggleGlow,
  onTogglePlay,
  onPrev,
  onNext,
  onToggleShuffle,
  onToggleRepeat,
  onSeek,
}: PosterHeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden">
      {/* Full-Bleed Fantasy Castle Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/assets/ai/hero-castle.jpg"
          alt="Moonlit purple castle above a waterfall with roses and lanterns"
          fetchPriority="high"
          decoding="async"
          className={`h-full w-full object-cover object-[center_26%] transition-all duration-700 ${
            glowMode === 'vivid' ? 'brightness-95 saturate-125 contrast-105' : 'brightness-75 saturate-110'
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(62%_52%_at_50%_34%,rgba(168,85,247,0.14)_0%,rgba(18,6,38,0.34)_56%,rgba(10,3,24,0.84)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0424]/70 via-transparent to-[#0b031d]/90" />

        {/* Floating Neon Butterflies */}
        <span className="animate-float-slow absolute right-[23%] top-[19%] text-2xl drop-shadow-[0_0_14px_rgba(232,121,249,0.95)]">
          🦋
        </span>
        <span
          className="animate-float-slow absolute left-[22%] top-[53%] text-xl drop-shadow-[0_0_14px_rgba(216,118,255,0.95)]"
          style={{ animationDelay: '-2.2s' }}
        >
          🦋
        </span>
        <span
          className="animate-float-slow absolute bottom-[24%] right-[21%] text-xl drop-shadow-[0_0_14px_rgba(192,102,255,0.95)]"
          style={{ animationDelay: '-4.1s' }}
        >
          🦋
        </span>
      </div>

      {/* Top Pill Navbar */}
      <header className="sticky top-0 z-30 border-b border-purple-300/15 bg-[#12062a]/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-3 px-4 py-2.5 lg:px-6">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-2.5 text-white no-underline">
            <span className="flex flex-col items-center leading-none drop-shadow-[0_0_10px_rgba(216,130,255,0.85)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M4 3.5l6.8 3.2v13.8L4 17.5V3.5zm16 0l-6.8 3.2v13.8l6.8-3V3.5z" />
              </svg>
              <span className="mt-0.5 text-[9px] font-extrabold tracking-[0.16em]">BTS</span>
            </span>
            <span className="h-5 w-px bg-purple-200/35" />
            <span className="font-script text-2xl text-white drop-shadow-[0_0_12px_rgba(216,130,255,0.85)]">
              Nishi’s Purple Universe ♥
            </span>
          </a>

          {/* Center Pill Links */}
          <nav className="hidden items-center gap-1.5 md:flex" aria-label="Primary navigation">
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-200/70 bg-gradient-to-r from-fuchsia-600 to-purple-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-[0_0_18px_rgba(192,102,255,0.7)] transition hover:scale-105"
            >
              <Home className="h-3.5 w-3.5" /> Home
            </a>
            <a
              href="#ot7"
              className="inline-flex items-center gap-1.5 rounded-full border border-purple-300/25 bg-[#220e48]/75 px-3 py-1.5 text-xs font-semibold text-purple-100 transition hover:border-fuchsia-300/60 hover:bg-purple-700/70"
            >
              <Crown className="h-3.5 w-3.5 text-fuchsia-300" /> BTS World
            </a>
            <a
              href="#promise"
              className="inline-flex items-center gap-1.5 rounded-full border border-purple-300/25 bg-[#220e48]/75 px-3 py-1.5 text-xs font-semibold text-purple-100 transition hover:border-fuchsia-300/60 hover:bg-purple-700/70"
            >
              <Heart className="h-3.5 w-3.5 text-fuchsia-300" /> For Nishi
            </a>
            <a
              href="#music"
              className="inline-flex items-center gap-1.5 rounded-full border border-purple-300/25 bg-[#220e48]/75 px-3 py-1.5 text-xs font-semibold text-purple-100 transition hover:border-fuchsia-300/60 hover:bg-purple-700/70"
            >
              <Music className="h-3.5 w-3.5 text-fuchsia-300" /> Music
            </a>
            <a
              href="#busan"
              className="inline-flex items-center gap-1.5 rounded-full border border-purple-300/25 bg-[#220e48]/75 px-3 py-1.5 text-xs font-semibold text-purple-100 transition hover:border-fuchsia-300/60 hover:bg-purple-700/70"
            >
              <Camera className="h-3.5 w-3.5 text-fuchsia-300" /> Gallery
            </a>
            <a
              href="#quest"
              className="inline-flex items-center gap-1.5 rounded-full border border-purple-300/25 bg-[#220e48]/75 px-3 py-1.5 text-xs font-semibold text-purple-100 transition hover:border-fuchsia-300/60 hover:bg-purple-700/70"
            >
              <Star className="h-3.5 w-3.5 text-fuchsia-300" /> Quest
            </a>
          </nav>

          {/* Right Sun/Moon Toggle + Heart */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleGlow}
              aria-label="Toggle sky brightness"
              className="inline-flex items-center gap-1.5 rounded-full border border-purple-300/30 bg-[#220e48]/80 px-2.5 py-1.5 text-xs font-semibold text-purple-100 transition hover:border-fuchsia-300/70"
            >
              <Sun className={`h-3.5 w-3.5 ${glowMode === 'vivid' ? 'text-amber-300' : 'opacity-40'}`} />
              <Moon className={`h-3.5 w-3.5 ${glowMode === 'twilight' ? 'text-fuchsia-300' : 'opacity-40'}`} />
            </button>
            <a
              href="#letter"
              aria-label="Jump to secret letter"
              className="grid h-8 w-8 place-items-center rounded-full border border-purple-300/35 bg-[#220e48]/85 text-fuchsia-300 shadow-[0_0_14px_rgba(192,102,255,0.45)] transition hover:scale-110"
            >
              <Heart className="h-4 w-4 fill-current" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="grid h-8 w-8 place-items-center rounded-full border border-purple-300/35 bg-[#220e48]/85 text-purple-100 transition hover:border-fuchsia-300/70 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Navigation Menu */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-purple-300/20 bg-[#14072d]/95 px-4 py-3 backdrop-blur-xl md:hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: '#home', label: 'Home', Icon: Home },
                { href: '#ot7', label: 'BTS World', Icon: Crown },
                { href: '#music', label: 'Music', Icon: Music },
                { href: '#memories', label: 'Gallery', Icon: Images },
                { href: '#open-when', label: 'Open When', Icon: Mail },
                { href: '#cake', label: 'Birthday Cake', Icon: Cake },
                { href: '#starmap', label: 'Star Map', Icon: Sparkles },
                { href: '#quest', label: 'Star Quest', Icon: Star },
                { href: '#letter', label: 'Secret Letter', Icon: Heart },
              ].map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl border border-purple-300/20 bg-purple-950/55 px-3 py-2 text-xs font-semibold text-purple-100 transition hover:border-fuchsia-300/60 hover:bg-purple-800/60"
                >
                  <Icon className="h-3.5 w-3.5 text-fuchsia-300" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Main 3-Column Poster Stage */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1380px] flex-1 grid-cols-1 items-end gap-5 px-4 py-5 lg:grid-cols-[270px_1fr_270px] lg:px-6">
        {/* Left Column: Title + Glass Menu + BTS Forever Orb */}
        <div className="flex flex-col items-center justify-between gap-4 self-stretch lg:items-start">
          <div className="text-center lg:text-left">
            <p className="font-script text-2xl text-fuchsia-100 drop-shadow-[0_0_14px_rgba(216,130,255,0.9)]">
              Welcome to ♥
            </p>
            <h1 className="font-script mt-0.5 bg-gradient-to-b from-white via-fuchsia-100 to-purple-300 bg-clip-text text-5xl leading-[1.02] text-transparent drop-shadow-[0_0_22px_rgba(216,118,255,0.9)] sm:text-6xl">
              Nishi’s
              <span className="block">Purple Universe ♥</span>
            </h1>
            <p className="mt-2 max-w-[27ch] text-xs leading-relaxed text-purple-100/95 drop-shadow">
              A special world, made just for you… by ARMY, with endless love 💜
            </p>
            <a
              href="#promise"
              className="animate-pulse-glow mt-3 inline-flex items-center gap-1.5 rounded-full border border-fuchsia-200/65 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-700 px-4 py-2 text-xs font-bold text-white transition hover:scale-105"
            >
              <Sparkles className="h-3.5 w-3.5" /> Explore Our Universe →
            </a>
          </div>

          {/* Left Glass Menu */}
          <nav
            aria-label="Quick universe shortcuts"
            className="w-full max-w-[240px] rounded-2xl border border-purple-300/25 bg-[#190938]/80 p-2 shadow-[0_14px_38px_rgba(6,2,18,0.68)] backdrop-blur-md"
          >
            {[
              { href: '#ot7', label: 'OT7 World', Icon: Crown },
              { href: '#taehyung', label: "Taehyung's Gallery", Icon: Gem },
              { href: '#memories', label: 'Our Little Moments', Icon: Images },
              { href: '#open-when', label: 'Open When Letters', Icon: Mail },
              { href: '#cake', label: 'Birthday Cake', Icon: Cake },
              { href: '#starmap', label: 'Written in Stars', Icon: Sparkles },
              { href: '#busan', label: "Nishi's Memories", Icon: Heart },
              { href: '#quest', label: 'Seven-Star Quest', Icon: Star },
              { href: '#bmw', label: 'BMW Dream Road', Icon: Gift },
              { href: '#letter', label: 'Message for You', Icon: MessageCircleHeart },
            ].map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-semibold text-purple-50 transition hover:bg-purple-600/35 hover:text-white"
              >
                <Icon className="h-3.5 w-3.5 text-fuchsia-300" />
                <span>{label}</span>
                <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-60" />
              </a>
            ))}
          </nav>

          {/* BTS Forever Orb */}
          <a
            href="#ot7"
            className="hidden h-24 w-24 place-items-center rounded-full border border-fuchsia-200/65 bg-[radial-gradient(circle_at_35%_30%,rgba(244,182,255,0.85),rgba(147,51,234,0.75)_48%,rgba(46,16,101,0.95)_100%)] text-center shadow-[0_0_30px_rgba(192,102,255,0.75)] transition hover:scale-105 lg:grid"
          >
            <span className="font-script text-xl leading-tight text-white drop-shadow">
              BTS
              <br />
              Forever ♥
            </span>
          </a>
        </div>

        {/* Center Column: Crystal Heart Keyhole + Unlock Ribbon */}
        <div className="flex flex-col items-center justify-end pb-2">
          <a href="#promise" className="group flex flex-col items-center no-underline transition hover:-translate-y-1">
            <div className="h-24 w-28 drop-shadow-[0_0_26px_rgba(216,118,255,0.95)] transition group-hover:scale-105">
              <svg viewBox="0 0 120 112" fill="none" className="h-full w-full">
                <defs>
                  <linearGradient id="v2-gold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fff4c4" />
                    <stop offset="50%" stopColor="#f3c669" />
                    <stop offset="100%" stopColor="#b7791f" />
                  </linearGradient>
                  <radialGradient id="v2-gem" cx="45%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#f5d0fe" />
                    <stop offset="45%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#4c1d95" />
                  </radialGradient>
                </defs>
                <path
                  d="M60 100C60 100 14 70 14 38C14 21 27 10 42 10C51 10 57 15 60 22C63 15 69 10 78 10C93 10 106 21 106 38C106 70 60 100 60 100Z"
                  fill="url(#v2-gem)"
                  stroke="url(#v2-gold)"
                  strokeWidth="4.5"
                />
                <circle cx="60" cy="46" r="8.5" fill="#1e073b" />
                <path d="M55.5 51L53 69H67L64.5 51H55.5Z" fill="#1e073b" />
              </svg>
            </div>
            <span className="font-script -mt-3 rounded-full border border-amber-200/75 bg-gradient-to-b from-[#43167d] to-[#200a44] px-6 py-1.5 text-2xl text-amber-50 shadow-[0_8px_24px_rgba(8,2,22,0.8),0_0_20px_rgba(192,102,255,0.6)]">
              Unlock the Magic… ♥
            </span>
          </a>
        </div>

        {/* Right Column: Sky Quote + Now Playing Card + Parchment Letter */}
        <div className="flex flex-col items-center justify-between gap-4 self-stretch lg:items-end">
          <p className="font-script -rotate-3 text-center text-2xl leading-tight text-fuchsia-50 drop-shadow-[0_0_16px_rgba(216,130,255,0.95)] lg:text-right">
            You are
            <br />
            my Purple Star
            <span className="block text-xl">— BTS ♥</span>
          </p>

          {/* Now Playing Glass Card */}
          <aside
            aria-label="Now Playing"
            className="w-full max-w-[258px] rounded-2xl border border-purple-300/35 bg-[#1e0b42]/85 p-3.5 shadow-[0_16px_40px_rgba(6,2,18,0.7)] backdrop-blur-md"
          >
            <div className="mb-2 flex items-center justify-between text-xs font-bold text-purple-100">
              <span className="inline-flex items-center gap-1.5">
                <Music className="h-3.5 w-3.5 text-fuchsia-300" /> Now Playing
              </span>
              <a href="#music" className="text-purple-200/80 hover:text-white" aria-label="Open Music Galaxy">
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mb-2.5 grid h-20 w-full place-items-center rounded-xl border border-purple-300/30 bg-[radial-gradient(circle_at_50%_45%,rgba(192,102,255,0.65),rgba(46,16,101,0.95)_75%)] shadow-inner">
              <div className="flex flex-col items-center text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.75)]">
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
                  <path d="M4 3.5l6.8 3.2v13.8L4 17.5V3.5zm16 0l-6.8 3.2v13.8l6.8-3V3.5z" />
                </svg>
                <span className="mt-0.5 text-[10px] font-extrabold tracking-[0.18em]">BTS</span>
              </div>
            </div>

            <p id="hero-now-title" className="truncate text-center text-sm font-bold text-white">
              {track.emoji} {track.title}
            </p>
            <p className="mb-2.5 truncate text-center text-[11px] text-purple-200/80">{track.subtitle}</p>

            {/* 5 Controls */}
            <div className="mb-2.5 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={onToggleShuffle}
                aria-label="Toggle shuffle"
                className={`rounded-full p-1.5 transition ${
                  shuffle ? 'text-fuchsia-300' : 'text-purple-200/60 hover:text-white'
                }`}
              >
                <Shuffle className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                id="hero-prev"
                onClick={onPrev}
                aria-label="Previous track"
                className="rounded-full p-1.5 text-purple-100 transition hover:bg-purple-700/50"
              >
                <SkipBack className="h-4 w-4 fill-current" />
              </button>
              <button
                type="button"
                id="hero-play"
                onClick={onTogglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-[0_0_18px_rgba(217,70,239,0.75)] transition hover:scale-105"
              >
                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
              </button>
              <button
                type="button"
                id="hero-next"
                onClick={onNext}
                aria-label="Next track"
                className="rounded-full p-1.5 text-purple-100 transition hover:bg-purple-700/50"
              >
                <SkipForward className="h-4 w-4 fill-current" />
              </button>
              <button
                type="button"
                onClick={onToggleRepeat}
                aria-label="Toggle repeat"
                className={`rounded-full p-1.5 transition ${
                  repeat ? 'text-fuchsia-300' : 'text-purple-200/60 hover:text-white'
                }`}
              >
                <Repeat className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Seek Bar + Timer */}
            <div
              role="slider"
              aria-label="Track progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pct)}
              tabIndex={0}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onSeek(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
              }}
              className="h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-purple-950/90"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-purple-300 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px] font-medium text-purple-200/75">
              <span>{fmt(currentTime)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </aside>

          {/* Tilted Cream Parchment Letter */}
          <figure className="relative w-full max-w-[258px] -rotate-2 rounded-xl border border-amber-100/80 bg-gradient-to-br from-[#fff8eb] via-[#f6e7cc] to-[#ebd2ad] p-3.5 text-center text-[#3d1c4f] shadow-[0_16px_36px_rgba(8,2,22,0.7)]">
            <span className="pointer-events-none absolute -bottom-2.5 -left-2.5 text-2xl drop-shadow">🌹</span>
            <p className="font-script text-xl text-purple-900">To my dearest Nishi ♥</p>
            <p className="mt-1 text-[11px] leading-relaxed text-purple-950/90">
              You make the world brighter, our hearts happier, and life more beautiful… I purple you always! ♥
            </p>
            <figcaption className="font-script mt-1.5 text-right text-lg text-purple-900">— BTS &amp; Bilal ♥</figcaption>
          </figure>
        </div>
      </div>

      {/* Bottom Glass Dock Bar */}
      <div className="relative z-10 border-t border-purple-300/20 bg-[#12062a]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-3 px-4 py-2.5 lg:px-6">
          <ul className="flex flex-1 flex-wrap items-center justify-around gap-3 text-center text-[11px] text-purple-100">
            <li className="flex flex-col items-center">
              <InfinityIcon className="mb-0.5 h-4 w-4 text-fuchsia-300" />
              <strong className="text-white">7 Members</strong>
              <span className="text-[10px] text-purple-200/75">1 Family</span>
            </li>
            <li className="flex flex-col items-center">
              <Music className="mb-0.5 h-4 w-4 text-fuchsia-300" />
              <strong className="text-white">Endless Music</strong>
              <span className="text-[10px] text-purple-200/75">7 Real Tracks</span>
            </li>
            <li className="flex flex-col items-center">
              <Camera className="mb-0.5 h-4 w-4 text-fuchsia-300" />
              <strong className="text-white">Beautiful Gallery</strong>
              <span className="text-[10px] text-purple-200/75">Busan Memories</span>
            </li>
            <li className="flex flex-col items-center">
              <Star className="mb-0.5 h-4 w-4 text-fuchsia-300" />
              <strong className="text-white">Dream Big</strong>
              <span className="text-[10px] text-purple-200/75">Seven Stars</span>
            </li>
            <li className="flex flex-col items-center">
              <Heart className="mb-0.5 h-4 w-4 text-fuchsia-300" />
              <strong className="text-white">Always With You</strong>
              <span className="text-[10px] text-purple-200/75">Forever Purple</span>
            </li>
          </ul>
          <a
            href="#promise"
            className="inline-flex items-center gap-1 rounded-full border border-purple-200/50 bg-purple-700/70 px-4 py-1.5 text-xs font-bold text-white shadow-[0_0_16px_rgba(168,85,247,0.5)] transition hover:bg-fuchsia-600"
          >
            Scroll Down <ChevronDown className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

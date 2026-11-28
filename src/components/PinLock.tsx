import { useEffect, useState } from 'react';
import { Delete, Lock, Sparkles } from 'lucide-react';

type Mood = 'idle' | 'thinking' | 'sad' | 'crying' | 'happy';

const CORRECT_PIN = '20062008';

const STICKERS: Record<Mood, { src: string; alt: string; badge: string }> = {
  idle: { src: '/assets/stickers/bubu-dudu-hug.gif', alt: 'Bubu and Dudu hugging', badge: '💜' },
  thinking: { src: '/assets/stickers/bubu-dudu-thinking.gif', alt: 'Bubu and Dudu thinking', badge: '💭' },
  sad: { src: '/assets/stickers/dudu-sad.gif', alt: 'Dudu looking sad', badge: '🥺' },
  crying: { src: '/assets/stickers/bubu-dudu-cry.gif', alt: 'Bubu and Dudu crying', badge: '💧' },
  happy: { src: '/assets/stickers/bubu-dudu-hug.gif', alt: 'Bubu and Dudu celebrating', badge: '🎉' },
};

export function PinLock({ onUnlock }: { onUnlock: () => void }) {
  const [entered, setEntered] = useState('');
  const [mood, setMood] = useState<Mood>('idle');
  const [wrongCount, setWrongCount] = useState(0);
  const [status, setStatus] = useState('Enter your birthday PIN to unlock the magic ✨');
  const [shaking, setShaking] = useState(false);

  const handleDigit = (d: string) => {
    if (entered.length >= 8 || mood === 'happy') return;
    const next = entered + d;
    setEntered(next);
    setMood('thinking');
    setStatus('A little magic, one number at a time… 💭💜');

    if (next.length === 8) {
      if (next === CORRECT_PIN) {
        setMood('happy');
        setStatus('Welcome home, Nishi! Opening your purple universe… 🎉💜');
        window.setTimeout(() => onUnlock(), 650);
      } else {
        const nextWrong = wrongCount + 1;
        setWrongCount(nextWrong);
        setMood(nextWrong > 1 ? 'crying' : 'sad');
        setStatus(
          nextWrong > 1
            ? 'Oh nooo! Bubu & Dudu are crying 🥺💧 Try again!'
            : 'Oopsie! Bubu is a little sad 🥺💜 Try again!'
        );
        setShaking(true);
        window.setTimeout(() => {
          setShaking(false);
          setEntered('');
        }, 520);
      }
    }
  };

  const handleBackspace = () => {
    if (!entered.length || mood === 'happy') return;
    const next = entered.slice(0, -1);
    setEntered(next);
    setMood(next.length ? 'thinking' : 'idle');
  };

  const handleClear = () => {
    setEntered('');
    setMood('idle');
    setStatus('PIN cleared. Take your time 🌷');
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) handleDigit(e.key);
      else if (e.key === 'Backspace') handleBackspace();
      else if (e.key === 'Escape') handleClear();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const sticker = STICKERS[mood];

  return (
    <section
      id="pin-lock"
      role="dialog"
      aria-modal="true"
      aria-label="Nishi's Purple Universe PIN Lock"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#090318]/92 px-4 py-6 backdrop-blur-xl"
    >
      <div
        className={`w-full max-w-[395px] rounded-3xl border border-purple-300/25 bg-gradient-to-b from-[#230e4a]/95 to-[#120629]/98 p-6 text-center shadow-[0_24px_80px_rgba(147,51,234,0.45)] ${
          shaking ? 'animate-shake' : ''
        }`}
      >
        <div className="relative mx-auto mb-3 flex h-36 w-36 items-center justify-center rounded-2xl border border-purple-200/40 bg-gradient-to-br from-white via-purple-50 to-fuchsia-100 p-2 shadow-[0_0_30px_rgba(216,130,255,0.4)]">
          <img
            src={sticker.src}
            alt={sticker.alt}
            className="h-full w-full object-contain"
          />
          <span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full border border-purple-300/40 bg-[#2a1058] text-sm shadow-lg">
            {sticker.badge}
          </span>
        </div>

        <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">
          <Sparkles className="h-3.5 w-3.5" /> A Little Secret For You
        </p>
        <h1 className="font-script text-shimmer mt-1 text-4xl">
          Nishi’s Purple Universe
        </h1>

        <p className="mt-2 min-h-[2.4rem] text-xs font-medium text-purple-100/90" aria-live="polite">
          {status}
        </p>

        {/* 8 PIN dots */}
        <div className="my-4 flex items-center justify-center gap-2.5" aria-label="PIN progress">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className={`h-3 w-3 rounded-full border transition-all duration-200 ${
                i < entered.length
                  ? 'scale-110 border-fuchsia-200 bg-fuchsia-400 shadow-[0_0_12px_rgba(232,121,249,0.95)]'
                  : 'border-purple-300/40 bg-purple-950/60'
              }`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="mx-auto grid max-w-[290px] grid-cols-3 gap-2.5" role="group" aria-label="PIN keypad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
            <button
              key={d}
              type="button"
              data-pin-digit={d}
              onClick={() => handleDigit(d)}
              className="pin-key h-12 rounded-xl border border-purple-300/20 bg-purple-900/45 text-lg font-bold text-white transition hover:border-fuchsia-300/60 hover:bg-purple-700/60 active:scale-95"
            >
              {d}
            </button>
          ))}
          <button
            type="button"
            onClick={handleClear}
            className="h-12 rounded-xl border border-purple-300/20 bg-purple-950/60 text-xs font-bold uppercase tracking-wider text-purple-200 transition hover:bg-purple-800/50 active:scale-95"
          >
            Clear
          </button>
          <button
            type="button"
            data-pin-digit="0"
            onClick={() => handleDigit('0')}
            className="pin-key h-12 rounded-xl border border-purple-300/20 bg-purple-900/45 text-lg font-bold text-white transition hover:border-fuchsia-300/60 hover:bg-purple-700/60 active:scale-95"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            aria-label="Backspace"
            className="flex h-12 items-center justify-center rounded-xl border border-purple-300/20 bg-purple-950/60 text-purple-200 transition hover:bg-purple-800/50 active:scale-95"
          >
            <Delete className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-purple-200/70">
          <Lock className="h-3 w-3" /> With love, Your Bilal 💜
        </p>
      </div>
    </section>
  );
}

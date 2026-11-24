import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'nishi_v2_wishes';

export function StarWishes() {
  const [wishes, setWishes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : ['Always stay happy and glowing 💜'];
    } catch {
      return ['Always stay happy and glowing 💜'];
    }
  });
  const [input, setInput] = useState('');

  const addWish = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const next = [text, ...wishes].slice(0, 12);
    setWishes(next);
    setInput('');
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage quota errors
    }
  };

  const clearWishes = () => {
    setWishes([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <section id="wishes" className="relative z-10 mx-auto max-w-5xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="rounded-3xl border border-purple-300/25 bg-[#160633]/85 p-6 shadow-[0_20px_60px_rgba(6,2,18,0.7)] backdrop-blur-md sm:p-8"
      >
        <div className="mb-5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">Make a Wish</p>
          <h2 className="font-script mt-1 text-5xl text-white drop-shadow-[0_0_16px_rgba(216,130,255,0.8)]">
            Star Wishes Constellation
          </h2>
          <p className="mt-1 text-sm text-purple-200/85">
            Every wish you write becomes a glowing star saved in your universe.
          </p>
        </div>

        <form onSubmit={addWish} className="mx-auto flex max-w-xl flex-col gap-2.5 sm:flex-row">
          <input
            type="text"
            id="wish-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={120}
            placeholder="Write your wish here… ✨"
            className="flex-1 rounded-full border border-purple-300/30 bg-purple-950/75 px-4 py-2.5 text-sm text-white placeholder-purple-300/60 outline-none focus:border-fuchsia-400"
          />
          <button
            type="submit"
            id="wish-send"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(192,102,255,0.6)] transition hover:scale-105"
          >
            <Send className="h-3.5 w-3.5" /> Send to Stars
          </button>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          <AnimatePresence>
            {wishes.map((w, idx) => (
              <motion.span
                key={`${w}-${idx}`}
                initial={{ opacity: 0, scale: 0.7, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-300/35 bg-purple-900/60 px-3.5 py-1.5 text-xs font-medium text-purple-50 shadow-[0_0_16px_rgba(168,85,247,0.35)]"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-300" /> {w}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3 text-xs text-purple-200/75">
          <span>⭐ {wishes.length} {wishes.length === 1 ? 'wish' : 'wishes'} among the stars</span>
          {wishes.length > 0 && (
            <button
              type="button"
              onClick={clearWishes}
              className="inline-flex items-center gap-1 rounded-full border border-purple-300/20 px-2.5 py-1 text-[11px] text-purple-200/80 hover:bg-purple-800/50"
            >
              <Trash2 className="h-3 w-3" /> Clear
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Mail, MailOpen, Sparkles, X } from 'lucide-react';

interface OpenWhenLetter {
  id: string;
  label: string;
  subtitle: string;
  tag: string;
  body: string[];
  signOff: string;
}

const LETTERS: OpenWhenLetter[] = [
  {
    id: 'miss-me',
    label: 'Open when you miss me',
    subtitle: 'For quiet moments across the miles',
    tag: 'Always Near',
    body: [
      'Close your eyes for three seconds and look up at the same purple sky. No matter how far apart we are, you are never really alone.',
      'Every time you play a BTS track or see a purple star, remember that somewhere I am smiling just thinking about you.',
    ],
    signOff: 'Right beside you in spirit, Your Bilal 💜',
  },
  {
    id: 'bad-day',
    label: 'Open when you had a bad day',
    subtitle: 'When the world feels a little too heavy',
    tag: 'Safe Harbor',
    body: [
      'Take a deep breath, Nishi. You do not have to carry everything all at once. Even the brightest stars need the darkest night to shine.',
      'Put on Save Me or Magic Shop, wrap yourself in something warm, and remember how proud I am of you — not just on your best days, but especially on the hard ones.',
    ],
    signOff: 'Always in your corner, Your Bilal 💜',
  },
  {
    id: 'cant-sleep',
    label: 'Open when you can’t sleep',
    subtitle: 'For 2 AM thoughts and starry ceilings',
    tag: 'Midnight Calm',
    body: [
      'If your mind is racing tonight, let this little universe hold your worries until morning. Count seven purple stars slowly — one for each member of OT7.',
      'Tomorrow is a brand-new page, and you deserve gentle rest before it begins.',
    ],
    signOff: 'Sweetest purple dreams, Your Bilal 💜',
  },
  {
    id: 'listening-bts',
    label: 'Open when you’re listening to BTS',
    subtitle: 'Fake Love, Black Swan, ON, DNA, Save Me',
    tag: 'ARMY Heart',
    body: [
      'Turn the volume up just a little more. That magic you feel when the chorus hits — that is the exact feeling I wanted to bottle up inside this website for you.',
      'Ap hamasa ham lok army ko yead rakhna 🥲 — and never lose that spark that makes your eyes light up.',
    ],
    signOff: 'Borahae forever, Your Bilal 💜',
  },
  {
    id: 'need-smile',
    label: 'Open when you need a smile',
    subtitle: 'A tiny pocket of sunshine',
    tag: 'Instant Joy',
    body: [
      'Reminder: somewhere out there is a sleek BMW waiting for a Busan night drive, a purple stadium ocean glowing, and a guy who built a whole galaxy just to see you grin.',
      'There — I hope that pulled at least a tiny smile out of you.',
    ],
    signOff: 'Keep shining, Your Bilal 💜',
  },
  {
    id: 'doubt-yourself',
    label: 'Open when you doubt yourself',
    subtitle: 'Read this whenever you forget your magic',
    tag: 'Purple Promise',
    body: [
      'You are kinder, stronger, and more special than you give yourself credit for. The people who know you are genuinely lucky to have you in their lives.',
      'Never shrink your dreams. You were born under a June sky meant for big, beautiful things.',
    ],
    signOff: 'I purple you endlessly, Your Bilal 💜',
  },
];

export function OpenWhenLetters() {
  const [active, setActive] = useState<OpenWhenLetter | null>(null);
  const [openedIds, setOpenedIds] = useState<string[]>([]);

  const handleOpen = (letter: OpenWhenLetter) => {
    setActive(letter);
    setOpenedIds((prev) => (prev.includes(letter.id) ? prev : [...prev, letter.id]));
  };

  return (
    <section id="open-when" className="mx-auto max-w-5xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="glass-card gradient-border rounded-3xl p-6 sm:p-8"
      >
        <div className="mb-6 text-center">
          <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
            <Mail className="h-3.5 w-3.5" /> Secret Envelopes
          </p>
          <h2 className="font-script text-shimmer mt-1 text-5xl">
            Open When…
          </h2>
          <p className="mx-auto mt-1 max-w-xl text-sm text-purple-200/85">
            Six sealed purple envelopes written just for you. Tap any envelope whenever the moment calls for it.
          </p>
          <p className="mt-2 text-[11px] font-semibold text-fuchsia-300/85">
            {openedIds.length} / {LETTERS.length} envelopes opened 💜
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LETTERS.map((letter) => {
            const isOpened = openedIds.includes(letter.id);
            return (
              <motion.button
                key={letter.id}
                type="button"
                onClick={() => handleOpen(letter)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 text-left transition ${
                  isOpened
                    ? 'border-fuchsia-300/55 bg-gradient-to-br from-purple-800/55 via-[#25104f]/85 to-[#160832]/90 shadow-[0_12px_36px_rgba(192,102,255,0.28)]'
                    : 'border-purple-300/25 bg-gradient-to-br from-[#2b1058]/80 to-[#160731]/90 shadow-[0_12px_32px_rgba(6,2,18,0.6)] hover:border-fuchsia-300/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-fuchsia-200">
                    {letter.tag}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-purple-200/30 bg-purple-950/60 text-fuchsia-200 transition group-hover:scale-110">
                    {isOpened ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="font-display text-base font-bold text-white">{letter.label}</h3>
                  <p className="mt-1 text-xs text-purple-200/75">{letter.subtitle}</p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-fuchsia-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  {isOpened ? 'Read again' : 'Tap to break the seal'}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.label}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#060110]/90 px-4 py-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 14 }}
              transition={{ type: 'spring', stiffness: 230, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl border border-amber-200/45 bg-gradient-to-b from-[#fbf2e1] to-[#f1dfbe] p-6 text-[#3a1c54] shadow-[0_24px_80px_rgba(147,51,234,0.55)] sm:p-8"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close letter"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-purple-900/20 bg-purple-900/10 text-purple-950 transition hover:bg-purple-900/20"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-purple-800/80">
                <Heart className="h-3 w-3 fill-current" /> {active.tag}
              </p>
              <h3 className="font-script mt-1 text-4xl text-[#4a1474]">{active.label}</h3>

              <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#3b1c55]">
                {active.body.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <p className="font-script mt-6 text-right text-2xl text-[#6b1a9b]">{active.signOff}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

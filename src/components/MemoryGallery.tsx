import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Images, Plus, Sparkles, X } from 'lucide-react';
import { MEMORIES, MEMORY_PLACEHOLDERS } from '../data/memories';

export function MemoryGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const photos = MEMORIES;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setOpenIndex((prev) => {
        if (prev === null || photos.length === 0) return prev;
        return (prev + dir + photos.length) % photos.length;
      });
    },
    [photos.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <section id="memories" className="mx-auto max-w-5xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="glass-card gradient-border rounded-3xl p-6 sm:p-8"
      >
        <div className="mb-5 text-center">
          <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
            <Images className="h-3.5 w-3.5" /> Our Little Moments
          </p>
          <h2 className="font-script text-shimmer mt-1 text-5xl">
            Memory Gallery
          </h2>
          <p className="mx-auto mt-1 max-w-xl text-sm text-purple-200/85">
            Real photographs, real days. Tap any photo to open it full screen and swipe through.
          </p>
        </div>

        {photos.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, i) => (
              <motion.button
                key={photo.id}
                type="button"
                onClick={() => setOpenIndex(i)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-purple-300/25 bg-[#170736] text-left shadow-[0_14px_40px_rgba(6,2,18,0.7)]"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  style={{ objectPosition: photo.position ?? 'center' }}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#0b041c] via-[#0b041c]/25 to-transparent opacity-90" />
                <span className="absolute left-3 top-3 rounded-full border border-fuchsia-200/50 bg-[#12052b]/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-fuchsia-200 backdrop-blur">
                  {photo.tag}
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="font-display block text-base font-bold text-white">{photo.title}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-purple-200/85">{photo.caption}</span>
                </span>
              </motion.button>
            ))}

            {/* Invite more photos */}
            <div
              aria-hidden="true"
              className="flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-purple-300/30 bg-purple-950/35 p-5 text-center"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-fuchsia-300/50 bg-fuchsia-500/20 text-fuchsia-200">
                <Plus className="h-5 w-5" />
              </span>
              <span className="text-xs font-bold text-purple-100">More memories coming</span>
              <span className="text-[11px] leading-snug text-purple-300/80">
                Every photo Nishi sends here finds a home in this purple universe.
              </span>
            </div>
          </div>
        )}

        {/* Placeholder slots: only before any real photo exists */}
        {photos.length === 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MEMORY_PLACEHOLDERS.map((p) => (
              <div
                key={p.title}
                className="flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-purple-300/30 bg-purple-950/35 p-5 text-center"
              >
                <Sparkles className="h-5 w-5 text-fuchsia-300" />
                <p className="font-display text-sm font-bold text-white">{p.title}</p>
                <p className="text-[11px] leading-snug text-purple-300/80">{p.caption}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#060110]/95 px-3 py-6 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close photo"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-purple-300/35 bg-[#1c0b3c]/90 text-purple-100 transition hover:scale-110 hover:bg-purple-700/70"
            >
              <X className="h-5 w-5" />
            </button>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-purple-300/35 bg-[#1c0b3c]/90 text-purple-100 transition hover:scale-110 sm:left-5"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-purple-300/35 bg-[#1c0b3c]/90 text-purple-100 transition hover:scale-110 sm:right-5"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <motion.figure
              key={active.id}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              className="flex max-h-full w-full max-w-3xl flex-col items-center"
            >
              <img
                src={active.src}
                alt={active.title}
                className="max-h-[68vh] w-auto max-w-full rounded-2xl border border-purple-300/25 object-contain shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
              />
              <figcaption className="mt-4 max-w-xl text-center">
                <p className="font-display text-lg font-bold text-white">{active.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-purple-200/85">{active.caption}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-fuchsia-300">
                  <Heart className="h-3 w-3 fill-current" />
                  {openIndex !== null ? `${openIndex + 1} / ${photos.length}` : ''}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

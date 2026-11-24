import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BirthdayCake } from './components/BirthdayCake';
import { BirthdayStarMap } from './components/BirthdayStarMap';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { FloatingMagic } from './components/FloatingMagic';
import { PinLock } from './components/PinLock';
import { MemoryGallery } from './components/MemoryGallery';
import { OpenWhenLetters } from './components/OpenWhenLetters';

const GalaxyBackground = lazy(() =>
  import('./components/GalaxyBackground').then((m) => ({ default: m.GalaxyBackground }))
);
import { PosterHero } from './components/PosterHero';
import { SevenStarQuest } from './components/SevenStarQuest';
import { StarWishes } from './components/StarWishes';
import { UniverseSections } from './components/UniverseSections';
import { TRACKS } from './data/universe';

export function App() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('nishi_v2_unlocked') === '1');
  const [envelopeDone, setEnvelopeDone] = useState(
    () => sessionStorage.getItem('nishi_v2_unlocked') === '1' || sessionStorage.getItem('nishi_v2_envelope') === '1'
  );
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [glowMode, setGlowMode] = useState<'vivid' | 'twilight'>('vivid');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = TRACKS[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = track.src;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [trackIndex]);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleNext = () => {
    if (shuffle) {
      setTrackIndex((prev) => (prev + 1 + Math.floor(Math.random() * (TRACKS.length - 1))) % TRACKS.length);
    } else {
      setTrackIndex((prev) => (prev + 1) % TRACKS.length);
    }
  };

  const handlePrev = () => {
    setTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleSelectTrack = (idx: number) => {
    const audio = audioRef.current;
    if (idx === trackIndex) {
      handleTogglePlay();
      return;
    }
    setTrackIndex(idx);
    if (audio) {
      audio.src = TRACKS[idx].src;
      audio.currentTime = 0;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleSeek = (ratio: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0b041c] text-purple-50">
      <Suspense fallback={null}>
        <GalaxyBackground />
      </Suspense>

      <audio
        ref={audioRef}
        preload="metadata"
        loop={repeat}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          if (!repeat) handleNext();
        }}
      />

      {!envelopeDone && (
        <EnvelopeIntro
          onOpen={() => {
            sessionStorage.setItem('nishi_v2_envelope', '1');
            setEnvelopeDone(true);
          }}
        />
      )}

      {envelopeDone && !unlocked && (
        <PinLock
          onUnlock={() => {
            sessionStorage.setItem('nishi_v2_unlocked', '1');
            setUnlocked(true);
          }}
        />
      )}

      <main>
        <PosterHero
          track={track}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          shuffle={shuffle}
          repeat={repeat}
          glowMode={glowMode}
          onToggleGlow={() => setGlowMode((m) => (m === 'vivid' ? 'twilight' : 'vivid'))}
          onTogglePlay={handleTogglePlay}
          onPrev={handlePrev}
          onNext={handleNext}
          onToggleShuffle={() => setShuffle((s) => !s)}
          onToggleRepeat={() => setRepeat((r) => !r)}
          onSeek={handleSeek}
        />

        <UniverseSections
          currentTrack={track}
          isPlaying={isPlaying}
          onSelectTrack={handleSelectTrack}
        />

        <SevenStarQuest />

        <MemoryGallery />

        <OpenWhenLetters />

        <BirthdayCake />

        <BirthdayStarMap />

        <StarWishes />
      </main>

      {unlocked && <FloatingMagic />}
    </div>
  );
}

export default App;

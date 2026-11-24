export interface Track {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  emoji: string;
}

export interface Ot7Member {
  id: string;
  stage: string;
  fullName: string;
  role: string;
  starX: number;
  starY: number;
  note: string;
}

export const TRACKS: Track[] = [
  { id: 'purple-dawn', title: 'Purple Dawn', subtitle: 'BTS · Seven Stars', src: '/assets/audio/purple-dawn.mp3', emoji: '💜' },
  { id: 'moonlit-castle', title: 'Moonlit Castle', subtitle: 'Nishi’s Universe', src: '/assets/audio/moonlit-castle.mp3', emoji: '🌙' },
  { id: 'starlight-waltz', title: 'Starlight Waltz', subtitle: 'Seven Stars · One Sky', src: '/assets/audio/starlight-waltz.mp3', emoji: '✨' },
  { id: 'rose-garden', title: 'Rose Garden', subtitle: 'Violet Corner', src: '/assets/audio/rose-garden.mp3', emoji: '🌹' },
  { id: 'paper-planes', title: 'Paper Planes', subtitle: 'Dream Sky', src: '/assets/audio/paper-planes.mp3', emoji: '🕊️' },
  { id: 'waterfall', title: 'Waterfall', subtitle: 'Castle Bridge', src: '/assets/audio/waterfall.mp3', emoji: '💧' },
  { id: 'forever-purple', title: 'Forever Purple', subtitle: 'I Purple You', src: '/assets/audio/forever-purple.mp3', emoji: '🪷' },
];

export const FAVORITE_BTS_SONGS = [
  { title: 'Fake Love', era: 'Love Yourself: Tear', mood: 'Dramatic & iconic' },
  { title: 'Save Me', era: 'Young Forever', mood: 'Emotional & unforgettable' },
  { title: 'Black Swan', era: 'Map of the Soul: 7', mood: 'Artistic & deep' },
  { title: 'ON', era: 'Map of the Soul: 7', mood: 'Powerful stadium energy' },
  { title: 'DNA', era: 'Love Yourself: Her', mood: 'Cosmic & bright' },
];

export const OT7_MEMBERS: Ot7Member[] = [
  { id: 'rm', stage: 'RM', fullName: 'Kim Namjoon', role: 'Leader · Wisdom', starX: 14, starY: 42, note: 'The guiding light who turns thoughts into poetry.' },
  { id: 'jin', stage: 'Jin', fullName: 'Kim Seokjin', role: 'Vocal · Warmth', starX: 27, starY: 24, note: 'Silver voice and laughter that brightens every dark day.' },
  { id: 'suga', stage: 'SUGA', fullName: 'Min Yoongi', role: 'Producer · Honesty', starX: 40, starY: 56, note: 'Quiet strength and melodies that heal.' },
  { id: 'jhope', stage: 'j-hope', fullName: 'Jung Hoseok', role: 'Sunshine · Hope', starX: 52, starY: 28, note: 'Pure sunshine and unstoppable stage energy.' },
  { id: 'jimin', stage: 'Jimin', fullName: 'Park Jimin', role: 'Grace · Heart', starX: 65, starY: 54, note: 'Gentle voice and elegance in every single note.' },
  { id: 'v', stage: 'V', fullName: 'Kim Taehyung', role: 'Violet Star · Soul', starX: 78, starY: 22, note: 'Creator of “I Purple You” — Nishi’s special violet corner.' },
  { id: 'jk', stage: 'Jung Kook', fullName: 'Jeon Jungkook', role: 'Golden Star · Passion', starX: 89, starY: 46, note: 'Golden voice and fearless dreams.' },
];

export const PRESERVED_ARMY_QUOTE = 'Ap hamasa ham lok army ko yead rakhna 🥲';

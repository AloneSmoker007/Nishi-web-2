import busanConcert from '../assets/photos/01-busan-concert.jpg';

export interface Memory {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: string;
  /** object-position for the thumbnail crop */
  position?: string;
}

/**
 * Real photos of Nishi (and Bilal).
 *
 * HOW TO ADD A PHOTO
 * 1. Save the picture into `src/assets/photos/` (any name, .jpg or .png).
 * 2. Import it at the top, e.g.  import firstMeet from '../assets/photos/first-meet.jpg';
 * 3. Add one entry below with that import.
 *
 * Order here is the order they appear. Keep the captions short and personal.
 */
export const MEMORIES: Memory[] = [
  {
    id: 'busan',
    src: busanConcert,
    title: 'Busan, That Night',
    caption: 'Stadium lights turned purple and the whole ocean glowed. This one stays forever.',
    tag: 'Busan',
    position: 'center 40%',
  },
];

/** Placeholder slots shown until real photos are added, so the section never looks empty. */
export const MEMORY_PLACEHOLDERS = [
  { title: 'Our First Hello', caption: 'Every universe starts with one small message.' },
  { title: 'The Song We Shared', caption: 'Fake Love on repeat, and suddenly it was our song too.' },
  { title: 'A Purple Evening', caption: 'Some nights never really end.' },
  { title: 'A Little Promise', caption: 'I purple you — today, tomorrow, always.' },
];

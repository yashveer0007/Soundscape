// Curated mood categories (no AI needed).
// Each mood is a list of artists we search for, then combine into one mix.
export const MOODS = {
  happy: {
    label: 'Happy',
    emoji: '😄',
    blurb: 'Bright, feel-good songs.',
    artists: ['Pharrell Williams', 'Bruno Mars', 'Dua Lipa', 'Shreya Ghoshal'],
  },
  chill: {
    label: 'Chill',
    emoji: '😌',
    blurb: 'Soft and relaxed.',
    artists: ['Billie Eilish', 'Khalid', 'Jack Johnson', 'Karan Aujla'],
  },
  spiritual: {
    label: 'Spiritual',
    emoji: '🙏',
    blurb: 'Devotional songs and classic Hindu bhajans.',
    searches: [
      { query: 'Hanuman Chalisa Hariharan', title: 'Hanuman Chalisa', artist: 'Hariharan' },
      { query: 'Achyutam Keshavam Anup Jalota', title: 'Achyutam Keshavam', artist: 'Anup Jalota' },
      { query: 'Om Jai Jagdish Hare Anuradha Paudwal', title: 'Om Jai Jagdish Hare', artist: 'Anuradha Paudwal' },
      { query: 'Shri Krishna Govind Hare Murari Anup Jalota', title: 'Krishna Govind', artist: 'Anup Jalota' },
    ],
  },
  focus: {
    label: 'Focus',
    emoji: '🎯',
    blurb: 'Instrumental tracks for study time.',
    artists: ['Ludovico Einaudi', 'Hans Zimmer', 'Tycho'],
  },
  energetic: {
    label: 'Energetic',
    emoji: '⚡',
    blurb: 'High-energy tracks to get moving.',
    artists: ['Eminem', 'Imagine Dragons', 'The Chainsmokers'],
  },
};

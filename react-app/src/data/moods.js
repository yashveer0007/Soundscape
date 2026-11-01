// Curated mood categories (no AI needed).
// Each mood is a list of artists or specific songs we combine into one mix.
export const ARIJIT_SINGH_SONGS = [
  { query: 'Tum Hi Ho Arijit Singh', title: 'Tum Hi Ho', artist: 'Arijit Singh', exactTitle: true, originalOnly: true, single: true },
  { query: 'Channa Mereya Arijit Singh', title: 'Channa Mereya', artist: 'Arijit Singh', exactTitle: true, originalOnly: true, single: true },
];

export const SHREYA_GHOSHAL_SONGS = [
  { query: 'Teri Ore Shreya Ghoshal', title: 'Teri Ore', artist: 'Shreya Ghoshal', exactTitle: true, originalOnly: true, single: true },
  { query: 'Samjhawan Shreya Ghoshal', title: 'Samjhawan', artist: 'Shreya Ghoshal', exactTitle: true, originalOnly: true, single: true },
];

export const MOODS = {
  happy: {
    label: 'Happy',
    emoji: '😄',
    blurb: 'Bright, feel-good songs.',
    searches: ['Pharrell Williams', 'Bruno Mars', 'Dua Lipa', ...SHREYA_GHOSHAL_SONGS],
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

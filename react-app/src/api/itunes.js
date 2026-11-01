// Free music search API from Apple — no API key needed.
// Each result has a 30-second preview URL, which we use for playback.
export async function searchSongs(term, limit = 24) {
  const url =
    'https://itunes.apple.com/search?media=music&entity=song' +
    `&limit=${limit}&term=${encodeURIComponent(term)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();

  // Turn Apple's field names into simple ones we use everywhere in the app.
  return data.results
    .filter((t) => t.previewUrl)
    .map((t) => ({
      id: String(t.trackId),
      title: t.trackName,
      artist: t.artistName,
      album: t.collectionName,
      artwork: t.artworkUrl100.replace('100x100', '300x300'),
      preview: t.previewUrl,
      duration: t.trackTimeMillis, // milliseconds
    }));
}

export async function searchSongsByArtists(artists, limit = 12) {
  const results = await Promise.all(
    artists.map((artist) => searchSongs(artist, limit))
  );
  const songs = results.flat();
  return songs.filter(
    (song, index) => songs.findIndex((candidate) => candidate.id === song.id) === index
  );
}

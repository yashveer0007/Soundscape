import SongCard from './SongCard.jsx';

// Shows loading / error / empty messages, or the grid of songs.
export default function SongGrid({ songs, status = 'succeeded', error, emptyText = 'No songs found.' }) {
  if (status === 'loading') return <p className="message" role="status">Loading songs…</p>;
  if (status === 'failed') return <p className="message error" role="alert">Couldn’t load songs: {error}</p>;
  if (songs.length === 0) return <p className="message">{emptyText}</p>;

  return (
    <div className="grid">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} list={songs} />
      ))}
    </div>
  );
}

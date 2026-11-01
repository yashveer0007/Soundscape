import { useDispatch, useSelector } from 'react-redux';
import { playSong, togglePlay, addToQueue } from '../store/playerSlice.js';
import { toggleFavorite } from '../store/favoritesSlice.js';
import { formatTime } from '../utils/format.js';

// One song: artwork, info, and the play / like / queue buttons.
// `list` = all the songs on the page, so next/previous know where to go.
export default function SongCard({ song, list }) {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.player.current);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const liked = useSelector((state) => state.favorites.items.some((s) => s.id === song.id));

  const isCurrent = current?.id === song.id;

  function handlePlay() {
    if (isCurrent) dispatch(togglePlay());
    else dispatch(playSong({ song, list }));
  }

  return (
    <article className={isCurrent ? 'card playing' : 'card'}>
      <img className="card-image" src={song.artwork} alt={`Album art for ${song.album}`} />
      <div className="card-body">
        <h3 className="card-title">{song.title}</h3>
        <p className="card-artist">{song.artist}</p>
        <p className="card-meta">{song.album} · {formatTime(song.duration / 1000)}</p>
        <div className="card-actions">
          <button className="btn btn-primary btn-small" onClick={handlePlay}>
            {isCurrent && isPlaying ? '❚❚ Pause' : '▶ Play'}
          </button>
          <button
            className="btn btn-secondary btn-small"
            onClick={() => dispatch(toggleFavorite(song))}
            aria-pressed={liked}
            aria-label={liked ? `Unlike ${song.title}` : `Like ${song.title}`}
          >
            {liked ? '♥' : '♡'}
          </button>
          <button
            className="btn btn-secondary btn-small"
            onClick={() => dispatch(addToQueue(song))}
            aria-label={`Add ${song.title} to queue`}
          >
            + Queue
          </button>
        </div>
      </div>
    </article>
  );
}

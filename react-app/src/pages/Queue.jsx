import { useDispatch, useSelector } from 'react-redux';
import { next, removeFromQueue, clearQueue } from '../store/playerSlice.js';

export default function Queue() {
  const dispatch = useDispatch();
  const { current, queue } = useSelector((state) => state.player);

  return (
    <>
      <h1>Play Queue</h1>

      <h2>Now playing</h2>
      {current ? (
        <p className="row"><strong>{current.title}</strong> — {current.artist}</p>
      ) : (
        <p className="message">Nothing playing yet.</p>
      )}

      <div className="section-header">
        <h2>Up next</h2>
        {queue.length > 0 && (
          <div className="card-actions">
            <button className="btn btn-primary btn-small" onClick={() => dispatch(next())}>Skip to next</button>
            <button className="btn btn-secondary btn-small" onClick={() => dispatch(clearQueue())}>Clear queue</button>
          </div>
        )}
      </div>

      {queue.length === 0 ? (
        <p className="message">Your queue is empty. Use “+ Queue” on any song.</p>
      ) : (
        <ol className="queue-list">
          {queue.map((song) => (
            <li key={song.id} className="row">
              <img src={song.artwork} alt="" />
              <span><strong>{song.title}</strong> — {song.artist}</span>
              <button className="btn btn-secondary btn-small" onClick={() => dispatch(removeFromQueue(song.id))}>
                Remove
              </button>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

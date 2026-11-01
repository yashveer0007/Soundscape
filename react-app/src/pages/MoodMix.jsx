import { useDispatch, useSelector } from 'react-redux';
import { selectMood, fetchMoodSongs } from '../store/moodSlice.js';
import { playSong } from '../store/playerSlice.js';
import { MOODS } from '../data/moods.js';
import SongGrid from '../components/SongGrid.jsx';

export default function MoodMix() {
  const dispatch = useDispatch();
  const { selected, songs, status, error } = useSelector((state) => state.mood);

  function pickMood(key) {
    dispatch(selectMood(key));
    dispatch(fetchMoodSongs(key));
  }

  return (
    <>
      <h1>MoodMix</h1>
      <p>How are you feeling? Pick a mood.</p>
      <div className="chips">
        {Object.entries(MOODS).map(([key, mood]) => (
          <button
            key={key} className="chip" aria-pressed={selected === key}
            onClick={() => pickMood(key)}
          >
            {mood.emoji} {mood.label}
          </button>
        ))}
      </div>

      {selected && (
        <div className="section-header">
          <h2>{MOODS[selected].label} mix — {MOODS[selected].blurb}</h2>
          {songs.length > 0 && status === 'succeeded' && (
            <button className="btn btn-primary" onClick={() => dispatch(playSong({ song: songs[0], list: songs }))}>
              ▶ Play this mix
            </button>
          )}
        </div>
      )}
      {selected && <SongGrid songs={songs} status={status} error={error} />}
    </>
  );
}

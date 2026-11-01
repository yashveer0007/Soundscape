import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlay, setPlaying, next, previous, setVolume } from '../store/playerSlice.js';
import { formatTime } from '../utils/format.js';

// The ONE <audio> element of the whole app lives here.
// Redux tells us what to play; this component makes the sound.
export default function Player() {
  const dispatch = useDispatch();
  const { current, isPlaying, volume } = useSelector((state) => state.player);
  const audioRef = useRef(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(30);

  // 1. New song -> load its audio file.
  useEffect(() => {
    if (current) {
      audioRef.current.src = current.preview;
      setTime(0);
    }
  }, [current]);

  // 2. Play or pause when the state changes.
  useEffect(() => {
    const audio = audioRef.current;
    if (!current) return;
    if (isPlaying) audio.play().catch(() => dispatch(setPlaying(false)));
    else audio.pause();
  }, [isPlaying, current, dispatch]);

  // 3. Volume.
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  function handlePrevious() {
    // If the song has played for a few seconds, restart it instead.
    if (audioRef.current.currentTime > 3) audioRef.current.currentTime = 0;
    else dispatch(previous());
  }

  function handleSeek(e) {
    audioRef.current.currentTime = Number(e.target.value);
    setTime(Number(e.target.value));
  }

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => dispatch(next())}
      />
      {current && (
        <footer className="player" aria-label="Music player">
          <div className="player-song">
            <img src={current.artwork} alt="" />
            <div>
              <p className="player-title">{current.title}</p>
              <p className="player-artist">{current.artist}</p>
            </div>
          </div>

          <div className="player-center">
            <div className="player-buttons">
              <button onClick={handlePrevious} aria-label="Previous track">⏮</button>
              <button className="play-main" onClick={() => dispatch(togglePlay())} aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? '❚❚' : '▶'}
              </button>
              <button onClick={() => dispatch(next())} aria-label="Next track">⏭</button>
            </div>
            <div className="seek">
              <span>{formatTime(time)}</span>
              <input
                type="range" min="0" max={duration} step="0.1" value={time}
                onChange={handleSeek} aria-label="Seek"
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <label className="volume">
            🔊
            <input
              type="range" min="0" max="1" step="0.05" value={volume}
              onChange={(e) => dispatch(setVolume(Number(e.target.value)))}
              aria-label="Volume"
            />
          </label>
        </footer>
      )}
    </>
  );
}

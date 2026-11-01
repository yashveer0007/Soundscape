import { createSlice } from '@reduxjs/toolkit';

// The player slice stores WHAT is playing. The real <audio> element
// lives in components/Player.jsx and reacts to this state.
const initialState = {
  current: null,   // the song that is playing now
  isPlaying: false,
  playlist: [],    // the list the song was played from (used for next/previous)
  queue: [],       // songs the user added to "Up next"
  history: [],     // songs already played (used for the previous button)
  volume: 0.7,     // 0 to 1
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // Start a song. `list` is the list of songs it came from.
    playSong(state, action) {
      const { song, list } = action.payload;
      if (state.current) state.history.push(state.current);
      state.current = song;
      state.playlist = list || [song];
      state.isPlaying = true;
    },
    togglePlay(state) {
      if (state.current) state.isPlaying = !state.isPlaying;
    },
    setPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    // Next song: queue first, otherwise the next one in the playlist.
    next(state) {
      let nextSong = null;
      if (state.queue.length > 0) {
        nextSong = state.queue.shift();
      } else {
        const i = state.playlist.findIndex((s) => s.id === state.current?.id);
        nextSong = state.playlist[i + 1] || null;
      }
      if (nextSong) {
        if (state.current) state.history.push(state.current);
        state.current = nextSong;
        state.isPlaying = true;
      } else {
        state.isPlaying = false; // nothing left to play
      }
    },
    previous(state) {
      if (state.history.length > 0) {
        state.current = state.history.pop();
        state.isPlaying = true;
      }
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
    addToQueue(state, action) {
      const song = action.payload;
      const alreadyThere = state.queue.some((s) => s.id === song.id);
      if (!alreadyThere && state.current?.id !== song.id) state.queue.push(song);
    },
    removeFromQueue(state, action) {
      state.queue = state.queue.filter((s) => s.id !== action.payload);
    },
    clearQueue(state) {
      state.queue = [];
    },
  },
});

export const {
  playSong, togglePlay, setPlaying, next, previous,
  setVolume, addToQueue, removeFromQueue, clearQueue,
} = playerSlice.actions;
export default playerSlice.reducer;

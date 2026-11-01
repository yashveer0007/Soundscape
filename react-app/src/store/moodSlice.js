import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchSongs } from '../api/itunes.js';
import { MOODS } from '../data/moods.js';

// Search every artist in the mood, then merge the results into one list.
export const fetchMoodSongs = createAsyncThunk('mood/fetchMoodSongs', async (mood) => {
  const results = await Promise.all(
    (MOODS[mood].searches ?? MOODS[mood].artists).map(async (search) => {
      if (typeof search === 'string') return searchSongs(search, 8);

      const songs = await searchSongs(search.query, 15);
      return songs.filter(
        (song) =>
          song.title.toLowerCase().includes(search.title.toLowerCase()) &&
          song.artist.toLowerCase().includes(search.artist.toLowerCase())
      );
    })
  );
  const all = results.flat();
  // Remove duplicates (same song id)
  return all.filter((s, i) => all.findIndex((x) => x.id === s.id) === i);
});

const moodSlice = createSlice({
  name: 'mood',
  initialState: { selected: null, songs: [], status: 'idle', error: null },
  reducers: {
    selectMood(state, action) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoodSongs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMoodSongs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.songs = action.payload;
      })
      .addCase(fetchMoodSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { selectMood } = moodSlice.actions;
export default moodSlice.reducer;

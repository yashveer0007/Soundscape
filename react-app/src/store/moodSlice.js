import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchSongsForSelections } from '../api/itunes.js';
import { MOODS } from '../data/moods.js';

// Search every artist in the mood, then merge the results into one list.
export const fetchMoodSongs = createAsyncThunk('mood/fetchMoodSongs', async (mood) => {
  return searchSongsForSelections(MOODS[mood].searches ?? MOODS[mood].artists, 8);
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

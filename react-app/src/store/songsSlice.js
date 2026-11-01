import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchSongs, searchSongsByArtists } from '../api/itunes.js';

// createAsyncThunk runs our fetch and automatically creates
// pending / fulfilled / rejected actions for us.
export const fetchSongs = createAsyncThunk('songs/fetchSongs', (term) =>
  Array.isArray(term) ? searchSongsByArtists(term) : searchSongs(term)
);

const songsSlice = createSlice({
  name: 'songs',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default songsSlice.reducer;

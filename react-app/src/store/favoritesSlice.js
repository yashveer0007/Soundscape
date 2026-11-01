import { createSlice } from '@reduxjs/toolkit';

export const FAVORITES_KEY = 'soundscape-favorites';

// Load saved favourites when the app starts (so they survive a refresh).
function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: loadFavorites() },
  reducers: {
    // Like if not liked yet, unlike if already liked.
    toggleFavorite(state, action) {
      const song = action.payload;
      const index = state.items.findIndex((s) => s.id === song.id);
      if (index === -1) state.items.push(song);
      else state.items.splice(index, 1);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

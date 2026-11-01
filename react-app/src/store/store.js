import { configureStore } from '@reduxjs/toolkit';
import songsReducer from './songsSlice.js';
import playerReducer from './playerSlice.js';
import favoritesReducer, { FAVORITES_KEY } from './favoritesSlice.js';
import moodReducer from './moodSlice.js';

const store = configureStore({
  reducer: {
    songs: songsReducer,
    player: playerReducer,
    favorites: favoritesReducer,
    mood: moodReducer,
  },
});

// Every time the store changes, save favourites to localStorage.
store.subscribe(() => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(store.getState().favorites.items));
});

export default store;

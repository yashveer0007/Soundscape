# SoundScape (React + Redux)

## Run it
    npm install
    npm run dev

Then open the link Vite prints (usually http://localhost:5173).

## Folder guide
- `src/store/`      Redux slices: songs, player, favorites, mood
- `src/api/`        iTunes Search API call (no API key needed)
- `src/components/` Navbar, SongCard, SongGrid, Player (the only <audio> element)
- `src/pages/`      Home, Discover, MoodMix, Library, Queue, NotFound
- `src/data/`       Curated mood lists

## Notes
- Songs play a 30-second preview (that is what the free API provides).
- Favourites are saved in localStorage, so they survive a refresh.

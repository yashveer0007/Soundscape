import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchSongs } from '../api/itunes.js';
import { fetchSongs } from '../store/songsSlice.js';
import SongGrid from '../components/SongGrid.jsx';

const DEFAULT_ARTISTS = ['Karan Aujla', 'Shreya Ghoshal' , 'Harry Styles' , 'Arijit Singh', 'Taylor Swift', 'Ed Sheeran', 'Adele', 'Burna Boy', 'Drake', 'Rihanna' , 'BTS' , 'Badshah', 'Shawn Mendes', 'Justin Bieber', 'The Weeknd', 'Dua Lipa', 'Billie Eilish', 'Post Malone', 'Ariana Grande', 'Bruno Mars', 'Kendrick Lamar', 'Sia', 'Lady Gaga', 'Eminem', 'Kanye West', 'Jay-Z', 'Beyoncé', 'Rihanna', 'Nicki Minaj', 'Cardi B', 'Megan Thee Stallion', 'Doja Cat'];

const SPIRITUAL_SONG_SEARCHES = [
  { query: 'Hanuman Chalisa Hariharan', title: 'Hanuman Chalisa', artist: 'Hariharan' },
  { query: 'Achyutam Keshavam Anup Jalota', title: 'Achyutam Keshavam', artist: 'Anup Jalota' },
  { query: 'Om Jai Jagdish Hare Anuradha Paudwal', title: 'Om Jai Jagdish Hare', artist: 'Anuradha Paudwal' },
  { query: 'Shri Krishna Govind Hare Murari Anup Jalota', title: 'Krishna Govind', artist: 'Anup Jalota' },
];

export default function Discover() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.songs);
  const [term, setTerm] = useState('');
  const [spiritualSongs, setSpiritualSongs] = useState([]);
  const [spiritualStatus, setSpiritualStatus] = useState('loading');
  const [spiritualError, setSpiritualError] = useState(null);

  // Debounce: wait until the user stops typing for 500ms before calling the API.
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchSongs(term.trim() || DEFAULT_ARTISTS));
    }, 500);
    return () => clearTimeout(timer); // cancel if they type again
  }, [term, dispatch]);

  useEffect(() => {
    let active = true;

    Promise.all(
      SPIRITUAL_SONG_SEARCHES.map(async ({ query, title, artist }) => {
        const songs = await searchSongs(query, 15);
        return songs.find(
          (song) =>
            song.title.toLowerCase().includes(title.toLowerCase()) &&
            song.artist.toLowerCase().includes(artist.toLowerCase())
        );
      })
    )
      .then((songs) => {
        if (!active) return;
        setSpiritualSongs(songs.filter(Boolean));
        setSpiritualStatus('succeeded');
      })
      .catch((fetchError) => {
        if (!active) return;
        setSpiritualError(fetchError.message);
        setSpiritualStatus('failed');
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <h1>Discover</h1>
      <label htmlFor="search" className="sr-only">Search songs or artists</label>
      <input
        id="search" className="search" type="search"
        placeholder="Search songs or artists…"
        value={term} onChange={(e) => setTerm(e.target.value)}
      />
      <SongGrid songs={items} status={status} error={error} />
      <section aria-labelledby="spiritual-heading">
        <h2 id="spiritual-heading">Spiritual</h2>
        <p>Devotional songs and classic Hindu bhajans.</p>
        <SongGrid
          songs={spiritualSongs}
          status={spiritualStatus}
          error={spiritualError}
          emptyText="No spiritual songs found."
        />
      </section>
    </>
  );
}

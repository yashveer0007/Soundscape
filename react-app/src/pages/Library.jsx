import { useDispatch, useSelector } from 'react-redux';
import { playSong } from '../store/playerSlice.js';
import SongGrid from '../components/SongGrid.jsx';

export default function Library() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <>
      <div className="section-header">
        <h1>My Library</h1>
        {favorites.length > 0 && (
          <button className="btn btn-primary" onClick={() => dispatch(playSong({ song: favorites[0], list: favorites }))}>
            ▶ Play all
          </button>
        )}
      </div>
      <SongGrid songs={favorites} emptyText="No favourites yet. Tap ♡ on a song to save it here." />
    </>
  );
}

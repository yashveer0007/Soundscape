import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Player from './Player.jsx';

// Navbar on top, the current page in the middle (<Outlet />),
// and the player at the bottom. The player never unmounts, so music keeps playing.
export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Player />
    </>
  );
}

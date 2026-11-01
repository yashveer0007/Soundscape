import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const queueCount = useSelector((state) => state.player.queue.length);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="logo" to="/">SoundScape</Link>
        <nav aria-label="Main">
          <ul className="nav-list">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/discover">Discover</NavLink></li>
            <li><NavLink to="/moodmix">MoodMix</NavLink></li>
            <li><NavLink to="/library">My Library</NavLink></li>
            <li>
              <NavLink to="/queue">
                Queue {queueCount > 0 && <span className="count">{queueCount}</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

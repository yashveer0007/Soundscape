import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Discover from './pages/Discover.jsx';
import MoodMix from './pages/MoodMix.jsx';
import Library from './pages/Library.jsx';
import Queue from './pages/Queue.jsx';
import NotFound from './pages/NotFound.jsx';

// Every page lives inside <Layout>, which holds the navbar and the player.
// Because the player sits in Layout (not in a page), it keeps playing
// while you move between pages.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/moodmix" element={<MoodMix />} />
        <Route path="/library" element={<Library />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

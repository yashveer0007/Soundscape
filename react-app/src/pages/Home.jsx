import { Link } from 'react-router-dom';

const FEATURES = [
  { to: '/discover', title: 'Discover', text: 'Search millions of songs and artists.' },
  { to: '/moodmix', title: 'MoodMix', text: 'Pick a mood and get a mix to match.' },
  { to: '/library', title: 'My Library', text: 'All the songs you have liked.' },
  { to: '/queue', title: 'Queue', text: 'Line up what plays next.' },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Track 01 — Welcome</p>
        <h1>Your music.<br />Your <span className="highlight">world.</span></h1>
        <p>A cozy corner of the internet for discovering new sounds and keeping your favourites close.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/discover">Explore Music</Link>
          <Link className="btn btn-secondary" to="/moodmix">Try MoodMix</Link>
        </div>
      </section>
      <div className="grid">
        {FEATURES.map((f) => (
          <Link key={f.to} to={f.to} className="card feature">
            <div className="card-body">
              <h2 className="card-title">{f.title}</h2>
              <p>{f.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

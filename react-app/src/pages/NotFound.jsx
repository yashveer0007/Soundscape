import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="hero">
      <h1>404</h1>
      <p>This page doesn’t exist.</p>
      <Link className="btn btn-primary" to="/">Back home</Link>
    </section>
  );
}

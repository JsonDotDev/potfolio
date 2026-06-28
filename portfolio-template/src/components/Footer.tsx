import { profile } from '../data/content';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span className="mono">{profile.name} — {year}</span>
        <span className="mono site-footer__built">Built with React + Vite, deployed on Vercel</span>
      </div>
    </footer>
  );
}

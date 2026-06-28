import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  
import { profile } from '../data/content';
import './Header.css';

const NAV_LINKS = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand mono">
          <span className="site-header__dot" aria-hidden="true" />
          {profile.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
          <span className="site-header__brand-full">_{profile.name.replace(/\s+/g, '_').toLowerCase()}</span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} to={link.href} className="mono">
              {link.label}
            </Link>
          ))}
        </nav>

        <a href={profile.resumeUrl} className="btn btn-primary site-header__cta" download>
          Resume
        </a>

        <button
          className="site-header__menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <nav className="site-header__mobile-nav mono" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a href={profile.resumeUrl} download onClick={() => setMenuOpen(false)}>
            Resume ↓
          </a>
        </nav>
      )}
    </header>
  );
}

import { profile } from '../data/content';
import SettlingWave from './SettlingWave';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow">{profile.status}</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__role mono">{profile.role}</p>
          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn-primary">
              View projects
            </a>
            <a href="#contact" className="btn">
              Get in touch
            </a>
          </div>

          <div className="hero__meta mono">
            <span>{profile.location}</span>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <SettlingWave />
        </div>
      </div>

      <div className="hero__bottom-line section-divider" />
    </section>
  );
}

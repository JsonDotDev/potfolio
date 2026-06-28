import { profile } from '../data/content';
import './Contact.css';

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-card">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="contact-card__title">Let's talk about where I can help.</h2>
            <p className="contact-card__copy">
              I'm currently {profile.status.toLowerCase()}. Reach out directly or find me on the
              links below.
            </p>
          </div>

          <div className="contact-card__actions">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              {profile.email}
            </a>
            <div className="contact-card__socials">
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn">
                LinkedIn
              </a>
              <a href={profile.resumeUrl} className="btn" download>
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

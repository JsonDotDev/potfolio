import { experience } from '../data/content';
import './Experience.css';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Where I've worked</p>
            <h2 className="section-title">Experience</h2>
          </div>
          <span className="section-index">/// TIMELINE</span>
        </div>

        <div className="timeline">
          {experience.map((item) => (
            <div className="timeline__item" key={item.id}>
              <div className="timeline__rail" aria-hidden="true">
                <span className="timeline__node" />
              </div>
              <div className="timeline__content">
                <div className="timeline__head">
                  <h3 className="timeline__role">{item.role}</h3>
                  <span className="timeline__period mono">{item.period}</span>
                </div>
                <p className="timeline__org mono">{item.org}</p>
                <ul className="timeline__points">
                  {item.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { skills } from '../data/content';
import './Skills.css';

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2 className="section-title">Skills</h2>
          </div>
          <span className="section-index">/// SPEC SHEET</span>
        </div>

        <div className="skills-table">
          {skills.map((group) => (
            <div className="skills-table__row" key={group.label}>
              <div className="skills-table__label mono">{group.label}</div>
              <div className="skills-table__items">
                {group.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

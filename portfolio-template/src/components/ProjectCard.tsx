import { useState } from 'react';
import type { Project } from '../data/content';
import { Link } from 'react-router-dom';
import ProjectDiagram from './ProjectDiagram';
import './ProjectCard.css';

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="project-card">
      <div className="project-card__diagram">
        <ProjectDiagram kind={project.diagram} />
        <span className="project-card__index mono">{project.index}</span>
      </div>

      <div className="project-card__body">
        <div className="project-card__head">
          <span className={`project-card__category mono ${project.category === 'Internship' ? 'is-internship' : ''}`}>
            {project.category === 'Internship' ? 'INDUSTRY' : 'UNIVERSITY'}
          </span>
          <span className="project-card__period mono">{project.period}</span>
        </div>

        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
        <p className="project-card__summary">{project.summary}</p>

        <ul className="project-card__stack">
          {project.stack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>

        <div className="project-card__actions">
          <button
            className="project-card__toggle mono"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? '− Hide details' : '+ Show details'}
          </button>

          <Link to={`/projects/${project.id}`} className="project-card__case-study mono">
            View full case study →
          </Link>
        </div>

        {open && (
          <ul className="project-card__details">
            {project.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        )}

        {project.links && project.links.length > 0 && (
          <div className="project-card__links">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="project-card__link mono">
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

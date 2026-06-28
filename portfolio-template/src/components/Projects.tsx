import { useMemo, useState } from 'react';
import { projects } from '../data/content';
import ProjectCard from './ProjectCard';
import './Projects.css';

type Filter = 'All' | 'University' | 'Internship';

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title">Projects</h2>
          </div>
          <span className="section-index">/// {String(filtered.length).padStart(2, '0')} ENTRIES</span>
        </div>

        <div className="projects__filters mono" role="tablist" aria-label="Filter projects">
          {(['All', 'University', 'Internship'] as Filter[]).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`projects__filter ${filter === f ? 'is-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

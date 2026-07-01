import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/content';
import ProjectDiagram from '../components/ProjectDiagram';
import './ProjectDetailPage.css';

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);

  if (!project) return <Navigate to="/" replace />;

  const currentIdx = projects.findIndex((p) => p.id === projectId);
  const prev = projects[currentIdx - 1];
  const next = projects[currentIdx + 1];

  return (
    <article className="case-study">
      <div className="container">
        <Link to="/#projects" className="case-study__back mono">
          ← Back to all projects
        </Link>

        <header className="case-study__header">
          <div className="case-study__header-top">
            <span className={`project-card__category mono ${project.category === 'Internship' ? 'is-internship' : ''}`}>
              {project.category === 'Internship' ? 'INDUSTRY' : 'UNIVERSITY'}
            </span>
            <span className="case-study__period mono">{project.period}</span>
          </div>
          <h1 className="case-study__title">{project.title}</h1>
          <p className="case-study__subtitle">{project.subtitle}</p>

          <ul className="case-study__stack">
            {project.stack.map((s) => (
              <li key={s} className="tag">{s}</li>
            ))}
          </ul>

          {project.links && project.links.length > 0 && (
            <div className="project-card__links" style={{ marginTop: '18px' }}>
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="project-card__link mono">
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Hero image — real photo if available, otherwise the schematic diagram */}
        <div className="case-study__hero-diagram">
          {project.image ? (
            <img src={project.image.src} alt={project.image.alt} className="case-study__hero-img" />
          ) : (
            <ProjectDiagram kind={project.diagram} />
          )}
        </div>

        <div className="case-study__body">
          <section className="case-study__section">
            <p className="eyebrow">Overview</p>
            {(project.overview ?? [project.summary]).map((para, i) => (
              <p key={i} className="case-study__paragraph">{para}</p>
            ))}
          </section>

          <section className="case-study__section">
            <p className="eyebrow">What I did</p>
            <ul className="case-study__list">
              {project.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </section>

          {project.challenges && project.challenges.length > 0 && (
            <section className="case-study__section">
              <p className="eyebrow" style={{ color: 'var(--amber)' }}>Challenges</p>
              <ul className="case-study__list case-study__list--amber">
                {project.challenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </section>
          )}

          {project.whatIdDoDifferently && project.whatIdDoDifferently.length > 0 && (
            <section className="case-study__section">
              <p className="eyebrow" style={{ color: 'var(--blueprint)' }}>What I'd do differently</p>
              <ul className="case-study__list case-study__list--blueprint">
                {project.whatIdDoDifferently.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Video section */}
          {project.video && (
            <section className="case-study__section">
              <p className="eyebrow">{project.video.label ?? 'Demo Run'}</p>
              <div className="case-study__video-wrap">
                {'embedUrl' in project.video ? (
                  <iframe
                    src={project.video.embedUrl}
                    title={project.video.caption ?? 'Project video'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={project.video.src}
                    poster={project.video.poster}
                    controls
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              {project.video.caption && (
                <p className="case-study__caption mono">{project.video.caption}</p>
              )}
            </section>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="case-study__section">
              <p className="eyebrow">Gallery</p>
              <div className="case-study__gallery">
                {project.gallery.map((item, i) => (
                  <figure className="case-study__gallery-item" key={i}>
                    {item.kind === 'image' ? (
                      <img src={item.src} alt={item.alt} />
                    ) : item.kind === 'video' ? (
                      <video src={item.src} poster={item.poster} controls playsInline>
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <ProjectDiagram kind={item.diagram} />
                    )}
                    {item.caption && (
                      <figcaption className="case-study__caption mono">{item.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>

        <nav className="case-study__pagination mono">
          {prev ? (
            <Link to={`/projects/${prev.id}`} className="case-study__pagination-link">
              ← {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/projects/${next.id}`} className="case-study__pagination-link case-study__pagination-link--next">
              {next.title} →
            </Link>
          ) : <span />}
        </nav>
      </div>
    </article>
  );
}
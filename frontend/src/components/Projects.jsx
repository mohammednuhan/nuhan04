import React, { useEffect, useState } from 'react';
import { FaGithub, FaRobot, FaExternalLinkAlt, FaRocket } from 'react-icons/fa';
import { getJson } from '../lib/api.js';
import '../styles/projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('projects');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getJson('/projects');
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setProjects([]);
      }
    };
    fetchProjects();
  }, []);

  const defaultProjects = [
    {
      title: 'CEX — Centralized Cryptocurrency Exchange',
      description:
        'Backend simulating a crypto exchange: JWT auth, wallet, orders, price-prioritized order book and matching logic with PostgreSQL + Prisma.',
      tech: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'JWT'],
      github: 'https://github.com/mohammednuhan/stock-app',
      image: '/images/cex-architecture.svg',
    },
    {
      title: 'AI Agent System',
      description: 'Intelligent multi-agent system built with Python to automate complex workflows using LLM-based reasoning.',
      tech: ['Python', 'LLM', 'Agents'],
      github: 'https://github.com/MohammedNuhan',
    },
    {
      title: 'Full Stack Platform',
      description: 'Modern web application with React frontend and scalable backend services.',
      tech: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/MohammedNuhan',
    },
  ];

  const display = projects.length > 0 ? projects : defaultProjects;

  const openGithub = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="section projects-section content-visibility-auto">
      <div className="projects-header fade-up visible">
        <h2 className="section-title gradient-text">Featured Projects</h2>
        <p className="section-subtitle">
          A collection of projects I've built — from AI systems to full-stack applications.
          Some are deployed live and open source. Tap a card or a link to explore.
        </p>
      </div>

      <div className="projects-grid">
        {display.map((project, index) => {
          const githubUrl = project.githubUrl || project.github || '#';
          const liveUrl = project.liveUrl || null;
          const imageUrl = project.imageUrl || project.image || null;
          const tags = project.tags || project.tech || [];
          const targetUrl = liveUrl || githubUrl;
          return (
            <div
              key={index}
              className={`project-card fade-up ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
              role="link"
              tabIndex={0}
              onClick={() => window.open(targetUrl, '_blank', 'noopener,noreferrer')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.open(targetUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              aria-label={`Open ${project.title}`}
            >
              <div className="project-image-area">
                <div className="project-mesh" />
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={`${project.title} architecture`}
                    className="project-image-file"
                    loading="lazy"
                  />
                ) : (
                  <FaRobot
                    className="project-image-icon"
                    size={44}
                    style={{ background: `linear-gradient(135deg, hsl(${(index * 60) % 360}, 70%, 55%), hsl(${(index * 60 + 60) % 360}, 70%, 45%))` }}
                  />
                )}
                {liveUrl && (
                  <div className="project-live-badge">
                    <FaRocket size={11} />
                    <span>Live</span>
                  </div>
                )}
                <div className="project-open-badge">
                  <FaExternalLinkAlt size={12} />
                  <span>{liveUrl ? 'Open Live Site' : 'View on GitHub'}</span>
                </div>
              </div>

              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="project-links">
                  <button
                    className="project-link"
                    onClick={(e) => openGithub(e, githubUrl)}
                  >
                    <FaGithub size={16} />
                    GitHub
                  </button>
                  {liveUrl && (
                    <button
                      className="project-link project-link-live"
                      onClick={(e) => openGithub(e, liveUrl)}
                    >
                      <FaRocket size={16} />
                      Live Site
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="projects-more">
        <a
          href="https://github.com/mohammednuhan"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          <FaExternalLinkAlt size={14} />
          See All on GitHub
        </a>
      </div>
    </section>
  );
}

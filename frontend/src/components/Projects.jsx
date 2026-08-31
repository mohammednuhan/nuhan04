import React, { useEffect, useState } from 'react';
import { FaGithub, FaRobot, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
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
        const res = await fetch('/api/projects');
        const data = await res.json();
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
    {
      title: 'Machine Learning Model',
      description: 'Custom ML model and pipeline designed for data analysis and predictions.',
      tech: ['Python', 'TensorFlow', 'Flask'],
      github: 'https://github.com/MohammedNuhan',
    },
  ];

  const display = projects.length > 0 ? projects : defaultProjects;

  return (
    <section id="projects" className="section projects-section content-visibility-auto">
      <div className="projects-header fade-up visible">
        <h2 className="section-title gradient-text">Featured Projects</h2>
        <p className="section-subtitle">
          A collection of projects I've built — from AI systems to full-stack applications.
        </p>
      </div>

      <div className="projects-grid">
        {display.map((project, index) => (
          <div
            key={index}
            className={`project-card fade-up ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
          >
            <div className="project-image-area">
              <div className="project-mesh" />
              <FaRobot
                className="project-image-icon"
                size={44}
                style={{ background: `linear-gradient(135deg, hsl(${(index * 60) % 360}, 70%, 55%), hsl(${(index * 60 + 60) % 360}, 70%, 45%))` }}
              />
            </div>

            <div className="project-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {(project.tech || []).map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={project.github || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <FaGithub size={16} />
                  GitHub
                </a>
                <span className="project-link-placeholder">
                  <FaCode size={14} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="projects-more">
        <a
          href="https://github.com/MohammedNuhan"
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

import React, { useEffect, useState } from 'react';
import {
  FaPython,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaBrain,
  FaHtml5,
  FaCss3Alt,
  FaTerminal,
  FaGitAlt,
  FaCode,
} from 'react-icons/fa';
import { SiCplusplus, SiFlask, SiTensorflow, SiMysql, SiLinux, SiMongodb } from 'react-icons/si';
import '../styles/skills.css';

const iconMap = {
  python: FaPython,
  javascript: FaJsSquare,
  react: FaReact,
  'node.js': FaNodeJs,
  cpp: SiCplusplus,
  flask: SiFlask,
  tensorflow: SiTensorflow,
  mysql: SiMysql,
  mongodb: SiMongodb,
  git: FaGitAlt,
  linux: SiLinux,
  database: FaDatabase,
  ai: FaBrain,
  html: FaHtml5,
  css: FaCss3Alt,
  terminal: FaTerminal,
  code: FaCode,
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const section = document.getElementById('skills');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('/api/skills');
        const data = await res.json();
        setSkills(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch skills:', err);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const defaultSkills = [
    { name: 'Python', description: 'Core programming & AI/ML development', color: '#3776ab', icon: 'python' },
    { name: 'JavaScript', description: 'Modern web development', color: '#f7df1e', icon: 'javascript' },
    { name: 'React', description: 'Building reactive UI components', color: '#61dafb', icon: 'react' },
    { name: 'C++', description: 'Systems programming & algorithms', color: '#00599c', icon: 'cpp' },
  ];

  const displaySkills = skills.length > 0 ? skills : defaultSkills;

  return (
    <section id="skills" className="section skills-section content-visibility-auto">
      <div className="skills-header fade-up visible">
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">
          Technologies and tools I work with to build intelligent, scalable applications.
        </p>
      </div>

      {loading ? (
        <div className="skills-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="skill-card skeleton">
              <div className="skeleton-tile" />
              <div className="skeleton-line skeleton-line-short" />
              <div className="skeleton-line skeleton-line-long" />
              <div className="skeleton-line skeleton-line-med" />
            </div>
          ))}
        </div>
      ) : (
        <div className={`skills-grid ${visible ? 'visible' : ''}`}>
          {displaySkills.map((skill, index) => {
            const Icon = iconMap[(skill.icon || '').toLowerCase()] || FaCode;
            return (
              <div
                key={index}
                className={`skill-card fade-up ${visible ? 'visible' : ''}`}
                style={{ transitionDelay: `${(index % 4) * 0.1}s` }}
              >
                <div
                  className="skill-tile"
                  style={{ backgroundColor: skill.color || 'var(--accent-blue)' }}
                >
                  <Icon size={30} color="#fff" />
                </div>
                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-description">{skill.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

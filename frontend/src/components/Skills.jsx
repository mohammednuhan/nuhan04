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
import {
  SiCplusplus,
  SiFlask,
  SiTensorflow,
  SiMysql,
  SiLinux,
  SiMongodb,
  SiPytorch,
  SiScikitlearn,
  SiVercel,
} from 'react-icons/si';
import { getJson } from '../lib/api.js';
import '../styles/skills.css';

const iconMap = {
  python: FaPython,
  javascript: FaJsSquare,
  typescript: FaCode,
  java: FaCode,
  cpp: SiCplusplus,
  html: FaHtml5,
  css: FaCss3Alt,
  react: FaReact,
  'node.js': FaNodeJs,
  nextjs: SiFlask,
  express: FaCode,
  tensorflow: SiTensorflow,
  pytorch: SiPytorch,
  scikit: SiScikitlearn,
  nlp: FaBrain,
  docker: FaTerminal,
  git: FaGitAlt,
  linux: SiLinux,
  vercel: SiVercel,
  postgresql: FaDatabase,
  mongodb: SiMongodb,
  redis: FaDatabase,
  mysql: SiMysql,
  flask: SiFlask,
  database: FaDatabase,
  ai: FaBrain,
  terminal: FaTerminal,
  code: FaCode,
};

const CATEGORY_ORDER = ['Languages', 'Web Development', 'AI / ML', 'DevOps', 'Databases'];

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
        const data = await getJson('/skills');
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
    { name: 'Python', description: 'Core programming & AI/ML development', color: '#3776ab', icon: 'python', category: 'Languages' },
    { name: 'JavaScript', description: 'Modern web development', color: '#f7df1e', icon: 'javascript', category: 'Languages' },
    { name: 'React', description: 'Building reactive UI components', color: '#61dafb', icon: 'react', category: 'Web Development' },
    { name: 'C++', description: 'Systems programming & algorithms', color: '#00599c', icon: 'cpp', category: 'Languages' },
    { name: 'Docker', description: 'Containerized deployments', color: '#2496ed', icon: 'docker', category: 'DevOps' },
    { name: 'PostgreSQL', description: 'Relational database & SQL', color: '#4169e1', icon: 'postgresql', category: 'Databases' },
  ];

  const displaySkills = skills.length > 0 ? skills : defaultSkills;

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: displaySkills.filter((s) => (s.category || '').trim() === cat),
  })).filter((g) => g.items.length > 0);

  const other = displaySkills.filter(
    (s) => !CATEGORY_ORDER.includes((s.category || '').trim())
  );
  if (other.length > 0) grouped.push({ category: 'More', items: other });

  return (
    <section id="skills" className="section skills-section content-visibility-auto">
      <div className="skills-header fade-up visible">
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">
          My skill set, organized by area — languages, web development, AI/ML, DevOps and databases.
        </p>
      </div>

      {loading ? (
        <div className="skills-skeleton">
          <div className="skeleton-block" />
          <div className="skeleton-block" />
        </div>
      ) : (
        <div className={`skills-groups ${visible ? 'visible' : ''}`}>
          {grouped.map((group, gi) => (
            <div
              key={group.category}
              className={`skills-group fade-up ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${gi * 0.08}s` }}
            >
              <h3 className="skills-group-title">{group.category}</h3>
              <div className="skills-group-chiprow">
                {group.items.map((skill, i) => {
                  const Icon = iconMap[(skill.icon || '').toLowerCase()] || FaCode;
                  return (
                    <span key={i} className="skill-chip" title={skill.description || ''}>
                      <span
                        className="skill-chip-icon"
                        style={{ background: (skill.color || 'var(--accent-blue)') + '22', color: skill.color || 'var(--accent-blue)' }}
                      >
                        <Icon size={13} />
                      </span>
                      <span className="skill-chip-name">{skill.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

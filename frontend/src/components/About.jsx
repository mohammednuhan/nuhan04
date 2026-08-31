import React, { useEffect, useRef, useState } from 'react';
import { FaRobot, FaCode, FaUserGraduate, FaProjectDiagram, FaLightbulb } from 'react-icons/fa';
import '../styles/about.css';

function useCountUp(target, inView, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start;
    let raf;
    const step = (ts) => {
      if (start === undefined) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return value;
}

function Stat({ value, suffix, label, inView, color }) {
  const n = useCountUp(value, inView);
  return (
    <div className="about-stat">
      <div className="about-stat-value" style={{ color: color || 'var(--accent-blue)' }}>
        {n}
        <span>{suffix}</span>
      </div>
      <div className="about-stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const highlights = [
    { icon: FaRobot, label: 'AI Agents & ML', color: 'var(--accent-cyan)' },
    { icon: FaCode, label: 'Full Stack Developer', color: 'var(--accent-blue)' },
    { icon: FaUserGraduate, label: 'Fourth Year Student', color: 'var(--accent-purple)' },
    { icon: FaLightbulb, label: 'Problem Solver', color: 'var(--accent-orange)' },
  ];

  const stats = [
    { value: 4, suffix: '+', label: 'Years of Learning', color: 'var(--accent-blue)' },
    { value: 5, suffix: '+', label: 'Projects Built', color: 'var(--accent-purple)' },
    { value: 3, suffix: '+', label: 'Deployed Live', color: 'var(--accent-cyan)' },
    { value: 22, suffix: '+', label: 'Skills Mastered', color: 'var(--accent-orange)' },
  ];

  return (
    <section id="about" ref={sectionRef} className="about-section content-visibility-auto">
      <div className="about-container">
        <div className="about-header">
          <h2 className={`section-title gradient-text ${visible ? 'visible' : 'fade-up'}`}>
            About Me
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-image-col">
            <div className={`about-image-wrapper ${visible ? 'visible' : 'fade-up'}`}>
              <img src="/images/profile.jpeg" alt="Mohammed Nuhan" className="about-image" />
              <span className="about-image-badge">
                <FaProjectDiagram size={14} />
              </span>
            </div>
          </div>

          <div className="about-content">
            <h3 className={`about-heading ${visible ? 'visible' : 'fade-up'}`}>
              21 <span className="sep">|</span> AI & Software Engineering Student
            </h3>
            <p className={`about-text ${visible ? 'visible' : 'fade-up'}`}>
              I'm Mohammed Nuhan, a passionate AI and Software Engineering student from Bangalore.
              I love diving deep into artificial intelligence, building intelligent agents,
              and crafting complete web applications from the ground up.
            </p>
            <p className={`about-text ${visible ? 'visible' : 'fade-up'}`}>
              Now in my fourth year of study, I focus on machine learning, agentic AI, and
              full-stack development — always combining theory with real, deployed projects.
            </p>

            <div className="about-highlights">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className={`about-highlight ${visible ? 'visible' : 'fade-up'}`} style={{ transitionDelay: `${index * 0.08}s` }}>
                    <div className="about-highlight-icon" style={{ background: `${item.color}22`, color: item.color }}>
                      <Icon size={18} className="about-highlight-icon-ani" />
                    </div>
                    <span className="about-highlight-label">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="about-stats">
              {stats.map((s) => (
                <Stat key={s.label} {...s} inView={visible} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

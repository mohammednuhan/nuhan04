import React, { useEffect, useRef, useState } from 'react';
import { FaRobot, FaCode, FaUserGraduate } from 'react-icons/fa';
import '../styles/about.css';

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
    { icon: FaRobot, label: 'AI Agents', color: 'var(--accent-cyan)' },
    { icon: FaCode, label: 'Full Stack Developer', color: 'var(--accent-blue)' },
    { icon: FaUserGraduate, label: 'Fourth Year Student', color: 'var(--accent-purple)' },
  ];

  return (
    <section id="about" ref={sectionRef} className="about-section content-visibility-auto">
      <div className="about-blob" />
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
            </div>
          </div>

          <div className="about-content">
            <h3 className={`about-heading ${visible ? 'visible' : 'fade-up'}`}>
              21 <span className="separator">|</span> AI & Software Engineering Student
            </h3>
            <p className={`about-text ${visible ? 'visible' : 'fade-up'}`}>
              I'm Mohammed Nuhan, a passionate AI and Software Engineering student from Banglore.
              I love diving deep into artificial intelligence, building intelligent agents,
              and crafting complete web applications from the ground up.
            </p>
            <p className={`about-text ${visible ? 'visible' : 'fade-up'}`}>
              My journey in tech began with a curiosity for how things work under the hood,
              which evolved into a love for programming. Now in my fourth year of study,
              I focus on machine learning, agentic AI, and full-stack development, always
              looking for ways to combine them into impactful real-world solutions.
            </p>

            <div className="about-highlights">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className={`about-highlight ${visible ? 'visible' : 'fade-up'}`}>
                    <div className="about-highlight-icon" style={{ background: `${item.color}20`, color: item.color }}>
                      <Icon size={18} />
                    </div>
                    <span className="about-highlight-label">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedinIn, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import '../styles/hero.css';

const titles = [
  'AI Student',
  'Full Stack Developer',
  'Aspring to become Software Enginerring'
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout;

    if (!isDeleting && charIndex < currentTitle.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!isDeleting && charIndex === currentTitle.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 50);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((i) => (i + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={`hero ${visible ? 'visible' : ''}`}>
      <div className="hero-bg-mesh" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-particles">
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
      </div>
      <div className="hero-content">
        <div className="hero-image-wrapper">
          <img src="/images/profile.jpeg" alt="Mohammed Nuhan" className="hero-image" />
        </div>

        <h1 className="hero-title">
          Mohammed <span className="gradient-text">Nuhan</span>
        </h1>

        <div className="hero-typing">
          <span className="hero-typing-text">
            {titles[titleIndex].slice(0, charIndex)}
          </span>
          <span className="hero-cursor">|</span>
        </div>

        <p className="hero-description">
          AI & Software Engineering student passionate about building intelligent systems
          and full-stack applications. Turning complex problems into elegant solutions.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary" onClick={(e) => handleNavClick(e, '#projects')}>
            View Projects
          </a>
          <a href="#contact" className="btn btn-secondary" onClick={(e) => handleNavClick(e, '#contact')}>
            Contact Me
          </a>
        </div>

        <div className="hero-socials">
          <a href="https://github.com/mohammednuhan" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="GitHub">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/mohammednuhan04/" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="LinkedIn">
            <FaLinkedinIn size={20} />
          </a>
          <a href="nuhanmohammed04@gmail.com" className="hero-social-icon" aria-label="Email">
            <FaEnvelope size={20} />
          </a>
          <a href="#" className="hero-social-icon" aria-label="Resume">
            <FaFileAlt size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

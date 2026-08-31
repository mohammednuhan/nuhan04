import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';
import '../styles/contact.css';

export default function Contact() {
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
      { threshold: 0.2 }
    );
    const section = document.getElementById('contact');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="section contact-section content-visibility-auto">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className={`section-title gradient-text ${visible ? 'visible' : 'fade-up'}`}>
            Get In Touch
          </h2>
          <p className={`section-subtitle ${visible ? 'visible' : 'fade-up'}`}>
            I'm currently seeking internship opportunities in AI and software engineering.
            Let's build something great together!
          </p>
        </div>

        <div className={`contact-info ${visible ? 'visible' : 'fade-up'}`}>
          <div className="contact-item">
            <div className="contact-item-icon">
              <FaEnvelope size={20} />
            </div>
            <div>
              <span className="contact-item-label">Email</span>
              <a href="mailto:nuhanmohammed04@gmail.com" className="contact-item-value">
                nuhanmohammed04@gmail.com
              </a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-item-icon">
              <FaMapMarkerAlt size={20} />
            </div>
            <div>
              <span className="contact-item-label">Location</span>
              <span className="contact-item-value">Bangalore</span>
            </div>
          </div>
        </div>

        <div className={`contact-socials ${visible ? 'visible' : 'fade-up'}`}>
          <a
            href="https://github.com/mohammednuhan"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-btn"
          >
            <FaGithub size={22} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mohammednuhan04/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-btn"
          >
            <FaLinkedinIn size={22} />
            LinkedIn
          </a>
        </div>

        <div className="contact-cta">
          <a
            href="mailto:nuhanmohammed04@gmail.com"
            className={`btn btn-primary ${visible ? 'visible' : 'fade-up'}`}
          >
            <FaPaperPlane size={16} />
            Say Hello
          </a>
        </div>
      </div>
    </section>
  );
}

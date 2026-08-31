import React, { useEffect, useState } from 'react';
import { FaGraduationCap, FaSchool } from 'react-icons/fa';
import { getJson } from '../lib/api.js';
import '../styles/education.css';

export default function Education() {
  const [education, setEducation] = useState([]);
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
    const section = document.getElementById('education');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await getJson('/education');
        setEducation(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch education:', err);
        setEducation([]);
      }
    };
    fetchEducation();
  }, []);

  const defaultEducation = [
    {
      degree: 'BE in Aritifical Intelligence and Machine Learning',
      institution: 'VTU University',
      field: 'AI & Software Engineering',
      status: 'Fourth Year',
      focus: 'Artificial Intelligence, Software Engineering',
      coursework: ['Machine Learning', 'Software Architecture'],
      learnings: ['Agentic AI systems', 'Scalable web applications'],
    },
  ];

  const display = education.length > 0 ? education : defaultEducation;

  return (
    <section id="education" className="section education-section content-visibility-auto">
      <div className="education-header fade-up visible">
        <h2 className="section-title">My Education</h2>
        <p className="section-subtitle">
          Academic background and areas of focused study.
        </p>
      </div>

      <div className="education-timeline">
        {display.map((item, index) => {
          const Icon = item.degree.includes('BE') || item.degree.includes('Bachelor') ? FaGraduationCap : FaSchool;
          return (
            <div
              key={index}
              className={`education-item ${visible ? 'visible' : 'fade-up'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="education-dot" />
              <div className="education-card">
                <div className="education-card-top">
                  <div className="education-icon-tile">
                    <Icon size={24} color="#fff" />
                  </div>
                  <span className="education-status">{item.status}</span>
                </div>

                <h3 className="education-degree">{item.degree}</h3>
                <p className="education-institution">{item.institution}</p>
                <p className="education-field">{item.field}</p>

                <div className="education-meta">
                  <p><strong>Focus:</strong> {item.focus}</p>
                </div>

                <div className="education-tags">
                  {(item.coursework || []).map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>

                {(item.learnings && item.learnings.length > 0) && (
                  <div className="education-learnings">
                    <ul>
                      {item.learnings.map((l, i) => (
                        <li key={i}>{l}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

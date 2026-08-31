import React, { useEffect, useState } from 'react';
import { FaUsers, FaTrophy, FaMedal, FaBullseye, FaChartLine, FaFire } from 'react-icons/fa';
import '../styles/beyond.css';

const traitIcons = {
  Leadership: FaBullseye,
  Discipline: FaFire,
  Teamwork: FaUsers,
  'Competitive Mindset': FaTrophy,
};

const gradientMap = {
  Leadership: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
  Discipline: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
  Teamwork: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
  'Competitive Mindset': 'linear-gradient(135deg, #f59e0b, #ef4444)',
};

export default function Beyond() {
  const [traits, setTraits] = useState([]);
  const [sports, setSports] = useState([]);
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
    const section = document.getElementById('beyond');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [traitsRes, sportsRes] = await Promise.all([
          fetch('/api/beyond/traits'),
          fetch('/api/beyond/sports'),
        ]);
        const traitsData = await traitsRes.json();
        const sportsData = await sportsRes.json();
        setTraits(Array.isArray(traitsData) ? traitsData : []);
        setSports(Array.isArray(sportsData) ? sportsData : []);
      } catch (err) {
        console.error('Failed to fetch beyond data:', err);
        setTraits([]);
        setSports([]);
      }
    };
    fetchData();
  }, []);

  const defaultTraits = [
    { name: 'Leadership', description: 'Leading teams and projects with vision and accountability.' },
    { name: 'Discipline', description: 'Consistent daily practice and dependable work ethic.' },
    { name: 'Teamwork', description: 'Collaborating effectively to achieve shared goals.' },
    { name: 'Competitive Mindset', description: 'Pushing boundaries and continuously improving.' },
  ];

  const defaultSports = [
    { title: 'Team Member', achievement: 'Represented university in sports', year: '2023' },
    { title: 'Participant', achievement: 'Inter-university competition', year: '2024' },
  ];

  const displayTraits = traits.length > 0 ? traits : defaultTraits;
  const displaySports = sports.length > 0 ? sports : defaultSports;

  return (
    <section id="beyond" className="section beyond-section content-visibility-auto">
      <div className="beyond-header fade-up visible">
        <h2 className="section-title">Beyond The Keyboard</h2>
        <p className="section-subtitle">
          What drives me outside of code — leadership, discipline, and a love for sports.
        </p>
      </div>

      <div className="beyond-traits">
        {displayTraits.map((trait, index) => {
          const Icon = traitIcons[trait.name] || FaChartLine;
          const bg = gradientMap[trait.name] || 'var(--gradient-primary)';
          return (
            <div
              key={index}
              className={`beyond-trait fade-up ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="beyond-trait-icon" style={{ background: bg }}>
                <Icon size={22} color="#fff" />
              </div>
              <h3 className="beyond-trait-name">{trait.name}</h3>
              <p className="beyond-trait-desc">{trait.description}</p>
            </div>
          );
        })}
      </div>

      <div className="beyond-sports">
        <h3 className={`beyond-sports-title ${visible ? 'visible' : 'fade-up'}`}>
          <FaMedal size={20} color="var(--accent-orange)" />
          Sports Achievements
        </h3>
        <div className="beyond-timeline">
          {displaySports.map((sport, index) => (
            <div key={index} className={`beyond-timeline-item ${visible ? 'visible' : 'fade-up'}`}>
              <div className="beyond-timeline-dot" />
              <div className="beyond-timeline-content">
                <div className="beyond-timeline-top">
                  <span className="beyond-timeline-title">{sport.title || sport.event}</span>
                  <span className="beyond-timeline-year">{sport.year}</span>
                </div>
                <p className="beyond-timeline-desc">{sport.achievement || sport.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

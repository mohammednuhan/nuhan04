import React, { useEffect, useState } from 'react';
import {
  FaUsers,
  FaTrophy,
  FaMedal,
  FaBullseye,
  FaChartLine,
  FaFire,
  FaFutbol,
  FaRunning,
  FaFlagCheckered,
} from 'react-icons/fa';
import '../styles/beyond.css';

const traitIcons = {
  Leadership: FaBullseye,
  Discipline: FaFire,
  Teamwork: FaUsers,
  'Competitive Mindset': FaTrophy,
};

const sportIcons = {
  football: FaFutbol,
  running: FaRunning,
  relay: FaFlagCheckered,
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
    { name: 'Leadership', description: 'Leading teams and projects with vision and accountability.', icon: 'Leadership' },
    { name: 'Discipline', description: 'Consistent daily practice and dependable work ethic.', icon: 'Discipline' },
    { name: 'Teamwork', description: 'Collaborating effectively to achieve shared goals.', icon: 'Teamwork' },
    { name: 'Competitive Mindset', description: 'Pushing boundaries and continuously improving.', icon: 'Competitive Mindset' },
  ];

  const defaultSports = [
    { title: 'Football', tag: 'Team Sport', achievement: 'Active player in inter-college tournaments', year: '2023', level: 85, levelLabel: 'Club-Level Player', icon: 'football' },
    { title: '1500m Race', tag: 'Track & Field', achievement: 'Competed in distance events', year: '2024', level: 78, levelLabel: 'District Competitor', icon: 'running' },
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
          const Icon = traitIcons[trait.name] || traitIcons[trait.icon] || FaChartLine;
          const bg = gradientMap[trait.name] || gradientMap[trait.icon] || 'var(--gradient-primary)';
          return (
            <div
              key={index}
              className={`beyond-trait fade-up ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="beyond-trait-top">
                <div className="beyond-trait-icon" style={{ background: bg }}>
                  <Icon size={20} color="#fff" />
                </div>
                <span className="beyond-trait-num">0{index + 1}</span>
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
          Sports & Playing Level
        </h3>
        <div className="beyond-sports-grid">
          {displaySports.map((sport, index) => {
            const Icon = sportIcons[sport.icon] || sportIcons[sport.tag] || FaRunning;
            const level = Math.min(100, Math.max(0, Number(sport.level) || 0));
            return (
              <div key={index} className={`beyond-sport fade-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="beyond-sport-head">
                  <div className="beyond-sport-icon">
                    <Icon size={18} />
                  </div>
                  <div className="beyond-sport-meta">
                    <h4 className="beyond-sport-title">{sport.title}</h4>
                    <span className="beyond-sport-tag">{sport.tag}</span>
                  </div>
                  <span className="beyond-sport-level">{level}</span>
                </div>

                {sport.levelLabel && (
                  <span className="beyond-sport-badge">{sport.levelLabel}</span>
                )}

                <div className="beyond-sport-bar">
                  <span className="beyond-sport-bar-fill" style={{ width: `${level}%` }} />
                </div>

                <p className="beyond-sport-desc">
                  {sport.description || sport.achievement || sport.year}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

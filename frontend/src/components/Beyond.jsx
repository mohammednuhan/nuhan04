import React, { useEffect, useState } from 'react';
import {
  FaUsers,
  FaTrophy,
  FaMedal,
  FaBullseye,
  FaFire,
  FaFutbol,
  FaRunning,
  FaFlagCheckered,
} from 'react-icons/fa';
import { getJson } from '../lib/api.js';
import '../styles/beyond.css';

const traitIcons = {
  Leadership: FaBullseye,
  Discipline: FaFire,
  Teamwork: FaUsers,
  'Competitive Mindset': FaTrophy,
  users: FaUsers,
  clock: FaFire,
  handshake: FaUsers,
  trophy: FaTrophy,
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

const sportGradients = [
  'linear-gradient(135deg, #1B5E20, #2e8b33)',
  'linear-gradient(135deg, #D4AF37, #f4d03f)',
  'linear-gradient(135deg, #00d4aa, #4f8eff)',
];

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
        const [traitsData, sportsData] = await Promise.all([
          getJson('/beyond/traits'),
          getJson('/beyond/sports'),
        ]);
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
    { title: 'Football', tag: 'Team Sport', achievement: 'Active player in inter-college tournaments', level: 92, levelLabel: 'State-Level Player', icon: 'football' },
    { title: '1500m Race', tag: 'Track & Field', achievement: 'Competed in distance events', level: 78, levelLabel: 'District Competitor', icon: 'running' },
  ];

  const displayTraits = traits.length > 0 ? traits : defaultTraits;
  const displaySports = sports.length > 0 ? sports : defaultSports;

  return (
    <section id="beyond" className="section beyond-section content-visibility-auto">
      <div className="beyond-header fade-up visible">
        <h2 className="section-title gradient-text">Beyond The Keyboard</h2>
        <p className="section-subtitle">
          What drives me outside of code — leadership, discipline, and a love for sports.
        </p>
      </div>

      <div className="beyond-traits">
        {displayTraits.map((trait, index) => {
          const Icon = traitIcons[trait.name] || traitIcons[trait.icon] || FaTrophy;
          const bg = gradientMap[trait.name] || gradientMap[trait.icon] || 'var(--gradient-primary)';
          return (
            <div
              key={index}
              className={`beyond-trait fade-up ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
              <div className="beyond-trait-dot" style={{ background: bg }}>
                <Icon size={16} color="#fff" />
              </div>
              <div className="beyond-trait-content">
                <div className="beyond-trait-head">
                  <h3 className="beyond-trait-name">{trait.name || trait.title}</h3>
                  <span className="beyond-trait-num">0{index + 1}</span>
                </div>
                <p className="beyond-trait-desc">{trait.description}</p>
              </div>
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
              <div key={index} className={`beyond-sport fade-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.12}s` }}>
                <div className="beyond-sport-banner" style={{ background: sportGradients[index % sportGradients.length] }} />
                <div className="beyond-sport-body">
                  <div className="beyond-sport-head">
                    <div className="beyond-sport-icon" style={{ background: sportGradients[index % sportGradients.length] }}>
                      <Icon size={17} />
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

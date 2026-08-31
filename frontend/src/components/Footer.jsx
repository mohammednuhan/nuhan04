import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/images/profile.jpeg" alt="MN" className="footer-avatar" />
        </div>
        <p className="footer-text">
        Designed & built by<span className="footer-name"> Mohammed Nuhan</span>
        </p>
        <p className="footer-copyright">Thanks for visiting! Until next time.</p>
      </div>
    </footer>
  );
}

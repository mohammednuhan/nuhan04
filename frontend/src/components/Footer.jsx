import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/images/profile.jpeg" alt="MN" className="footer-avatar" />
          <span className="footer-logo-text">MN.dev</span>
        </div>
        <p className="footer-text">
          Managed by<span className="footer-name">Mohammed Nuhan</span>
        </p>
        <p className="footer-copyright">2026 Mohammed Nuhan</p>
      </div>
    </footer>
  );
}

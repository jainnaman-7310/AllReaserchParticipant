/* eslint-disable max-len */
/* eslint-disable jsx-quotes */
import React from 'react';

function Header() {
  return (
    <header className="survey-landing-hero">
      <div className="survey-landing-shell">
        <div className="survey-landing-nav">
          <div className="survey-brand">
            <div className="survey-brand-mark">A</div>
            <div className="survey-brand-copy">
              <strong>AllReaserch</strong>
              <span>Survey Community</span>
            </div>
          </div>

          <div className="survey-privacy-chip">
            <span className="survey-privacy-dot" />
            <span>Your privacy matters</span>
          </div>
        </div>

        <div className="survey-landing-content">
          <div className="survey-welcome-badge">
            <span>✦</span>
            Welcome to AllReaserch
          </div>

          <h1>Share Your Opinion</h1>
          <p className="survey-landing-lead">
            Your feedback helps businesses make better decisions.
          </p>

          <div className="survey-benefit-grid">
            <div className="survey-benefit-item">
              <span className="survey-benefit-icon">⌁</span>
              <div>
                <strong>Private</strong>
                <small>Your responses stay confidential.</small>
              </div>
            </div>
            <div className="survey-benefit-item">
              <span className="survey-benefit-icon">✦</span>
              <div>
                <strong>Rewarded</strong>
                <small>Your opinions can earn rewards.</small>
              </div>
            </div>
            <div className="survey-benefit-item">
              <span className="survey-benefit-icon">◷</span>
              <div>
                <strong>Quick & Easy</strong>
                <small>A simple, focused survey experience.</small>
              </div>
            </div>
          </div>

          <p className="survey-landing-note">A few quick questions before you begin.</p>
        </div>
      </div>
    </header>
  );
}

export default Header;

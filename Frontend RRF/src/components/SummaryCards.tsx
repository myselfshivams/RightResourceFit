import React from 'react';
import '../styles/SummaryCards.css';

const SummaryCards: React.FC = () => {
  return (
    <div className="summary-cards">
      <div className="card">
        <h3>Job Posts</h3>
        <p>2,456</p>
        <span>+2.5%</span>
      </div>
      <div className="card">
        <h3>Total Applications</h3>
        <p>4,561</p>
        <span>-4.4%</span>
      </div>
      <div className="card">
        <h3>No of Meetings</h3>
        <p>125</p>
        <span>+1.5%</span>
      </div>
      <div className="card">
        <h3>No of Hirings</h3>
        <p>2,456</p>
        <span>+4.5%</span>
      </div>
    </div>
  );
};

export default SummaryCards;

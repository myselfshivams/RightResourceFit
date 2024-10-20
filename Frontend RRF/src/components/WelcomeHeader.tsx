import React from 'react';
import '../styles/WelcomeHeader.css'; 

const WelcomeHeader: React.FC = () => {
  return (
    <div className="welcome-header">
      <div className="welcome-text">
        <h1>Welcome to Right Resource Fit</h1>
        <p>Rohan Singla</p>
      </div>
      <div className="welcome-image">
        <img src="/welcomeimage.png" alt="Welcome" />
      </div>
    </div>
  );
};

export default WelcomeHeader;

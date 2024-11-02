import React from 'react';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <div className="top-header-container">
      <div className="dashboard-label">
        <span>Dashboard</span>
      </div>

      <div className="top-header-right">
        <div className="search-bar">
          <input type="text" placeholder="Search for Jobs and etc." />
          <FaSearch className="search-icon" />
        </div>

        <div className="notification-icon">
          <FaBell />
          <span className="notification-badge">2</span>
        </div>

        <div className="profile-icon">
          <FaUser size={40} />
        </div>
      </div>
    </div>
  );
};

export default Header;

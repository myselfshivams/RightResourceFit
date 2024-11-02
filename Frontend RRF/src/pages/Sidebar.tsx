import React from 'react';
import {
  FaClipboardList,
  FaSuitcase,
  FaClipboard,
  FaUserGraduate,
} from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="/Landing/logo.svg" alt="Logo" className="sidebar-logo" />
        <h2>Right Resource Fit</h2>
      </div>

      <ul>
        <li>
          <div className="sidebar-item">
            <FaClipboardList />
            <span>Dashboard</span>
            <div className="badge purple">2</div>
          </div>
        </li>
        <li>
          <div className="sidebar-item">
            <FaSuitcase />
            <span>Post Job</span>
            <div className="badge purple">2</div>
          </div>
        </li>
        <li>
          <div className="sidebar-item">
            <FaUserGraduate />
            <span>Post Internship</span>
            <div className="badge purple">2</div>
          </div>
        </li>
        <li>
          <div className="sidebar-item">
            <FaClipboard />
            <span>Application</span>
            <div className="badge purple">2</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

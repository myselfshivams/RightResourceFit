import React, { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaUsers,
  FaBell,
  FaCog,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom"; 
import styles from "../styles/UserSidebar.module.css";
import LogoutModal from "./LogoutModal";

const Sidebar: React.FC = () => {
  const [collapsed] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();



  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
       

        <div className={styles.userSection}>
          <img
            src={localStorage.getItem("avatar") || "/assets/user.png"}
            alt="User Avatar"
            className={styles.userImage}
          />
          {!collapsed && <span className={styles.userName}>{localStorage.getItem("username")}</span>}
        </div>
        <nav className={styles.nav}>
          <a
            onClick={() => navigate("/dashboard")}
            className={`${styles.navItem} ${
              window.location.pathname === "/dashboard" ? styles.active : ""
            }`}
          >
            <FaHome className={styles.icon} />
            {!collapsed && <span>Home</span>}
          </a>
          <a
            onClick={() => navigate("/admin/search")}
            className={`${styles.navItem} ${
              window.location.pathname === "/admin/search" ? styles.active : ""
            }`}
          >
            <FaSearch className={styles.icon} />
            {!collapsed && <span>Search</span>}
          </a>
          <a
            onClick={() => navigate("/admin/applications")}
            className={`${styles.navItem} ${
              window.location.pathname === "/admin/applications" ? styles.active : ""
            }`}
          >
            <FaFileAlt className={styles.icon} />
            {!collapsed && <span>My Appilications</span>}
          </a>
          <a
            onClick={() => navigate("/admin/jobs")}
            className={`${styles.navItem} ${
              window.location.pathname === "/admin/jobs" ? styles.active : ""
            }`}
          >
            <IoMdPersonAdd className={styles.icon} />
            {!collapsed && <span>Post Jobs</span>}
          </a>
          <a
            onClick={() => navigate("/admin/manage")}
            className={`${styles.navItem} ${
              window.location.pathname === "/admin/manage" ? styles.active : ""
            }`}
          >
            <FaUsers className={styles.icon} />
            {!collapsed && <span>Manage Jobs</span>}
          </a>
          <a
            onClick={() => navigate("/admin/notifications")}
            className={`${styles.navItem} ${
              window.location.pathname === "/admin/notifications" ? styles.active : ""
            }`}
          >
            <FaBell className={styles.icon} />
            {!collapsed && <span>Notifications</span>}
          </a>
          <a
            onClick={() => navigate("/admin/settings")}
            className={`${styles.navItem} ${
              window.location.pathname === "/admin/settings" ? styles.active : ""
            }`}
          >
            <FaCog className={styles.icon} />
            {!collapsed && <span>Settings</span>}
          </a>
          <a onClick={handleLogoutClick} className={styles.navItem}>
            <FaSignOutAlt className={styles.icon} />
            {!collapsed && <span>Logout</span>}
          </a>
        </nav>
      </div>

      <div className={styles.footerNav}>
        <a
          onClick={() => navigate("/dashboard")}
          className={window.location.pathname === "/dashboard" ? styles.active : ""}
        >
          <FaHome className={styles.icon} />
        </a>
        <a
          onClick={() => navigate("/admin/applications")}
          className={window.location.pathname === "/admin/applications" ? styles.active : ""}
        >
          <FaFileAlt className={styles.icon} />
        </a>
        <a
          onClick={() => navigate("/admin/search")}
          className={window.location.pathname === "/admin/search" ? styles.active : ""}
        >
          <FaSearch className={styles.icon} />
        </a>
        <a
          onClick={() => navigate("/admin/notifications")}
          className={window.location.pathname === "/admin/notifications" ? styles.active : ""}
        >
          <FaBell className={styles.icon} />
        </a>
        <a
          onClick={handleLogoutClick}
          className={window.location.pathname === "/logout" ? styles.active : ""}
        >
          <FaSignOutAlt className={styles.icon} />
        </a>
      </div>

      {isLogoutModalOpen && <LogoutModal setIsLogoutModalOpen={setIsLogoutModalOpen} />}
    </>
  );
};

export default Sidebar;

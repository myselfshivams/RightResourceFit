import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaLaptopCode } from 'react-icons/fa';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { MdOutlineMiscellaneousServices, MdOutlineLogin } from 'react-icons/md';
import logo from '/Landing/logo.svg';
import styles from '../styles/Navbar.module.css';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('avatar');
    localStorage.removeItem('username');
    setRole(null);
    navigate('/');
  };

  useEffect(() => {
    setLoaded(true);
    setRole(localStorage.getItem('role'));
  }, []);

  return (
    <>
      <div id="main-nav-content" className={loaded ? styles.loaded : ''}>
        <nav className={styles.navbar}>
          <div className={styles['navbar-container']}>
          <img
  src={logo}
  alt="logo"
  style={{ width: '50px', height: 'auto' }} 
className='logo'
/>
            <div className={styles['navbar-logo']}>
              <h2>RightResourceFit</h2>
            </div>
            <div className={`${styles['navbar-links']} ${isOpen ? styles.active : ''}`}>
              <Link to="/" className={`${styles['navbar-link']} ${location.pathname === '/' ? styles.activeLink : ''}`}>
                Home
              </Link>
              <Link to="/about" className={`${styles['navbar-link']} ${location.pathname === '/about' ? styles.activeLink : ''}`}>
                About
              </Link>
              <Link to="/services" className={`${styles['navbar-link']} ${location.pathname === '/services' ? styles.activeLink : ''}`}>
                Services
              </Link>
              <Link to="/contact" className={`${styles['navbar-link']} ${location.pathname === '/contact' ? styles.activeLink : ''}`}>
                Contact
              </Link>
              <Link to="/teams" className={`${styles['navbar-link']} ${location.pathname === '/teams' ? styles.activeLink : ''}`}>
                Team
              </Link>
            </div>
            {role ? (
              <>
                <Link to={role === 'admin' ? '/dashboard' : '/user-dashboard'}>
                  <button className={styles['login-button']}>Dashboard</button>
                </Link>
                <Link to="/logout">
                <button onClick={handleLogout} className={styles['login-button']}>Logout</button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">
                  <button className={styles['login-button']}>Register</button>
                </Link>
                <Link to="/login">
                  <button className={styles['login-button']}>Login</button>
                </Link>
              </>
            )}
            <button className={styles['navbar-toggle']} onClick={toggleNavbar}>
              <span className={styles['navbar-toggle-icon']}></span>
            </button>
          </div>
        </nav>
      </div>

      <div className={styles.footerNav}>
        <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
          <FaHome className={styles.footerNavIcon} />
        </Link>
        <Link to="/services" className={location.pathname === '/services' ? styles.active : ''}>
          <MdOutlineMiscellaneousServices className={styles.footerNavIcon} />
        </Link>
        <Link to="/contact" className={location.pathname === '/contact' ? styles.active : ''}>
          <RiContactsBook2Fill className={styles.footerNavIcon} />
        </Link>
        <Link to="/teams" className={location.pathname === '/teams' ? styles.active : ''}>
          <FaLaptopCode className={styles.footerNavIcon} />
        </Link>
        <Link to={role ? (role === 'admin' ? '/dashboard' : '/user-dashboard') : '/login'} className={location.pathname === '/login' ? styles.active : ''}>
          <MdOutlineLogin className={styles.footerNavIcon} />
        </Link>
      </div>
    </>
  );
};

export default NavBar;

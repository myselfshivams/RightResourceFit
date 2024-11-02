import React from 'react';
import styles from '../styles/NotFound.module.css';
import { Link } from 'react-router-dom';
import Footer3 from './Footer3';
import Navbar3 from './Navbar3';

const Custom404: React.FC = () => {
  return (
    <>
      <Navbar3 />

      <div className={styles.bgg}>
        <div className={styles.unauthorizedPage}>
          <div className={styles.leftSection}>
            <div className={styles.messageContainer}>
              <h1 className={styles.heading}>404</h1>
              <p className={styles.subText}>Page Under Construction</p>
              <p className={styles.instruction}>
                The page you're trying to access is currently under
                construction. Please come back later or return to the home page.
              </p>

              <Link to="/">
                <button
                  style={{
                    backgroundColor: '#2E073F' /* Blue color */,
                    color: '#fff' /* White text */,
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  BACK TO HOME
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.rightSection}>
            <img
              src="/404.png"
              alt="Page Under Construction"
              className={styles.heroImage}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      <Footer3 />
    </>
  );
};

export default Custom404;

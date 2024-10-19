import React from 'react';
import styles from '../styles/NotFound.module.css';

const Custom404: React.FC = () => {
  return (
    <div className={styles.bgg}>
      <div className={styles.unauthorizedPage}>
        <div className={styles.leftSection}>
          <div className={styles.messageContainer}>
            <h1 className={styles.heading}>404</h1>
            <p className={styles.subText}>Page Under Construction</p>
            <p className={styles.instruction}>
              The page you're trying to access is currently under construction. Please come back later or return to the home page.
            </p>
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
  );
};

export default Custom404;

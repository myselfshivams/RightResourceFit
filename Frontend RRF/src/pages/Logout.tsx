import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ClipLoader } from 'react-spinners';
import styles from '../styles/Logout.module.css'; 

const Logout: React.FC = () => {
  const navigate = useNavigate(); 

  useEffect(() => {

    localStorage.removeItem('token');

    document.cookie = 'token=; Max-Age=0; Path=/; Secure; HttpOnly; SameSite=Strict';

    setTimeout(() => {
      navigate('/'); 
    }, 1500);
  }, [navigate]);

  return (
    <div className={styles.logoutPage}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <ClipLoader color="#007BFF" size={60} />
          <p className={styles.message}>Logging out...</p>
        </div>
      </div>
    </div>
  );
};

export default Logout;

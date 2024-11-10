import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaInstagram, FaGithub, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomainRegex =
      /^(.*@gmail\.com|.*@yahoo\.com|.*@outlook\.com|.*@studex\.tech|.*@echotratech\.com|.*@.*\.edu|.*@.*\.ac\.in)$/i;

    if (!emailRegex.test(email) || !validDomainRegex.test(email)) {
      toast.error('Use a valid email address');
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('Subscribed to StreakType Successfully');
        setEmail('');
      } else {
        const { message } = await response.json();
        toast.error(message || 'Failed to subscribe');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.socialColumn}>
          <h4>Social Links</h4>
          <div className={styles.socialLinks}>
            <a href="mailto:contact@rightresourcefit.me" aria-label="Email">
              <FaEnvelope className={styles.icon} />
            </a>
            <a
              href="https://www.instagram.com/"
              aria-label="Instagram"
            >
              <FaInstagram className={styles.icon} />
            </a>
            <a href="https://github.com/" aria-label="GitHub">
              <FaGithub className={styles.icon} />
            </a>
          </div>
        </div>

        <div className={styles.pageColumn}>
          <h4>Useful Links</h4>
          <div className={styles.pageLinks}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login/Register</Link>
          </div>
        </div>

        <div className={styles.subscribeColumn}>
          <h4>Subscribe Our Newsletter</h4>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.copyright}>
          <p className={styles.rights}>
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className={styles.privacyLinks}>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className={styles.scrollToTopButton}
          aria-label="Scroll to top"
        >
          <FaArrowUp className={styles.arrowUpIcon} />
        </button>
      )}
    </footer>
  );
};

export default Footer;

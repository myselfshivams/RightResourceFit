import '../styles/Footer3.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footerleft">
          <h3>Right Resource Fit</h3><br />
          <p>
            Empower your HR team with Right Resource Fit, where we simplify recruitment,
            enhance candidate experiences, and ensure the perfect match for every role.
          </p><br />
          <p>
            <i className="fa fa-phone"></i> +91-12345–12345
          </p><br />
          <p>
            <i className="fa fa-envelope"></i> contact@pranavgupta@gmail.com
          </p><br />
          <p>
            <i className="fa fa-map-marker"></i> New Delhi, India
          </p><br />
          <p>© 2024 All Rights Reserved</p>
        </div>

        <div className="footer-right">
          <h4>Subscribe Our Newsletter</h4>
          <form>
            <input type="email" placeholder="Enter your Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <a href="/">Home</a>
        <a href="/login">Login/Signup</a>
        <a href="#">Privacy & Policy</a>
        <a href="#">Sitemap</a>
        <a href="#">Terms & Conditions</a>
      </div>
    </footer>
  );
};

export default Footer;

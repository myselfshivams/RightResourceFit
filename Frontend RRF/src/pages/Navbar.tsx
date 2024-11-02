import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
// import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Fetch token from localStorage

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    navigate('/login');
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/assets/Vector.png" alt="Right Resource Fit Logo" />
          <h2 className="CompanyName">Right Resource Fit</h2>
        </div>
        <ul className="navbar-links">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About us</li>
          </Link>
          <Link to="/contact">
            <li>Contact us</li>
          </Link>
        </ul>
        <div className="Button">
          {!token ? (
            <>
              <button>
                <Link className="Login" to="/login">
                  Login
                </Link>
              </button>
              <button>
                <Link to="/register"> Register</Link>
              </button>
            </>
          ) : (
            <>
              {localStorage.getItem('role') === 'admin' && (
                <a href="/dashboard">Dashboard</a>
              )}
              {localStorage.getItem('role') === 'user' && (
                <a href="/user-dashboard">Dashboard</a>
              )}
              <button className="Login" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

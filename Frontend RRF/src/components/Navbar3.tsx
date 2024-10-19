import '../styles/Navbar3.css';
import { useNavigate } from 'react-router-dom';  // Assuming you're using React Router for navigation

const Navbar3 = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');  // Fetch token from localStorage

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar">
        <div className="navbar-logo">
  <img src="/Landing/logo.png" alt="Logo" />
  <h2>Right Resource Fit</h2>
</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact Us</a></li>

        {!token ? (
          <>
            <li><a href="/login">Login/Regiter</a></li>
          </>
        ) : (
          <>
            {localStorage.getItem('role') === 'admin' && <li><a href="/dashboard">Dashboard</a></li>}
            {localStorage.getItem('role') === 'user' && <li><a href="/user-dashboard">Dashboard</a></li>}
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar3;

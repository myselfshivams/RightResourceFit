import "../styles/Navbar.css"
// import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <>
      <nav className="navbar">
      <div className="navbar-logo">
        <img src="src\assets\Vector.png" alt="Right Resource Fit Logo" />
        <h2 className="CompanyName">Right Resource Fit</h2>
      </div>
      <ul className="navbar-links">
        <li>Home</li>
        <li>About us</li>
        <li>Contact us</li>
      </ul>
      <div className="Button">
        <button><Link className="Login" to="/register">Login</Link></button>
         <button><Link to="/register"> Register</Link></button> 
      </div>
    </nav>
    </>
  )
}

export default Navbar

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
        <Link to="/"><li>Home</li></Link>
        <Link to="#"><li>About us</li></Link>
        <Link to="/contact"><li>Contact us</li></Link>
      </ul>
      <div className="Button">
        <button><Link className="Login" to="/login">Login</Link></button>
         <button><Link to="/register"> Register</Link></button> 
      </div>
    </nav>
    </>
  )
}

export default Navbar

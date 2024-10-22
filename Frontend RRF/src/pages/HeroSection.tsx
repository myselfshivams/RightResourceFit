import { Link } from "react-router-dom"
import "../styles/HeroSection.css"

const HeroSection = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      <section className="hero-section">
      <div className="hero-content">
        <div className="container-text">
            <p>Explore Excitng carrer opportunities</p>
        </div>
        <h1>
          Explore &amp; find new career opportunities <br /> with <strong className="RRF">Right Resource Fit</strong>
        </h1>
        <div className="textss">
        <p className="para">
          Right Resource Fit keeps you updated with the latest job opportunities by following industry trends
          and top professionals on social media.
        </p>
        {!token && (  // Only show if token is not available
              <div className="hero-buttons">
                <button className="btn-get-started">
                  <Link to="/register">Get Started</Link>
                </button>
                <button className="btn-watch-demo">Watch Demo</button>
              </div>
            )}
        </div>
      </div>
      <div className="hero-image">
        <img src="/assets/Group 33123.png" alt="Career Opportunities" />
      </div>
    </section>
    </div>
  )
}

export default HeroSection

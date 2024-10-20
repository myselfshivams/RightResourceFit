import "../styles/MapSection.css"
import FaqQuestion from "./FAQ"

const MapSection = () => {
  return (
    <div>
      <div className="find-job-opportunities">
      <div className="header-section">
        <h3>FIND JOB OPPORTUNITIES</h3>
        <h1>Right Resource Fit: Find Job Opportunities Near You</h1>
        <p>
          This feature allows you to search for job opportunities or trending careers in your area, 
          so you'll always stay updated and in the know! <span role="img" aria-label="thumb-up">👍</span>
        </p>
      </div>

      <div className="map-section">
        <img src="src/assets/Screenshot 2024-10-13 at 14.05.09.png" alt="Map" />
      </div>

      <div className="features-section">
        <div className="feature-item">
          <img src="src/assets/48px.png" alt="Applicant Tracking System" />
          <h4>Applicant Tracking System (ATS)</h4>
          <p>
            Streamlines the recruitment process by tracking candidates from application to hiring, 
            making it easy to manage and review applications.
          </p>
        </div>

        <div className="feature-item">
          <img src="src/assets/49px.png" alt="User-Friendly Interface" />
          <h4>User-Friendly Interface</h4>
          <p>
            Designed with an intuitive interface that makes it easy for HR professionals to navigate 
            and utilize the platform effectively.
          </p>
        </div>

        <div className="feature-item">
          <img src="src/assets/50px.png" alt="Candidate Profiles" />
          <h4>Candidate Profiles</h4>
          <p>
            Allows for detailed candidate profiles that include resumes, interview notes, and assessments, 
            making it easier to compare and evaluate candidates.
          </p>
        </div>
      </div>
    </div>
    <FaqQuestion />
    </div>
  )
}

export default MapSection

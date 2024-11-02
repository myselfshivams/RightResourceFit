import '../styles/ReserveSpot.css';

const ReserveSpot = () => {
  return (
    <div className="reserve-spot">
      <div className="left-section">
        <h3>RESERVE YOUR SPOT</h3>
        <h1>Don't want to wait for your dream job?</h1>
        <div className="feature-list">
          <div className="featureItem">
            <img src="/assets/ReserveSpot\Group 7.png" alt="Find Job" />
            <div>
              <h5>Find the Job You Want</h5>
              <p>Find your next career opportunity with Right Resource Fit</p>
            </div>
          </div>
          <div className="featureItem">
            <img
              src="/assets/ReserveSpot\Group 11.png"
              alt="Next Opportunity"
            />
            <div>
              <h5>Find your next career opportunity with Right Resource Fit</h5>
              <p>
                Fill out and complete your information for job application
                purposes
              </p>
            </div>
          </div>
          <div className="featureItem">
            <img
              src="/assets/ReserveSpot\Group 12.png"
              alt="Explore Opportunities"
            />
            <div>
              <h5>Just log in and explore your career opportunities!</h5>
              <p>
                You can easily log in and explore your career opportunities
                without any obstacles!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReserveSpot;

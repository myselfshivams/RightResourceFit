import React from "react";
import "../styles/UserDashboard.css";
import Sidebar from "../components/UserSidebar";

const UserDashboard: React.FC = () => {
  return (
    <>
   <Sidebar />
    <div className="app-container">
 

      <main className="app-main">
   

        <section className="content">
          <div className="ai-interview-section">
            <h1>Practice mock interview with AI!!</h1>
            <p>Analyze your result and enhance your performance </p>
            <button className="start-btn">Start</button>
          </div>

          <div className="jobs-section">
            <h2>Recommended Jobs for you!</h2>
            <div className="job-cards">
              <div className="job-card">
                <img src="./images/accenture.png" alt="Accenture" />
                <h3>Product Owner</h3>
                <p>Accenture</p>
                <p>Bangalore</p>
              </div>
              <div className="job-card">
                <img src="./images/google.jpg" alt="Google" />
                <h3>Scrum Master</h3>
                <p>Google</p>
                <p>Mumbai</p>
              </div>
              <div className="job-card">
                <img src="./images/capegemini.webp" alt="Capgemini" />
                <h3>Team Lead</h3>
                <p>Capgemini</p>
                <p>Chennai</p>
              </div>
              <div className="job-card">
                <img src="./images/Wiprologo1.jpg" alt="Wipro" />
                <h3>Business Analyst</h3>
                <p>Wipro</p>
                <p>Delhi</p>
              </div>
            </div>
          </div>

          <div className="companies">
            <h3>Still more companies and So on!!</h3>
          </div>
          <div className="companies-logos">
            <img src="./images/microsoft.png" alt="Microsoft" />
            <img src="./images/infosys.jpg" alt="Infosys" />
            <img src="./images/amazon.jpg" alt="Amazon" />
            <img src="./images/tcs.jpeg" alt="TCS" />
            <img src="./images/paypal.png" alt="PayPal" />
            <img src="./images/hcl.jpeg" alt="HCL" />
            <img src="./images/apple.jpeg" alt="Apple" />
          </div>
          <footer>
            <p>@2021 All Rights Reserved to Right Resource Fit</p>
          </footer>
        </section>
      </main>
    </div>
    </>
  );
}

export default UserDashboard;

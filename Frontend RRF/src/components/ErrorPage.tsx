import React from "react";
import '../styles/errorpage.css'; 
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div className="errorPageMainContainer">
      <div className="errorMsgContent">
        <h2 className="error">404</h2>
        <p>PAGE NOT FOUND</p>
        <p>It looks like nothing was found at this location.</p>
      </div>
      <div className="errorBackToHomeBtn">
        <Link to="/">
          <button>BACK TO HOME</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

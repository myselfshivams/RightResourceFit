import React from "react";
import '../styles/errorpage.css'; 
import { Link } from "react-router-dom";
import Footer3 from "./Footer3";
import Navbar3 from "./Navbar3";

const ErrorPage: React.FC = () => {
  return (
    <>
    <Navbar3/>
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
    <Footer3/>
    </>
  );
};

export default ErrorPage;

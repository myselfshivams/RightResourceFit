import { FunctionComponent } from 'react';
import '../styles/Login.css';



const RegisterPage:FunctionComponent = () => {
  	return (
    		<div className="register-page">
      			<div className="macbook">
        				<img className="backgroud-image-icon" alt="" src="bg.png" />
        				<div className="parent-container" />
      			</div>
      			<img className="loginsignup-image-icon" alt="" src="login.png" />
      			<div className="register-container">
        				<div className="register-container1" />
        				<div className="password">
          					<div className="usernamegmailcom">Password</div>
          					<div className="password-parent">
            						<div className="usernamegmailcom">Password</div>
            						<img className="clarityeye-hide-line-icon" alt="" src="clarity:eye.svg" />
          					</div>
        				</div>
        				<div className="back-to-login">
          					<div className="usernamegmailcom">{`Back to Login ? `}</div>
          					<div className="login">Login</div>
        				</div>
        				<div className="register-heading">Register</div>
        				<div className="email">
          					<div className="usernamegmailcom">Email</div>
          					<div className="usernamegmailcom-wrapper">
            						<div className="usernamegmailcom">username@gmail.com</div>
          					</div>
        				</div>
        				<div className="sign-up-button">
          					<div className="usernamegmailcom">Sign up</div>
        				</div>
        				<div className="confirm-password">
          					<div className="usernamegmailcom">Confirm Password</div>
          					<div className="password-parent">
            						<div className="usernamegmailcom">Password</div>
            						<img className="clarityeye-hide-line-icon" alt="" src="clarity:eye-hide-line.svg" />
          					</div>
        				</div>
        				<div className="mobile-number">
          					<div className="usernamegmailcom">Mobile No.</div>
          					<div className="usernamegmailcom-wrapper">
            						<div className="usernamegmailcom">Mobile Number</div>
          					</div>
        				</div>
        				<div className="name">
          					<div className="usernamegmailcom">Name</div>
          					<div className="usernamegmailcom-wrapper">
            						<div className="usernamegmailcom">Shivam Singh</div>
          					</div>
        				</div>
      			</div>
      			<div className="title">Right Resource Fit</div>
    		</div>);
};

export default RegisterPage;

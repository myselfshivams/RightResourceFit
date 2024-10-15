import React, { useState } from 'react';
import '../styles/Register.css';

const Register: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, mobile, email, password, confirmPassword });
  };

  return (
    <div className="register-page">
      <div className="macbook">
        <img className="backgroud-image-icon" alt="" src="bg.png" />
        <div className="parent-container" />
      </div>
      <img className="loginsignup-image-icon" alt="" src="login.png" />
      <form className="register-container" onSubmit={handleSubmit}>
        <div className="register-heading">Register</div>

        <div className="name">
          <label className="usernamegmailcom">Name</label>
          <input
            type="text"
            className="usernamegmailcom-wrapper"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Shivam Singh"
            required
          />
        </div>

        <div className="mobile-number">
          <label className="usernamegmailcom">Mobile No.</label>
          <input
            type="text"
            className="usernamegmailcom-wrapper"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile Number"
            required
          />
        </div>

        <div className="email">
          <label className="usernamegmailcom">Email</label>
          <input
            type="email"
            className="usernamegmailcom-wrapper"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="username@gmail.com"
            required
          />
        </div>

        <div className="password">
          <label className="usernamegmailcom">Password</label>
          <input
            type="password"
            className="usernamegmailcom-wrapper"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <div className="confirm-password">
          <label className="usernamegmailcom">Confirm Password</label>
          <input
            type="password"
            className="usernamegmailcom-wrapper"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </div>

     
      

       

        <div className="sign-up-button">
          <button type="submit" className="usernamegmailcom">Sign Up</button>
        </div>

        <div className="back-to-login">
          <span className="usernamegmailcom">Back to Login?</span>
          <span className="login">Login</span>
        </div>
      </form>

      <div className="title">Right Resource Fit</div>
    </div>
  );
};

export default Register;

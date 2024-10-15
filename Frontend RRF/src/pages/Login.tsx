import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    name: "",
    phoneNumber: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Functionality");
  };

  return (
    <div className="bgg">
      <div className={`loginPage ${isSignUp ? "swipeLeft" : "swipeRight"}`}>
        <div className="leftSection">
          <img src="/login.png" alt="Hero Image" className="heroImage" />
          <h1>Right Resource Fit</h1>
        </div>
        <div className="rightSection">
          <div className="loginContainer">
            <h1 className="heading">{isSignUp ? "Sign Up" : "Sign In"}</h1>
            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  <div className="inputContainer">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="inputField"
                      required
                    />
                    <label className="inputLabel">Full Name</label>
                  </div>
                  <div className="inputContainer">
                    <input
                      type="tel"
                      name="mobileNumber"
                      placeholder="Mobile Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="inputField"
                      required
                    />
                    <label className="inputLabel">Mobile Number</label>
                  </div>
                  <div className="inputContainer">
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="inputField"
                      required
                    />
                    <label className="inputLabel">E-mail</label>
                  </div>
                  <div className="inputContainer">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="inputField"
                      required
                    />
                    <label className="inputLabel">Password</label>
                  </div>
                  <div className="inputContainer">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="inputField"
                      required
                    />
                    <label className="inputLabel">Confirm Password</label>
                  </div>
                </>
              )}
              {!isSignUp && (
                <>
                  <div className="inputContainer">
                    <input
                      type="text"
                      name="userId"
                      placeholder="E-mail"
                      value={formData.userId}
                      onChange={handleInputChange}
                      className="inputField"
                      required
                    />
                    <label className="inputLabel">E-mail</label>
                  </div>
                  <div className="inputContainer">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="inputField"
                      required
                    />
                    <label className="inputLabel">Password</label>
                  </div>
                </>
              )}
              <button type="submit" className="loginBtn" disabled={false}>
                {isSignUp ? "Sign Up" : "Login"}
              </button>
              <p className="toggleText">
                {isSignUp
                  ? "Already have an account?"
                  : "Don’t have an account?"}
                <span className="toggleLink" onClick={toggleSignUp}>
                  {isSignUp ? "Login here" : "Sign Up here"}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

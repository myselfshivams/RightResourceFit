import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { PulseLoader } from "react-spinners"; // Spinner component
import "../styles/Login.css";

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For button loader
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
    setIsForgotPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate backend call delay
    setTimeout(() => {
      setIsLoading(false);
      toast.error("Internal server error");
    }, 2000);
  };

  const handlePasswordReset = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.error("Internal server error");
    }, 2000);
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(true);
    setIsSignUp(false);
  };

  const goBackToLogin = () => {
    setIsForgotPassword(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bgg">
      <div
        className={`loginPage ${
          isSignUp ? "swipeLeft" : isForgotPassword ? "swipeLeft" : "swipeRight"
        }`}
      >
        <div className="leftSection">
          <img src="/login.png" alt="Hero Image" className="heroImage" />
          <h1>Right Resource Fit</h1>
        </div>

        {!isForgotPassword && (
          <div className="rightSection">
            <div className="loginContainer">
              <h1 className="heading">{isSignUp ? "Register" : "Log In"}</h1>
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
                        name="phoneNumber"
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
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="inputField"
                        required
                      />
                      <label className="inputLabel">Password</label>
                      <span
                        className="eyeIcon"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                    </div>
                    {isSignUp && (
                      <div className="inputContainer">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="inputField"
                          required
                        />
                        <label className="inputLabel">Confirm Password</label>
                        <span
                          className="eyeIcon"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          {showConfirmPassword ? (
                            <AiFillEyeInvisible />
                          ) : (
                            <AiFillEye />
                          )}
                        </span>
                      </div>
                    )}
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
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="inputField"
                        required
                      />
                      <label className="inputLabel">Password</label>
                      <span
                        className="eyeIcon"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <AiFillEyeInvisible />
                        ) : (
                          <AiFillEye />
                        )}
                      </span>
                    </div>
                    <div className="forgotPasswordContainer">
                      <span
                        className="forgotPassword"
                        onClick={toggleForgotPassword}
                      >
                        Forgot Password?
                      </span>
                    </div>
                  </>
                )}
                <button type="submit" className="loginBtn" disabled={isLoading}>
                  {isLoading ? (
                    <PulseLoader color="#fff" size={10} />
                  ) : isSignUp ? (
                    "Sign Up"
                  ) : (
                    "Login"
                  )}
                </button>
                <p className="toggleText">
                  {isSignUp
                    ? "Already have an account? "
                    : "Don’t have an account? "}
                  <span className="toggleLink" onClick={toggleSignUp}>
                    {isSignUp ? "Login here" : "Register here"}
                  </span>
                </p>
              </form>
            </div>
          </div>
        )}

        {isForgotPassword && (
          <div className="rightSection">
            <div className="loginContainer">
              <h1 className="heading">Forgot Password</h1>
              <form onSubmit={handlePasswordReset}>
                <div className="inputContainer">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="inputField"
                    required
                  />
                  <label className="inputLabel">E-mail</label>
                </div>
                <button
                  type="submit"
                  className="loginBtn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <PulseLoader color="#fff" size={10} />
                  ) : (
                    "Send Password Reset Link"
                  )}
                </button>
                <p className="toggleText">
                  Remember your password?{" "}
                  <span className="toggleLink" onClick={goBackToLogin}>
                    Go back to login
                  </span>
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

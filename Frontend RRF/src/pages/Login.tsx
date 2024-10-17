import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { PulseLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    name: "",
    phoneNumber: "",
    email: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const nameRegex = /^[a-zA-Z\s]{3,}$/; 
    const phoneRegex = /^[0-9]{10}$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 

    if (isSignUp) {
      if (!nameRegex.test(formData.name)) {
        toast.error("Name must contain at least 3 characters.");
        return false;
      }
      if (!phoneRegex.test(formData.phoneNumber)) {
        toast.error("Please enter a valid 10-digit phone number.");
        return false;
      }
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        return false;
      }
      if (!passwordRegex.test(formData.password)) {
        toast.error(
          "Password must be at least 8 characters, include an uppercase, lowercase, number, and special character."
        );
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        return false;
      }
    } else {
      if (!emailRegex.test(formData.userId)) {
        toast.error("Please enter a valid email address.");
        return false;
      }
      if (!passwordRegex.test(formData.password)) {
        toast.error(
          "Password must be at least 8 characters, include an uppercase, lowercase, number, and special character."
        );
        return false;
      }
    }

    return true; 
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setIsForgotPassword(false);
  };

  const performApiRequest = async (url: string, data: any, successMessage: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post(url, data);
      setIsLoading(false);

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      toast.success(successMessage);
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      setIsLoading(false);
      const errorMessage = (error as any).response?.data?.message || "Internal server error";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateInputs()) {
      return; 
    }
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/${isSignUp ? "register" : "login"}`;
    const data = isSignUp
      ? { name: formData.name, email: formData.email, password: formData.password, phoneNumber: formData.phoneNumber }
      : { email: formData.userId, password: formData.password };
    performApiRequest(url, data, isSignUp ? "Registered successfully!" : "Logged in successfully!");
  };

  const handlePasswordReset = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/forgot-password`;
    const data = { email: formData.email };
    performApiRequest(url, data, "Password reset link sent!");
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
      <div className={`loginPage ${isSignUp ? "swipeLeft" : isForgotPassword ? "swipeLeft" : "swipeRight"}`}>
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
                    {/* SignUp Fields */}
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
                      <span className="eyeIcon" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                    </div>
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
                      <span className="eyeIcon" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                    </div>
                  </>
                )}
                {!isSignUp && (
                  <>
                    {/* Login Fields */}
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
                      <span className="eyeIcon" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                    </div>
                  </>
                )}
                  {!isSignUp && (
                  <div className="forgotPasswordContainer">
                  <span
                    className="forgotPassword"
                    onClick={toggleForgotPassword}
                  >
                    Forgot Password?
                  </span>
                </div>
                )}
                {isLoading ? (
                  <PulseLoader color="#36d7b7" loading={isLoading} size={10} />
                ) : (
                  <button type="submit" className="loginBtn" disabled={isLoading}>
                  {isLoading ? (
                    <PulseLoader color="#fff" size={10} />
                  ) : isSignUp ? (
                    "Sign Up"
                  ) : (
                    "Login"
                  )}
                </button>
                )}
              
              </form>
              <p className="toggleText">
                  {isSignUp
                    ? "Already have an account? "
                    : "Don’t have an account? "}
                  <span className="toggleLink" onClick={toggleSignUp}>
                    {isSignUp ? "Login here" : "Register here"}
                  </span>
                </p>
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
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="inputField"
                    required
                  />
                  <label className="inputLabel">E-mail</label>
                </div>
                {isLoading ? (
                  <PulseLoader color="#36d7b7" loading={isLoading} size={10} />
                ) : (
                  <button
                  type="submit"
                  className="loginBtn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <PulseLoader color="#fff" size={10} />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
                )}
              </form>
              <p className="toggleText">
                <span className="toggleLink" onClick={goBackToLogin}>
                  Go back to login
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

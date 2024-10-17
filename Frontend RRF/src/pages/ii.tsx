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

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear the error when the user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateInputs = () => {
    const newErrors: any = {};
    const nameRegex = /^[a-zA-Z\s]{3,}$/; // At least 3 characters, letters and spaces only
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password validation

    if (isSignUp) {
      if (!nameRegex.test(formData.name)) {
        newErrors.name = "Name must contain at least 3 characters.";
      }
      if (!phoneRegex.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
      }
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = "Password must be at least 8 characters, include an uppercase, lowercase, number, and special character.";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    } else {
      if (!emailRegex.test(formData.userId)) {
        newErrors.userId = "Please enter a valid email address.";
      }
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = "Password must be at least 8 characters, include an uppercase, lowercase, number, and special character.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
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
      navigate('/dashboard');
      return response.data;
    } catch (error) {
      setIsLoading(false);
      const errorMessage = (error as any).response?.data?.message || "Internal server error";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return; // Do not proceed if validation fails
    }

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/${isSignUp ? 'register' : 'login'}`;
    const data = isSignUp ? { 
      name: formData.name, 
      email: formData.email, 
      password: formData.password, 
      phoneNumber: formData.phoneNumber 
    } : {
      email: formData.userId, 
      password: formData.password
    };

    performApiRequest(url, data, isSignUp ? "Registered successfully!" : "Logged in successfully!");
  };

  const handlePasswordReset = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors({ ...errors, email: "Please enter a valid email address." });
      return;
    }

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/forgot-password`;
    const data = { email: formData.email };
    performApiRequest(url, data, "Password reset link sent!");
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setIsForgotPassword(false);
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
                      {errors.name && <p className="error">{errors.name}</p>}
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
                      {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
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
                      {errors.email && <p className="error">{errors.email}</p>}
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
                      {errors.password && <p className="error">{errors.password}</p>}
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
                      <span
                        className="eyeIcon"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                      {errors.confirmPassword && (
                        <p className="error">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </>
                )}

                {/* Login Fields */}
                {!isSignUp && (
                  <>
                    <div className="inputContainer">
                      <input
                        type="email"
                        name="userId"
                        placeholder="E-mail"
                        value={formData.userId}
                        onChange={handleInputChange}
                        className="inputField"
                        required
                      />
                      <label className="inputLabel">E-mail</label>
                      {errors.email && <p className="error">{errors.email}</p>}
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
                      {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                  </>
                )}

                <button
                  className="submitButton"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <PulseLoader size={8} color="white" /> : isSignUp ? "Sign Up" : "Log In"}
                </button>

                <div className="toggleSection">
                  <span className="toggleText">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    <button
                      className="toggleLink"
                      type="button"
                      onClick={toggleSignUp}
                    >
                      {isSignUp ? "Log In" : "Sign Up"}
                    </button>
                  </span>
                </div>

                {!isSignUp && (
                  <span className="forgotPassword" onClick={toggleForgotPassword}>
                    Forgot password?
                  </span>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Forgot Password Form */}
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
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <button
                  className="submitButton"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <PulseLoader size={8} color="white" /> : "Send Reset Link"}
                </button>

                <div className="toggleSection">
                  <span className="toggleText">
                    <button
                      className="toggleLink"
                      type="button"
                      onClick={goBackToLogin}
                    >
                      Back to Log In
                    </button>
                  </span>
                </div>
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

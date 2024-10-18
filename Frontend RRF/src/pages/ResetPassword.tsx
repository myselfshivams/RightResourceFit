import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { PulseLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { resetToken } = useParams();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(formData.newPassword)) {
      toast.error(
        "Password must be at least 8 characters, include an uppercase, lowercase, number, and special character."
      );
      return false;
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password/${resetToken}`;
    const data = { newPassword: formData.newPassword };

    try {
      setIsLoading(true);
      await axios.post(url, data);
      setIsLoading(false);
      toast.success("Password reset successful! Please log in.");
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        (error as any).response?.data?.message || "Internal server error";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bgg">
      <div className="loginPage swipeRight">
        <div className="leftSection">
          <img src="/login.png" alt="Reset Password" className="heroImage" />
          <h1>Reset Password</h1>
        </div>

        <div className="rightSection">
          <div className="loginContainer">
            <h1 className="heading">Reset Password</h1>
            <form onSubmit={handleSubmit}>
              <div className="inputContainer">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="inputField"
                  required
                />
                <label className="inputLabel">New Password</label>
                <span className="eyeIcon" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <div className="inputContainer">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                  className="inputField"
                  required
                />
                <label className="inputLabel">Confirm New Password</label>
                <span className="eyeIcon" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>

              {isLoading ? (
                <PulseLoader color="#36d7b7" loading={isLoading} size={10} />
              ) : (
                <button type="submit" className="loginBtn" disabled={isLoading}>
                  {isLoading ? (
                    <PulseLoader color="#fff" size={10} />
                  ) : (
                    "Reset Password"
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;

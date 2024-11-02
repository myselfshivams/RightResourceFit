import React from 'react';
import '../styles/Forgot.css';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = React.useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordReset = () => {
    console.log(`Password reset link sent to: ${email}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <span className="closeIcon" onClick={onClose}>
          &times;
        </span>
        <h2>Password Reset</h2>
        <p>Enter your email to receive a password reset link:</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="emailInput"
          required
        />
        <button className="resetButton" onClick={handlePasswordReset}>
          Send Password Reset Link
        </button>
      </div>
    </div>
  );
};

export default PasswordResetModal;

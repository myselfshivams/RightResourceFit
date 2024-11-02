import React, { useState } from 'react';
import '../styles/Contactus.css';
import Navbar from '../components/Navbar3';
import Footer from '../components/Footer3';
import { PulseLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    feedback: '',
  });

  // Regex for validation
  const [isLoading, setIsLoading] = useState(false);
  const nameRegex = /^[a-zA-Z\s]{3,}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    // Validate name
    if (!nameRegex.test(formData.name)) {
      toast.error('Name must contain at least 3 characters.');
      return false;
    }

    // Validate email
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    // Validate phone
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return false;
    }

    // Validate feedback
    if (formData.feedback.trim() === '') {
      toast.error('Feedback cannot be empty.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // API call
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/submit`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );
        setIsLoading(false);
        if (response.ok) {
          toast.success('Feedback submitted successfully');
          setFormData({ name: '', email: '', phone: '', feedback: '' });
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Error submitting feedback:', error);
        toast.error('There was a problem submitting your feedback.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="contact-us-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Enter your feedback"
            />
          </div>
          {isLoading ? (
            <PulseLoader color="#36d7b7" loading={isLoading} size={10} />
          ) : (
            <button type="submit" className="loginBtn" disabled={isLoading}>
              {isLoading ? <PulseLoader color="#fff" size={10} /> : 'Submit'}
            </button>
          )}
          {/* <button type="submit" className="submit-btn">Submit</button> */}
        </form>
      </div>
      <br />
      <br />
      <br />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ContactUs;

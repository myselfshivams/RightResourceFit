import React, { useState } from 'react';
import '../styles/PostJob.css';
import Sidebar from '../components/AdminSidebar';

interface JobFormData {
  title: string;
  description: string;
  location: string;
  skills: string;
  salary: string;
  jobType: string;
}

const PostJobPage: React.FC = () => {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    location: '',
    skills: '',
    salary: '',
    jobType: 'Full-Time', // Default value
  });

  const [errors, setErrors] = useState<JobFormData>({
    title: '',
    description: '',
    location: '',
    skills: '',
    salary: '',
    jobType: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: JobFormData = { ...errors };

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
      valid = false;
    } else {
      newErrors.title = '';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
      valid = false;
    } else {
      newErrors.description = '';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Job location is required';
      valid = false;
    } else {
      newErrors.location = '';
    }

    if (!formData.skills.trim()) {
      newErrors.skills = 'Skills are required';
      valid = false;
    } else {
      newErrors.skills = '';
    }

    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary is required';
      valid = false;
    } else {
      newErrors.salary = '';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Job posted successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        skills: '',
        salary: '',
        jobType: 'Full-Time',
      });
    }
  };

  return (
    <>
      <Sidebar />

      <div className="post-job-page">
        <h1>Post a Job</h1>
        <form className="job-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              className={errors.title ? 'error-input' : ''}
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              className={errors.description ? 'error-input' : ''}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter job location"
              className={errors.location ? 'error-input' : ''}
            />
            {errors.location && <p className="error">{errors.location}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="skills">Required Skills</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Enter required skills (comma-separated)"
              className={errors.skills ? 'error-input' : ''}
            />
            {errors.skills && <p className="error">{errors.skills}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter salary"
              className={errors.salary ? 'error-input' : ''}
            />
            {errors.salary && <p className="error">{errors.salary}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="jobType">Job Type</label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Post Job
          </button>
        </form>
      </div>
    </>
  );
};

export default PostJobPage;

// src/component/auth/RegisterForm.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from 'axios'; // استيراد axios مباشرة هنا

const RegisterForm = ({ showModal, handleClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const requestBody = {
      email: formData.email,
      displayName: `${formData.firstName} ${formData.lastName}`,
      password: formData.password,
    };

    try {
      const response = await axios.post('https://localhost:7251/api/Accounts/Register', requestBody); 
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', response.data.userId); 
        handleClose();
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration.');
      console.error(err);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered size="lg" className="popup">
      <Modal.Header closeButton>
        <Modal.Title>Create an account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-success w-100">
                Create an account
              </button>
              <p className="mt-3 text-center">
                <a href="#">Already have an account</a>
              </p>
            </form>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img src="src/assets/Rectangle 14.svg" alt="Illustration" className="img-fluid" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterForm;

import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ showModal, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Both email and password are required.');
      return;
    }

    setLoading(true);  

    try {
      const response = await axios.post('https://localhost:7251/api/Accounts/Login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.userId);  

        handleClose(); 
        navigate('/home'); 
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred while logging in.');
    } finally {
      setLoading(false);  
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
          <Button 
            variant="success" 
            type="submit" 
            className="w-100" 
            disabled={loading}  
          >
            {loading ? (
              <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginForm;

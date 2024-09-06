import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating an API call
    try {
      // Replace the below code with actual API request
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating network delay
      setMessage('A password reset link has been sent to your email.');
    } catch (error) {
      setMessage('Failed to send reset link. Please try again.');
      console.error('Error resetting password:', error);
    } finally {
      setIsLoading(false);
      setEmail('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Forgot Password</h1>
        <p className="text-center">Please enter your email address to reset your password</p>
        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>
        {message && <p className="text-center mt-3">{message}</p>}
        <p className="text-center mt-3">
          Already have an account? <Link to='/'>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;

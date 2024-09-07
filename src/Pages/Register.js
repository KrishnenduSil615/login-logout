import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const registerData = {
      name,
      email,
      password,
    };

    setIsLoading(true);

    try {
      await addRegisterData(registerData);
      alert('Registration successful!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  async function addRegisterData(registerData) {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBD9-9u9pvywmAD7H6yZmlRWkpK2ZfOVEA',
        {
          method: 'POST',
          body: JSON.stringify({
            email: registerData.email,
            password: registerData.password,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = 'Authentication failed';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        alert(errorMessage);
        throw new Error(errorMessage); // Re-throw to handle it in the calling function
      }
      const data = await response.json();
      console.log('Registration data:', data);
    }

    catch (error) {
      console.error('Error saving registration data:', error);
      throw error; // Re-throw to propagate error to the calling function
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Register</h1>
        <form onSubmit={registerHandler}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={nameChangeHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={emailChangeHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={passwordChangeHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password:</label>
            <input
              type="password"
              name="conf_password"
              className="form-control"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Submit'}
          </button>
        </form>
        {isLoading && (
          <div className="text-center mt-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <p className="text-center mt-4">
          back to login page <Link to='/'>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

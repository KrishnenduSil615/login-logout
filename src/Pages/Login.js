import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return; // Prevent multiple submissions

        setIsLoading(true);
        const loginData = {
            username: Username,
            password: Password,
        };

        try {
            await addLoginData(loginData);
            setUsername('');
            setPassword('');
            navigate('/home');
        } catch (error) {
            console.error('Submission error:', error);
            alert('Login failed. Please check your credentials and try again.');
        } finally {
            setIsLoading(false);
        }
    };
// 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCl8w0uzm4uLhXwpbBfdbfq5VZz8Hk5PE',
    // async function addLoginData(loginData) {
    //     try {
    //       const response = await fetch(
    //         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCl8w0uzm4uLhXwpbBfdbfq5VZz8Hk5PE',
    //         {
    //           method: 'POST',
    //           body: JSON.stringify({
    //             email: loginData.username,
    //             password: loginData.password,
    //             returnSecureToken: true,
    //           }),
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //         }
    //       );
      
    //       if (!response.ok) {
    //         const data = await response.json();
    //         let errorMessage = 'Login failed.';
    //         if (data && data.error && data.error.message) {
    //           errorMessage = data.error.message;
    //         }
    //         alert(errorMessage);
    //         throw new Error(errorMessage);
    //       }
      
    //       const lg_data = await response.json();
    //       console.log('The login data is:', lg_data);
    //     } catch (error) {
    //       console.error('Error saving login data:', error);
    //       throw error;
    //     }
    //   }

    async function addLoginData(loginData) {
        try {
          const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBD9-9u9pvywmAD7H6yZmlRWkpK2ZfOVEA',
            {
              method: 'POST',
              body: JSON.stringify({
                email: loginData.username,  // Ensure this matches the registered email
                password: loginData.password, // Ensure this matches the registered password
                returnSecureToken: true,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
      
          if (!response.ok) {
            const data = await response.json();
            let errorMessage = 'Login failed.';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
            throw new Error(errorMessage);
          }
      
          const lg_data = await response.json();
          console.log('Login successful:', lg_data);
          navigate('/home'); // Redirect on successful login
        } catch (error) {
          console.error('Error logging in:', error);
          throw error;
        }
      }
      
      

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h1 className="text-center mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            value={Username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={Password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {isLoading && (
                    <div className="text-center mt-3">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                <p className="text-center mt-3">
                    Don't have an account? <Link to='/register'>Register</Link><br />
                </p>
                <p className="text-center">
                    Forgot Password? <Link to='/forgotPassword'>Forgot Password</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;

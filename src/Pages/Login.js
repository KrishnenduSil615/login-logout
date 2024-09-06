import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [loginData, setLoginData] = useState({});
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
        const loginDatas = {
            username: Username,
            password: Password,
        };

        try {
            await addLoginData(loginDatas);
            setLoginData(loginDatas);
            setUsername('');
            setPassword('');
            navigate('/home');
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    async function addLoginData(loginData) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // Set a timeout of 10 seconds

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCl8w0uzm4uLhXwpbBfdbfq5VZz8Hk5PE', {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal, // Attach the abort signal
            });

            clearTimeout(timeoutId); // Clear the timeout if the fetch completes

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const lg_data = await response.json();
            console.log('The login data is:', lg_data);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('Request timed out');
            } else {
                console.error('Error saving login data:', error);
            }
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
                            placeholder="Username"
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
                    Don't have an account? <Link to='/register'>Register</Link><br/>
                </p>
                <p className="text-center">
                    Forgot Password ? <Link to='/forgotPassword'>ForgotPassword</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;

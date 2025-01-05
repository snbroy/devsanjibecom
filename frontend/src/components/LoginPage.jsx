import React, { useContext, useState } from 'react';
import { CreateContextApi } from '../context/MyContextApi';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../helper/helper';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const context = useContext(CreateContextApi);
    const { user, setUser} = context;
    const navigate = useNavigate();
    console.log(process.env);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        if (email === '' || password === '') {
            setError('Please fill in all fields');
        } else {
            // Handle successful login
            console.log('Logging in with:', { email, password });

            fetch(`${serverUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('Login response:', data);
                   
                    if (data.sucess === false) {
                        console.log(data.sucess);
                        setError(data.error);
                    } else {
                        setError('');
                        setUser(data);
                        navigate('/account');
                        // Redirect to account page
                        
                    }
                })
                .catch((error) => {
                    console.error('Login error:', error);
                    setError('An error occurred. Please try again later.');
            })

            // Reset fields
            setEmail('');
            setPassword('');
            setError('');
        }
    };

    return (
        <div className="login-page mx-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Email:</label>
                    <input
                        type="text"
                        id="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
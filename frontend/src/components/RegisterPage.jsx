import React, { useState } from 'react';
import { serverUrl } from '../helper/helper';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your registration logic here
        if (email === '' || password === '' || name === '') {
            setError('Please fill in all fields');
        } else {
            // Handle successful registration
            console.log('Registering with:', { email, password, name });
            // Reset fields
            fetch(`${serverUrl}/register`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ name, email, password }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('Registration response:', data);
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setEmail('');
                        setPassword('');
                        setName('');
                        setError('');
                        setUserCreated(true);
                    }
                })
                .catch((error) => {
                    console.error('Registration error:', error);
                    setError('An error occurred. Please try again later.');
                });
            // setEmail('');
            // setPassword('');
            // setFullName('');
            // setError('');
        }
    };

    return (
        <div className='mx-container'>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userCreated && <p style={{ color: 'green' }}>User created successfully!</p>}
            <form onSubmit={handleSubmit} className='auth-form'>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <button type="submit">Register</button>
                <div>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
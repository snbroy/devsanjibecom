import React, { use, useContext, useEffect, useState } from 'react';
import { CreateContextApi } from '../context/MyContextApi';
import { serverUrl } from '../helper/helper';

const AccountPage = () => {
    const context = useContext(CreateContextApi);
    const [userUpdated, setUserUpdated] = useState(false);
    const [error, setError] = useState('');
    const { user } = context;
    const [name, setName] = useState(user?.user?.name);
    const [email, setEmail] = useState(user?.user?.email);
    // Add your account logic here, e.g., fetching user data, etc.

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch(`${serverUrl}/api/auth/updateUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Login response:', data);
               
                if (data.success === false) {
                    setError(data.error);
                } else {
                    setError('');
                    setUserUpdated(true);
                    // Redirect to account page
                    
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
                setError('An error occurred. Please try again later.');
        })
        // Add your account update logic here
    }

    return (
        <div className='account-container'>
            <h2>Account Details</h2>
            <form onSubmit={handleSubmit}>
                {userUpdated && <p style={{ color: 'green' }}>User is updated</p>}
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" value={email} />
                </div>
                <input type="submit" className='button' value="Update" />
            </form>

            {/* Add more user details as needed */}
        </div>
    );
};

export default AccountPage;
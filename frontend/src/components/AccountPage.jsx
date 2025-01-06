import React, { use, useContext, useEffect, useState } from 'react';
import { CreateContextApi } from '../context/MyContextApi';
import { serverUrl } from '../helper/helper';
import './OrderHistoryPage.css'

const AccountPage = () => {
    const context = useContext(CreateContextApi);
    const [userUpdated, setUserUpdated] = useState(false);
    const [error, setError] = useState('');
    const { user } = context;
    const [name, setName] = useState(user?.user?.name);
    const [email, setEmail] = useState(user?.user?.email);
    const [orders, setOrders] = useState([]);
    // Add your account logic here, e.g., fetching user data, etc.

    const userDe = {
        email: user?.user?.email,
        fullName: user?.user?.name,
        // Add more user details as needed
    };

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


        useEffect(() => {
            const fetchOrders = async () => {
                try {
                    const response = await fetch(`${serverUrl}/api/orders/get-orders?email=${email}`);
                    const data = await response.json();
                    if (data.sucess) {
                        setOrders(data.data);
                        console.log(data);
                    } else {
                        setError(data.error);
                    }
                } catch (err) {
                    setError('An error occurred while fetching orders.');
                }
            };
    
            fetchOrders();
        }, []);
    

    return (
        <>
        <div className="account-container">
            <h2>Account Details</h2>
            
            <div className="account-detail">
                <label>Email:</label>
                <p>{userDe.email}</p>
            </div>
            <div className="account-detail">
                <label>Full Name:</label>
                <p>{userDe.fullName}</p>
            </div>
            {/* Add more user details as needed */}

            <div className="order-history-container">
            <h2>Order History</h2>
            {error && <p className="error">{error}</p>}
            {orders.map(order => (
                <div key={order.orderId} className="order">
                    <h3>Order ID: {order.orderId}</h3>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p>Total: Rs. {order.totalPrice}</p>
                    <h4>Items:</h4>
                    <table className="order-items-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderItems.map(item => (
                                <tr key={item._id}>
                                    <td><img src={item.image} width="50px" /></td>
                                    <td>Rs. {item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))} 
        </div>

        </div>
        </>
    );
};

export default AccountPage;
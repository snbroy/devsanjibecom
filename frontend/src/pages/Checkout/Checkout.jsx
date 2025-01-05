import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Adjust the import path as needed
import './Checkout.css';
import { CreateContextApi } from '../../context/MyContextApi';
import toast from 'react-hot-toast';

const Checkout = () => {
    const navigate = useNavigate()
    const { cart } = useSelector((state) => state);
    const context = useContext(CreateContextApi);
    const { setPaymentId } = context;
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });

    const loadRazorpayScript = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    };
    const totalPrice = cart?.reduce((total, product) => total + product.price * product.quantity, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails({ ...billingDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Billing Details:', billingDetails);
        loadRazorpayScript();

        const options = {
            key: 'rzp_test_1DP5mmOlF5G5ag', // Replace with your Razorpay key
            amount: totalPrice * 100, // Amount in paise
            currency: 'INR',
            name: 'DEVSANJIB',
            description: 'Test Transaction',
            image: '/logos/logo.png', // Replace with your logo URL
            handler: function (response) {
                // const orderData = {
                //     'fields': {
                //         "payment_id": response.razorpay_payment_id,
                //         "name": billingDetails.name,
                //         "email": billingDetails.email,
                //         "address": billingDetails.address,
                //         "city": billingDetails.city,
                //         "state": billingDetails.state,
                //         "products": cart,
                //     }
                // }
                // fetch('http://localhost:3200/create-order', {
                //     method: 'post',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: orderData
                // }).then((response) => response.json())
                // .then((responseJson) => {
                //   console.log(responseJson)
                // })
                // .catch((error) => {
                //   console.error(error);
                // });
                setPaymentId(response)
                navigate("/thank-you")
                toast.success(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);

            },
            prefill: {
                name: billingDetails.name,
                email: billingDetails.email,
                contact: '8918132291',
            },
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#e91e63',
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className={`checkout-wrapper`}>
            <div className='mx-container'>
                <h1>Checkout</h1>
                {cart?.length === 0 ? (
                    <p>Your cart is empty. <Link to="/collection/all">Continue Shopping</Link></p>
                ) : (
                    <div className="checkout-container">

                        <div className="checkout-summary">
                            <h2>Billing Details</h2>
                            <form onSubmit={handleSubmit} className="billing-form">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={billingDetails.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={billingDetails.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={billingDetails.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={billingDetails.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={billingDetails.state}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="zip">Zip Code</label>
                                    <input
                                        type="text"
                                        id="zip"
                                        name="zip"
                                        value={billingDetails.zip}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">Country</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={billingDetails.country}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                            </form>
                        </div>
                        <div className="checkout-items-wrap">
                            <div className='checkout-items-content'>
                                {cart?.map((product) => (
                                    <div key={product.id} className="checkout-item">
                                        <img src={product.image} alt={product.title} />
                                        <div className="checkout-item-details">
                                            <h4>{product.title}</h4>
                                            <p>${product.price}</p>
                                            <p>Quantity: {product.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='checkout-summary-items'>
                                <h2>Summary</h2>
                                <p>Total Amount: Rs. {totalPrice?.toFixed(2)}</p>
                                <button type="submit w-full" onClick={handleSubmit} className="submit-button">Submit</button>
                            </div>

                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Checkout;
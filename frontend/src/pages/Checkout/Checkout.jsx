import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Adjust the import path as needed
import './Checkout.css';
import { CreateContextApi } from '../../context/MyContextApi';
import toast from 'react-hot-toast';
import { clearCart } from '../../redux/Slices/CartSlice';
import { serverUrl } from '../../helper/helper';

const Checkout = () => {
    const navigate = useNavigate()
    const { cart } = useSelector((state) => state);
    const context = useContext(CreateContextApi);
    const { setPaymentId } = context;
    const dispatch = useDispatch();
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        phone: '',
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
                const orderObject = {
                    email: billingDetails.email,
                    orderItems: cart,
                    shippingAddress: {
                        address: billingDetails.address,
                        city: billingDetails.city,
                        state: billingDetails.state,
                        zip: billingDetails.zip,
                        country: billingDetails.country,
                        phone: billingDetails.phone,
                    },
                    totalPrice: totalPrice,
                    paymentResult: {
                        id: response.razorpay_payment_id,
                    },
                    customerDetails: {
                        name: billingDetails.name,
                        phone: billingDetails.phone,
                    }
                }

                fetch(`${serverUrl}/api/orders/create-order`, {
                    method: 'post',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(orderObject)
                }).then((response) => response.json())
                    .then((responseJson) => {
                        console.log('Order Response:', responseJson);
                        if (responseJson.sucess === true) {
                            setPaymentId(responseJson.data.orderId)
                            navigate("/thank-you")
                            toast.success(`Payment successful! Order ID: ${responseJson.data.orderId}`);
                            dispatch(clearCart());
                        } else {
                            toast.error('An error occurred. Please try again later.');
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                console.log('Order Object:', orderObject);

            },
            prefill: {
                name: billingDetails.name,
                email: billingDetails.email,
                contact: billingDetails.phone,
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

                                <div className="form-group">
                                    <label htmlFor="country">Phone</label>
                                    <input
                                        type="number"
                                        id="phone"
                                        name="phone"
                                        value={billingDetails.phone}
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
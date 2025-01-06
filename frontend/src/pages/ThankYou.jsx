import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../redux/Slices/CartSlice';
import { CreateContextApi } from '../context/MyContextApi';

const randomOrderNumber = () => {
  return Math.floor(Math.random() * 1000000);
};

const ThankYou = () => {
  const { cart } = useSelector((state) => state);
    const dispatch = useDispatch();
    const context = useContext(CreateContextApi);
    const { setPaymentId } = context;
    useEffect(() => {
        dispatch(clearCart)
        setPaymentId('')
    }, [dispatch]);

    console.log(cart)

  return (
    <div className="thank-you-wrapper">
      <h1>Hi Thank You for Your Order!</h1>
      <p>Your <b>Order Id: {randomOrderNumber()}</b> has been placed successfully. We appreciate your business!</p>
      <Link to="/" className="home-link">Return to Home</Link>
    </div>
  );
};

export default ThankYou;
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CreateContextApi } from '../context/MyContextApi';

const PrivateRoute = ({ children }) => {
  const context = useContext(CreateContextApi);
  const {setPaymentId} = context;

  return setPaymentId !== '' ? children : <Navigate to="/" />;
};

export default PrivateRoute;
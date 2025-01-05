import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CreateContextApi } from '../context/MyContextApi';

const AuthRoute = ({ children }) => {
  const context = useContext(CreateContextApi);
  const {user} = context;

  return user ? children : <Navigate to="/login" />;

  //return setPaymentId !== '' ? children : <Navigate to="/" />;
};

export default AuthRoute;
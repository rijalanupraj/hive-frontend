// External Import
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ auth }) => {
  return auth.isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;

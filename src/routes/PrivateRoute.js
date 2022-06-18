// External Import
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ auth }) => {
  const prevLocation = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate(`/login?redirectTo=${prevLocation.pathname}`, {
        replace: true
      });
    }
  });

  return auth.isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;

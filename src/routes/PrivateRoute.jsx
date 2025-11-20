import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';

const PrivateRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading loading-spinner text-primary"></div>;
  }

  return user ? element : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
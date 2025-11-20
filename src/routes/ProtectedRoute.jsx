import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => (user ? element : <Redirect to="/auth/login" />)}
    />
  );
};

export default ProtectedRoute;

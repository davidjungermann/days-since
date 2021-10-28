import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element, path, authed }) {
  const ele = authed === true ? element : <Navigate to="/login" replace state={{ path }} />;

  return <Route path={path} element={ele} />;
}

export default PrivateRoute;

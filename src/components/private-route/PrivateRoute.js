import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element, path, user }) {
  const isAuthed = () => {
    console.log(user !== null);
    return user !== null;
  };

  const ele = isAuthed() === true ? element : <Navigate to="/login" />;

  return <Route path={path} element={ele} />;
}

export default PrivateRoute;

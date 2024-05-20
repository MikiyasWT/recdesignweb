import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function ProtectedRoute({ children }) {

  const isAuthenticated = cookies.get('authCookies');
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return children;
}
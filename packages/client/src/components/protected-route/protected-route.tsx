import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props: {
  guard: boolean;
  redir: string;
  children: React.ReactNode;
}) => {
  if (!props.guard) {
    return <Navigate to={props.redir} />;
  }
  return props.children;
};

export default ProtectedRoute;

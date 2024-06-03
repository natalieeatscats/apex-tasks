import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  guard,
  redir,
  children
}: {
  guard: boolean;
  redir: string;
  children: React.ReactNode;
}) => {
  if (!guard) {
    return <Navigate to={redir} />;
  }
  return children;
};

export default ProtectedRoute;

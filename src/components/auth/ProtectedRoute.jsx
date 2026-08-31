import React from 'react';
import { ProtectedRoute as ProtectedRouteTSX } from './ProtectedRoute.tsx';

export const ProtectedRoute = (props) => {
  return <ProtectedRouteTSX {...props} />;
};

export default ProtectedRoute;

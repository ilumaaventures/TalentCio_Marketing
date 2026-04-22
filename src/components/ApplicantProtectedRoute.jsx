import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApplicantAuth } from '../context/ApplicantAuthContext';

export default function ApplicantProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useApplicantAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/applicant/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ApplicantProtectedRoute from './components/ApplicantProtectedRoute';
import { ApplicantAuthProvider } from './context/ApplicantAuthContext';
import ApplicantLogin from './pages/ApplicantLogin';
import ApplicantRegister from './pages/ApplicantRegister';
import ApplicantProfile from './pages/ApplicantProfile';
import CompanyLogin from './pages/CompanyLogin';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import DemoRequest from './pages/DemoRequest';
import MyApplications from './pages/MyApplications';
import { trackPageView } from './lib/analytics';

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);

      if (element) {
        window.requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.hash]);

  return null;
}

function AnalyticsPageTracker() {
  const location = useLocation();

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    trackPageView(pagePath);
  }, [location.pathname, location.search, location.hash]);

  return null;
}

function RoutedApp() {
  const location = useLocation();
  const isCompanyLogin = location.pathname === '/company/login';

  return (
    <>
      <ScrollManager />
      <AnalyticsPageTracker />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '16px',
            border: '1px solid #dbe7f8',
            background: '#ffffff',
            color: '#0f172a'
          }
        }}
      />
      {!isCompanyLogin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/demo" element={<DemoRequest />} />
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/applicant/login" element={<ApplicantLogin />} />
        <Route path="/applicant/register" element={<ApplicantRegister />} />
        <Route
          path="/profile"
          element={(
            <ApplicantProtectedRoute>
              <ApplicantProfile />
            </ApplicantProtectedRoute>
          )}
        />
        <Route
          path="/my-applications"
          element={(
            <ApplicantProtectedRoute>
              <MyApplications />
            </ApplicantProtectedRoute>
          )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isCompanyLogin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ApplicantAuthProvider>
        <RoutedApp />
      </ApplicantAuthProvider>
    </Router>
  );
}

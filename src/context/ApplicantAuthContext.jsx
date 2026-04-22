import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import applicantApi from '../api/applicantApi';

const ApplicantAuthContext = createContext(null);

export function ApplicantAuthProvider({ children }) {
  const [applicant, setApplicant] = useState(() => {
    try {
      const storedApplicant = localStorage.getItem('applicant_user');
      return storedApplicant ? JSON.parse(storedApplicant) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('applicant_token') || null);
  const [profileCompletion, setProfileCompletion] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('applicant_token')));

  const persistApplicant = (applicantData) => {
    localStorage.setItem('applicant_user', JSON.stringify(applicantData));
    setApplicant(applicantData);
  };

  const refreshApplicantProfile = async () => {
    const response = await applicantApi.get('/profile');
    persistApplicant(response.data.applicant);
    setProfileCompletion(response.data.completion || null);
    return response.data;
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setProfileCompletion(null);
      return;
    }

    let ignore = false;
    setLoading(true);

    refreshApplicantProfile()
      .then((response) => {
        if (ignore) {
          return;
        }
      })
      .catch(() => {
        if (ignore) {
          return;
        }

        localStorage.removeItem('applicant_token');
        localStorage.removeItem('applicant_user');
        setToken(null);
        setApplicant(null);
        setProfileCompletion(null);
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [token]);

  const login = (tokenValue, applicantData) => {
    localStorage.setItem('applicant_token', tokenValue);
    setToken(tokenValue);
    persistApplicant(applicantData);
  };

  const logout = () => {
    localStorage.removeItem('applicant_token');
    localStorage.removeItem('applicant_user');
    setToken(null);
    setApplicant(null);
    setProfileCompletion(null);
  };

  const setApplicantProfile = (applicantData, completionData = null) => {
    persistApplicant(applicantData);
    if (completionData !== null) {
      setProfileCompletion(completionData);
    }
  };

  const value = useMemo(() => ({
    applicant,
    token,
    profileCompletion,
    loading,
    login,
    logout,
    refreshApplicantProfile,
    setApplicantProfile,
    isLoggedIn: Boolean(applicant)
  }), [applicant, token, profileCompletion, loading]);

  return <ApplicantAuthContext.Provider value={value}>{children}</ApplicantAuthContext.Provider>;
}

export const useApplicantAuth = () => useContext(ApplicantAuthContext);

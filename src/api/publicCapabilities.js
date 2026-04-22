const PUBLIC_JOBS_API_MISSING_KEY = 'talentcio_public_jobs_api_missing';

export const isPublicJobsApiMissing = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.sessionStorage.getItem(PUBLIC_JOBS_API_MISSING_KEY) === '1';
};

export const markPublicJobsApiMissing = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(PUBLIC_JOBS_API_MISSING_KEY, '1');
};

export const clearPublicJobsApiMissing = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.removeItem(PUBLIC_JOBS_API_MISSING_KEY);
};

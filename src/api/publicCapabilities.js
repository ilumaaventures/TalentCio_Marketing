import { getPublicJobsApiMissingKey } from './baseUrl';

export const isPublicJobsApiMissing = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.sessionStorage.getItem(getPublicJobsApiMissingKey()) === '1';
};

export const markPublicJobsApiMissing = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(getPublicJobsApiMissingKey(), '1');
};

export const clearPublicJobsApiMissing = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.removeItem(getPublicJobsApiMissingKey());
};

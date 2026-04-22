import axios from 'axios';
import { resolveApiBaseUrl } from './baseUrl';

const applicantApi = axios.create({
  baseURL: `${resolveApiBaseUrl()}/api/public/applicant`,
  headers: {
    'Content-Type': 'application/json'
  }
});

applicantApi.interceptors.request.use((config) => {
  config.headers = config.headers || {};

  delete config.headers['x-tenant-id'];

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  const token = localStorage.getItem('applicant_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

applicantApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('applicant_token');
      localStorage.removeItem('applicant_user');
    }

    return Promise.reject(error);
  }
);

export default applicantApi;

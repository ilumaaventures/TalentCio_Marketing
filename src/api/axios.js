import axios from 'axios';
import { markPublicJobsApiMissing } from './publicCapabilities';
import { resolveApiBaseUrl } from './baseUrl';

const api = axios.create({
  baseURL: `${resolveApiBaseUrl()}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  delete config.headers['x-tenant-id'];

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';
    const statusCode = error.response?.status;

    if (statusCode === 404 && requestUrl.startsWith('/public/jobs')) {
      markPublicJobsApiMissing();
      return Promise.reject(error);
    }

    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;

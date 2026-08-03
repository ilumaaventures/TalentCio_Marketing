import api from './axios';

/**
 * Submit general candidate application for unlisted positions
 * @param {FormData} formData
 */
export async function submitGeneralApplication(formData) {
  const token = localStorage.getItem('applicant_token');
  const headers = {
    'Content-Type': 'multipart/form-data'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await api.post('/public/general-application', formData, { headers });
  return response.data;
}

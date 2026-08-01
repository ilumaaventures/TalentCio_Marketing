import api from './axios';

/**
 * Submit general candidate application for unlisted positions
 * @param {FormData} formData
 */
export async function submitGeneralApplication(formData) {
  const response = await api.post('/public/general-application', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}

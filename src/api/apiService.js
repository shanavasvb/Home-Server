import axios from 'axios';
import { BASE_URL, API_ENDPOINTS } from './config';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const apiService = {
  login: (credentials) => api.post(API_ENDPOINTS.auth, credentials),
  getFiles: () => api.get(API_ENDPOINTS.files),
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(API_ENDPOINTS.fileUpload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  refreshToken: (refreshToken) => api.post(API_ENDPOINTS.refresh, { refresh: refreshToken }),
  generateUploadToken: (files) => api.post(API_ENDPOINTS.uploadToken, { files }),
  addUserFiles: (data) => api.post(API_ENDPOINTS.addUserFiles, data),
  getUIFlags: () => api.get(API_ENDPOINTS.uiFlag),
  getUserInfo: () => api.get(API_ENDPOINTS.user)
};
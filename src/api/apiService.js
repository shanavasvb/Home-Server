import axios from 'axios';
import { BASE_URL, API_ENDPOINTS } from './config';

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  login: (credentials) => api.post(API_ENDPOINTS.auth, credentials),
  getFiles: () => api.get(API_ENDPOINTS.files),
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(API_ENDPOINTS.fileUpload, formData);
  },
  refreshToken: () => api.post(API_ENDPOINTS.refresh),
  getUIFlags: () => api.get(API_ENDPOINTS.uiFlag),
  getUserInfo: () => api.get(API_ENDPOINTS.user)
};

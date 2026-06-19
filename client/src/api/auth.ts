import apiClient from './client';

export const authApi = {
  register: (data: { email: string; password: string; displayName: string }) =>
    apiClient.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    apiClient.post('/auth/login', data),
  me: () => apiClient.get('/auth/me'),
};

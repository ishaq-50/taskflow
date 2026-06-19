import apiClient from './client';
import type { TaskFilters } from '../types';

export const tasksApi = {
  getAll: (filters?: TaskFilters & { page?: number; limit?: number }) =>
    apiClient.get('/tasks', { params: filters }),
  getById: (id: string) => apiClient.get(`/tasks/${id}`),
  create: (data: { title: string; description?: string; status?: string; priority?: string; dueDate?: string; assigneeId?: string }) =>
    apiClient.post('/tasks', data),
  update: (id: string, data: Record<string, unknown>) =>
    apiClient.patch(`/tasks/${id}`, data),
  delete: (id: string) => apiClient.delete(`/tasks/${id}`),
  addComment: (id: string, content: string) =>
    apiClient.post(`/tasks/${id}/comments`, { content }),
  getLabels: () => apiClient.get('/tasks/labels'),
};

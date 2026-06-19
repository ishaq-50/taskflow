import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import type { Task, TaskState, TaskFilters, Pagination } from '../types';
import { tasksApi } from '../api/tasks';

type TaskAction =
  | { type: 'SET_TASKS'; payload: { tasks: Task[]; pagination: Pagination } }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<TaskFilters> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  filters: {},
  pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
  isLoading: false,
  error: null,
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload.tasks, pagination: action.payload.pagination, isLoading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t) };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

interface TaskContextType {
  state: TaskState;
  fetchTasks: (filters?: TaskFilters & { page?: number }) => Promise<void>;
  createTask: (data: Record<string, unknown>) => Promise<void>;
  updateTask: (id: string, data: Record<string, unknown>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilters: (filters: Partial<TaskFilters>) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = useCallback(async (filters?: TaskFilters & { page?: number }) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { data } = await tasksApi.getAll({ ...state.filters, ...filters });
      dispatch({ type: 'SET_TASKS', payload: data });
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.response?.data?.error || 'Failed to fetch tasks' });
    }
  }, [state.filters]);

  const createTask = async (data: Record<string, unknown>) => {
    const { data: task } = await tasksApi.create(data as any);
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const updateTask = async (id: string, data: Record<string, unknown>) => {
    const { data: task } = await tasksApi.update(id, data);
    dispatch({ type: 'UPDATE_TASK', payload: task });
  };

  const deleteTask = async (id: string) => {
    await tasksApi.delete(id);
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const setFilters = (filters: Partial<TaskFilters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  return (
    <TaskContext.Provider value={{ state, fetchTasks, createTask, updateTask, deleteTask, setFilters }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
}

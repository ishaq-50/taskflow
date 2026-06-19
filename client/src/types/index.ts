export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  creatorId: string;
  creator: Pick<User, 'id' | 'displayName' | 'avatarUrl'>;
  assigneeId?: string;
  assignee?: Pick<User, 'id' | 'displayName' | 'avatarUrl'>;
  labels: Label[];
  _count?: { comments: number };
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: Pick<User, 'id' | 'displayName' | 'avatarUrl'>;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TaskFilters {
  status?: string;
  priority?: string;
  assigneeId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  filters: TaskFilters;
  pagination: Pagination;
  isLoading: boolean;
  error: string | null;
}

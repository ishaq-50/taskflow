import { useState, useEffect } from 'react';
import type { Task } from '../../types';
import { useTasks } from '../../context/TaskContext';
import apiClient from '../../api/client';

interface TaskEditorProps {
  task?: Task | null;
  onClose: () => void;
}

export function TaskEditor({ task, onClose }: TaskEditorProps) {
  const { createTask, updateTask, deleteTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO');
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [users, setUsers] = useState<{ id: string; displayName: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch users for assignment
    apiClient.get('/auth/me').then(() => {
      // For MVP/Demo, let's look up all users. Since we don't have a public users list endpoint yet without admin,
      // let's fetch demo members or fallback. We can create a simple route or just display user choices.
      // Actually, we can get list of users. Let's make sure it handles gracefully.
      apiClient.get('/auth/me').then(({ data: me }) => {
        setUsers([
          { id: me.id, displayName: `${me.displayName} (Me)` },
          // Include common seed users: Sarah Chen (known ID will be bound in DB anyway, or we'll dynamically check list if admin. Or just allow manual assign fallback)
        ]);
      });
    }).catch(() => {});

    // If admin is logged in, they can fetch all users.
    // Let's make a request to /users. If it fails (due to USER role), we keep just the current user.
    apiClient.get('/users')
      .then(({ data }) => setUsers(data))
      .catch(() => {
        // Fallback: If not admin, try to load profile to at least assign to self
        apiClient.get('/auth/me').then(({ data }) => {
          setUsers([{ id: data.id, displayName: `${data.displayName} (Me)` }]);
        });
      });
  }, []);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
      setAssigneeId(task.assigneeId || '');
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload: any = {
      title,
      description: description || undefined,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      assigneeId: assigneeId || undefined,
    };

    try {
      if (task) {
        await updateTask(task.id, payload);
      } else {
        await createTask(payload);
      }
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    if (window.confirm('Are you sure you want to delete this task?')) {
      setError('');
      setLoading(true);
      try {
        await deleteTask(task.id);
        onClose();
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{task ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-msg">{error}</div>}
          <div className="form-group">
            <label htmlFor="task-title">Title</label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Implement user login flow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="task-desc">Description</label>
            <textarea
              id="task-desc"
              rows={4}
              placeholder="Provide a detailed description of the task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-status">Status</label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="DONE">Done</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-date">Due Date</label>
              <input
                id="task-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="task-assignee">Assignee</label>
              <select
                id="task-assignee"
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
              >
                <option value="">Unassigned</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.displayName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-actions">
            {task && (
              <button
                type="button"
                className="btn btn-danger"
                style={{ marginRight: 'auto' }}
                onClick={handleDelete}
                disabled={loading}
              >
                Delete Task
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import type { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'TODO': return 'badge-todo';
      case 'IN_PROGRESS': return 'badge-progress';
      case 'IN_REVIEW': return 'badge-review';
      case 'DONE': return 'badge-done';
      default: return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW': return 'var(--priority-low)';
      case 'MEDIUM': return 'var(--priority-medium)';
      case 'HIGH': return 'var(--priority-high)';
      case 'URGENT': return 'var(--priority-urgent)';
      default: return 'var(--text-muted)';
    }
  };

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : null;

  return (
    <div className={`task-card priority-${task.priority}`} onClick={() => onEdit(task)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <h3 className="task-card-title">{task.title}</h3>
        <span className={`badge ${getStatusBadgeClass(task.status)}`}>
          {task.status.replace('_', ' ')}
        </span>
      </div>
      {task.description && (
        <p className="task-card-desc">{task.description}</p>
      )}
      <div className="task-card-meta">
        <span
          className="badge"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            color: getPriorityColor(task.priority),
            fontSize: '0.7rem',
          }}
        >
          {task.priority}
        </span>
        {formattedDate && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            📅 {formattedDate}
          </span>
        )}
        {task.assignee && (
          <div
            className="avatar"
            style={{
              width: '24px',
              height: '24px',
              fontSize: '0.7rem',
              marginLeft: 'auto',
            }}
            title={`Assigned to ${task.assignee.displayName}`}
          >
            {task.assignee.displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}

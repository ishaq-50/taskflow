import { TaskCard } from './TaskCard';
import type { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
}

export function TaskList({ tasks, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div style={{ padding: '40px 32px', textAlign: 'center', color: 'var(--text-muted)' }}>
        No tasks found matching current filters.
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
}

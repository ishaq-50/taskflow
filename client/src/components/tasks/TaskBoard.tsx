import { TaskCard } from './TaskCard';
import type { Task, TaskStatus } from '../../types';

interface TaskBoardProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
}

const COLUMNS: { id: TaskStatus; title: string; color: string }[] = [
  { id: 'TODO', title: 'Todo', color: 'var(--status-todo)' },
  { id: 'IN_PROGRESS', title: 'In Progress', color: 'var(--status-progress)' },
  { id: 'IN_REVIEW', title: 'In Review', color: 'var(--status-review)' },
  { id: 'DONE', title: 'Done', color: 'var(--status-done)' },
];

export function TaskBoard({ tasks, onEdit }: TaskBoardProps) {
  return (
    <div className="kanban-board">
      {COLUMNS.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.id);
        return (
          <div key={col.id} className="kanban-column">
            <div className="kanban-column-header">
              <span
                className="kanban-column-dot"
                style={{ backgroundColor: col.color }}
              ></span>
              <h3 className="kanban-column-title">{col.title}</h3>
              <span className="kanban-column-count">{colTasks.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '150px' }}>
              {colTasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={onEdit} />
              ))}
              {colTasks.length === 0 && (
                <div
                  style={{
                    border: '1px dashed var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px 16px',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                  }}
                >
                  Empty column
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

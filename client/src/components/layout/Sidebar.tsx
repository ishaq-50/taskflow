import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { state: authState, logout } = useAuth();
  const { state: taskState, setFilters, fetchTasks } = useTasks();

  const handleStatusFilter = (status?: string) => {
    setFilters({ status });
    fetchTasks({ status });
    setIsOpen(false);
  };

  const handlePriorityFilter = (priority?: string) => {
    setFilters({ priority });
    fetchTasks({ priority });
    setIsOpen(false);
  };

  const initials = authState.user?.displayName
    ? authState.user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U';

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">TaskFlow</div>
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${!taskState.filters.status && !taskState.filters.priority ? 'active' : ''}`}
          onClick={() => {
            setFilters({ status: undefined, priority: undefined });
            fetchTasks({ status: undefined, priority: undefined });
            setIsOpen(false);
          }}
        >
          All Tasks
        </button>

        <div style={{ margin: '16px 0 8px', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, padding: '0 12px' }}>
          Statuses
        </div>
        <button
          className={`nav-item ${taskState.filters.status === 'TODO' ? 'active' : ''}`}
          onClick={() => handleStatusFilter('TODO')}
        >
          <span className="kanban-column-dot" style={{ backgroundColor: 'var(--status-todo)' }}></span>
          Todo
        </button>
        <button
          className={`nav-item ${taskState.filters.status === 'IN_PROGRESS' ? 'active' : ''}`}
          onClick={() => handleStatusFilter('IN_PROGRESS')}
        >
          <span className="kanban-column-dot" style={{ backgroundColor: 'var(--status-progress)' }}></span>
          In Progress
        </button>
        <button
          className={`nav-item ${taskState.filters.status === 'IN_REVIEW' ? 'active' : ''}`}
          onClick={() => handleStatusFilter('IN_REVIEW')}
        >
          <span className="kanban-column-dot" style={{ backgroundColor: 'var(--status-review)' }}></span>
          In Review
        </button>
        <button
          className={`nav-item ${taskState.filters.status === 'DONE' ? 'active' : ''}`}
          onClick={() => handleStatusFilter('DONE')}
        >
          <span className="kanban-column-dot" style={{ backgroundColor: 'var(--status-done)' }}></span>
          Done
        </button>

        <div style={{ margin: '16px 0 8px', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, padding: '0 12px' }}>
          Priorities
        </div>
        <button
          className={`nav-item ${taskState.filters.priority === 'URGENT' ? 'active' : ''}`}
          onClick={() => handlePriorityFilter('URGENT')}
        >
          Urgent
        </button>
        <button
          className={`nav-item ${taskState.filters.priority === 'HIGH' ? 'active' : ''}`}
          onClick={() => handlePriorityFilter('HIGH')}
        >
          High
        </button>
        <button
          className={`nav-item ${taskState.filters.priority === 'MEDIUM' ? 'active' : ''}`}
          onClick={() => handlePriorityFilter('MEDIUM')}
        >
          Medium
        </button>
        <button
          className={`nav-item ${taskState.filters.priority === 'LOW' ? 'active' : ''}`}
          onClick={() => handlePriorityFilter('LOW')}
        >
          Low
        </button>
      </nav>

      <div className="sidebar-user">
        <div className="avatar">{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {authState.user?.displayName}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {authState.user?.email}
          </div>
        </div>
        <button className="btn btn-ghost" onClick={logout} title="Sign Out">
          🚪
        </button>
      </div>
    </aside>
  );
}

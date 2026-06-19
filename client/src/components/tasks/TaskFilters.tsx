import { useTasks } from '../../context/TaskContext';

export function TaskFilters() {
  const { state, setFilters, fetchTasks } = useTasks();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value || undefined;
    setFilters({ search });
    fetchTasks({ search });
  };

  const handleSelectChange = (field: 'status' | 'priority' | 'sortBy' | 'sortOrder') => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || undefined;
    setFilters({ [field]: value });
    fetchTasks({ [field]: value });
  };

  return (
    <div className="filters-bar">
      <input
        type="text"
        placeholder="Search tasks..."
        className="search-input"
        value={state.filters.search || ''}
        onChange={handleSearchChange}
      />
      <div className="filter-group">
        <label htmlFor="filter-status">Status</label>
        <select
          id="filter-status"
          value={state.filters.status || ''}
          onChange={handleSelectChange('status')}
        >
          <option value="">All Statuses</option>
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="IN_REVIEW">In Review</option>
          <option value="DONE">Done</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="filter-priority">Priority</label>
        <select
          id="filter-priority"
          value={state.filters.priority || ''}
          onChange={handleSelectChange('priority')}
        >
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="filter-sort">Sort By</label>
        <select
          id="filter-sort"
          value={state.filters.sortBy || ''}
          onChange={handleSelectChange('sortBy')}
        >
          <option value="createdAt">Created Date</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
}

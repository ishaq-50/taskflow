import { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { AppLayout } from '../components/layout/AppLayout';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { TaskList } from '../components/tasks/TaskList';
import { TaskBoard } from '../components/tasks/TaskBoard';
import { TaskEditor } from '../components/tasks/TaskEditor';
import type { Task } from '../types';

export function DashboardPage() {
  const { state, fetchTasks } = useTasks();
  const [viewMode, setViewMode] = useState<'list' | 'board'>('board');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setEditorOpen(true);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setEditorOpen(true);
  };

  // Calculate task counts
  const totalTasks = state.tasks.length;
  const todoTasks = state.tasks.filter(t => t.status === 'TODO').length;
  const progressTasks = state.tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const doneTasks = state.tasks.filter(t => t.status === 'DONE').length;

  return (
    <AppLayout
      onAddTask={handleCreateTask}
      viewMode={viewMode}
      setViewMode={setViewMode}
    >
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--status-todo)' }}>{todoTasks}</div>
          <div className="stat-label">To Do</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--status-progress)' }}>{progressTasks}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--status-done)' }}>{doneTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      <TaskFilters />

      {state.isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {viewMode === 'list' ? (
            <TaskList tasks={state.tasks} onEdit={handleEditTask} />
          ) : (
            <TaskBoard tasks={state.tasks} onEdit={handleEditTask} />
          )}
        </>
      )}

      {editorOpen && (
        <TaskEditor
          task={editingTask}
          onClose={() => {
            setEditorOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </AppLayout>
  );
}

interface HeaderProps {
  onMenuToggle: () => void;
  onAddTask: () => void;
  viewMode: 'list' | 'board';
  setViewMode: (mode: 'list' | 'board') => void;
}

export function Header({ onMenuToggle, onAddTask, viewMode, setViewMode }: HeaderProps) {
  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle Sidebar">
          ☰
        </button>
        <h1 className="header-title">TaskFlow</h1>
      </div>
      <div className="header-actions">
        <div className="view-toggle">
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
          <button
            className={viewMode === 'board' ? 'active' : ''}
            onClick={() => setViewMode('board')}
          >
            Board
          </button>
        </div>
        <button className="btn btn-primary" onClick={onAddTask}>
          <span style={{ fontSize: '1.2rem', lineHeight: 0, marginTop: '-2px' }}>+</span> New Task
        </button>
      </div>
    </header>
  );
}

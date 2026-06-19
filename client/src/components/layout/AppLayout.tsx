import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
  onAddTask: () => void;
  viewMode: 'list' | 'board';
  setViewMode: (mode: 'list' | 'board') => void;
}

export function AppLayout({ children, onAddTask, viewMode, setViewMode }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 90,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="main-content">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onAddTask={onAddTask}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        <main>{children}</main>
      </div>
    </div>
  );
}

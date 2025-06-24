import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath={currentPath} />
      <div className="lg:ml-64">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
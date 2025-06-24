import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const menuItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/students', icon: Users, label: 'Students' },
    { path: '/subjects', icon: BookOpen, label: 'Subjects' },
    { path: '/results', icon: FileText, label: 'Results' },
    { path: '/reports', icon: BarChart3, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform lg:translate-x-0 lg:static lg:inset-0">
      <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-white" />
          <span className="text-lg font-bold text-white">Result Management System</span>
        </div>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-3 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
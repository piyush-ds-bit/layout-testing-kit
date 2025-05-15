
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const sidebarItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Edit Hero', path: '/admin/hero' },
  { label: 'Manage Skills', path: '/admin/skills' },
  { label: 'Manage Experience', path: '/admin/experience' },
  { label: 'Manage Projects', path: '/admin/projects' },
  { label: 'Contact Messages', path: '/admin/messages' },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  return (
    <div className="w-64 bg-portfolio-darker border-r border-portfolio-dark h-full overflow-y-auto hidden md:block">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2 text-white mb-8">
          <span className="text-xl font-semibold">Admin Panel</span>
        </Link>
        
        <div className="space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center py-2 px-4 rounded-lg ${
                location.pathname === item.path
                  ? 'bg-portfolio-accent text-white'
                  : 'text-portfolio-gray-light hover:bg-portfolio-dark'
              } transition-colors`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-portfolio-dark">
          <Button
            onClick={() => signOut()}
            className="w-full bg-portfolio-dark text-portfolio-gray-light hover:bg-portfolio-card-bg"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

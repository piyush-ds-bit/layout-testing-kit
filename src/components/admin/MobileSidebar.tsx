
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const sidebarItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Edit Hero', path: '/admin/hero' },
  { label: 'Manage Skills', path: '/admin/skills' },
  { label: 'Manage Experience', path: '/admin/experience' },
  { label: 'Manage Projects', path: '/admin/projects' },
  { label: 'Contact Messages', path: '/admin/messages' },
];

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-portfolio-darker border-r border-portfolio-dark overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="text-xl font-semibold text-white">Admin Panel</div>
          </div>
          
          <div className="mb-6">
            <div className="text-sm text-portfolio-gray-light">
              Signed in as <span className="text-white">{user?.email}</span>
            </div>
          </div>
          
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
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;

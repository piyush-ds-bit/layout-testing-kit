
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface AdminHeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { user, signOut } = useAuth();
  
  return (
    <header className="bg-portfolio-darker border-b border-portfolio-dark">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-portfolio-gray-light hover:text-white rounded-lg"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          
          <div className="ml-3 md:hidden">
            <span className="text-lg font-semibold text-white">Admin Panel</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <div className="text-sm text-portfolio-gray-light">
              Signed in as <span className="text-white">{user?.email}</span>
            </div>
          </div>
          
          <Link to="/" className="text-sm text-portfolio-accent hover:text-portfolio-accent-dark">
            View Site
          </Link>
          
          <div className="md:hidden">
            <Button
              onClick={() => signOut()}
              variant="outline"
              size="sm"
              className="border-portfolio-dark text-portfolio-gray-light"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

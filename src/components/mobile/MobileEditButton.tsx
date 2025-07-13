import React from 'react';
import { Edit } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';

const MobileEditButton: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode, toggleEditMode } = useAdminEdit();

  if (!isAuthorized) return null;

  return (
    <button 
      onClick={toggleEditMode}
      className={`fixed top-4 left-4 z-50 w-12 h-12 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 md:hidden ${
        isEditMode 
          ? 'bg-portfolio-accent border-portfolio-accent text-white' 
          : 'bg-portfolio-card-bg/90 border-portfolio-accent/30 text-portfolio-accent hover:bg-portfolio-accent hover:text-white'
      }`}
    >
      <Edit className="w-5 h-5" />
    </button>
  );
};

export default MobileEditButton;
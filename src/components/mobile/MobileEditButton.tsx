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
      className={`md:hidden w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center shadow-sm transition-all duration-300 ${
        isEditMode 
          ? 'bg-primary/20 border-primary/40 text-primary' 
          : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20'
      }`}
      aria-label="Toggle edit mode"
    >
      <Edit className="w-5 h-5" />
    </button>
  );
};

export default MobileEditButton;
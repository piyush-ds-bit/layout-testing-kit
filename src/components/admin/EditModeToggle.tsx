
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import { Edit } from 'lucide-react';

const EditModeToggle: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode, toggleEditMode } = useAdminEdit();

  if (!isAuthorized) return null;

  return (
    <div className="flex items-center space-x-2 ml-4">
      <Edit className="w-4 h-4 text-portfolio-accent" />
      <span className="text-sm text-portfolio-gray-light">Edit Mode</span>
      <Switch
        checked={isEditMode}
        onCheckedChange={toggleEditMode}
        className="data-[state=checked]:bg-portfolio-accent"
      />
    </div>
  );
};

export default EditModeToggle;

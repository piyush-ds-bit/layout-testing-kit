
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import { Switch } from '@/components/ui/switch';
import { Edit3 } from 'lucide-react';

const EditModeToggle: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode, toggleEditMode } = useAdminEdit();

  if (!isAuthorized) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-portfolio-card-bg border border-portfolio-border rounded-lg p-3 shadow-lg">
      <div className="flex items-center space-x-2">
        <Edit3 className="w-4 h-4 text-portfolio-accent" />
        <span className="text-sm text-white">Edit Mode</span>
        <Switch
          checked={isEditMode}
          onCheckedChange={toggleEditMode}
          className="data-[state=checked]:bg-portfolio-accent"
        />
      </div>
    </div>
  );
};

export default EditModeToggle;

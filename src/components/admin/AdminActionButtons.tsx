
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import { Edit, Trash2 } from 'lucide-react';

interface AdminActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

const AdminActionButtons: React.FC<AdminActionButtonsProps> = ({ 
  onEdit, 
  onDelete, 
  className = "" 
}) => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();

  if (!isAuthorized || !isEditMode) return null;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        onClick={onEdit}
        variant="outline"
        size="sm"
        className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        onClick={onDelete}
        variant="outline"
        size="sm"
        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default AdminActionButtons;


import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import { Plus } from 'lucide-react';

interface AdminAddButtonProps {
  onAdd: () => void;
  label: string;
  className?: string;
}

const AdminAddButton: React.FC<AdminAddButtonProps> = ({ 
  onAdd, 
  label, 
  className = "" 
}) => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();

  if (!isAuthorized || !isEditMode) return null;

  return (
    <Button
      onClick={onAdd}
      className={`bg-portfolio-accent hover:bg-portfolio-accent-dark text-white ${className}`}
    >
      <Plus className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
};

export default AdminAddButton;

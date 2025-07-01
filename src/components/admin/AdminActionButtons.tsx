
import React from 'react';
import { useAdminEdit } from '@/context/AdminEditContext';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminActionButtonsProps {
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showAdd?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  className?: string;
}

const AdminActionButtons: React.FC<AdminActionButtonsProps> = ({
  onAdd,
  onEdit,
  onDelete,
  showAdd = false,
  showEdit = false,
  showDelete = false,
  className
}) => {
  const { canEdit } = useAdminEdit();

  if (!canEdit) return null;

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {showAdd && onAdd && (
        <Button
          onClick={onAdd}
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      )}
      {showEdit && onEdit && (
        <Button
          onClick={onEdit}
          size="sm"
          variant="outline"
          className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white"
        >
          <Edit className="w-4 h-4" />
        </Button>
      )}
      {showDelete && onDelete && (
        <Button
          onClick={onDelete}
          size="sm"
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default AdminActionButtons;

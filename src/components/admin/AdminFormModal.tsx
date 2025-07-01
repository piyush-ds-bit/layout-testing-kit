
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
  isLoading?: boolean;
}

const AdminFormModal: React.FC<AdminFormModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = "Save",
  isLoading = false
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-portfolio-card-bg border-portfolio-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-xl">{title}</DialogTitle>
            <Button
              onClick={onClose}
              size="sm"
              variant="ghost"
              className="text-portfolio-gray-light hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {children}
          
          {onSubmit && (
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                onClick={onClose}
                variant="outline"
                className="border-portfolio-gray text-portfolio-gray-light"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={onSubmit}
                className="bg-portfolio-accent hover:bg-portfolio-accent-dark"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : submitLabel}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminFormModal;


import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

interface AdminEditContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  canEdit: boolean;
}

const AdminEditContext = createContext<AdminEditContextType | undefined>(undefined);

export const AdminEditProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { isAuthorized } = useAuth();

  const toggleEditMode = () => {
    if (isAuthorized) {
      setIsEditMode(!isEditMode);
    }
  };

  const canEdit = isAuthorized && isEditMode;

  return (
    <AdminEditContext.Provider value={{ isEditMode, toggleEditMode, canEdit }}>
      {children}
    </AdminEditContext.Provider>
  );
};

export const useAdminEdit = () => {
  const context = useContext(AdminEditContext);
  if (context === undefined) {
    throw new Error('useAdminEdit must be used within an AdminEditProvider');
  }
  return context;
};

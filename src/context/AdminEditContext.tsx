
import React, { createContext, useContext, useState } from 'react';

interface AdminEditContextType {
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  toggleEditMode: () => void;
}

const AdminEditContext = createContext<AdminEditContextType | undefined>(undefined);

export const AdminEditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  return (
    <AdminEditContext.Provider value={{ isEditMode, setIsEditMode, toggleEditMode }}>
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

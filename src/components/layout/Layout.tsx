
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import RoamingBug from '@/components/bug/RoamingBug';
import { AdminEditProvider } from '@/context/AdminEditContext';
import EditModeToggle from '@/components/admin/EditModeToggle';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Use the visitor tracking hook
  useVisitorTracking();
  
  return (
    <AdminEditProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <EditModeToggle />
        <main className="flex-grow pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <RoamingBug />
      </div>
    </AdminEditProvider>
  );
};

export default Layout;

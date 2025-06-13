
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Use the visitor tracking hook
  useVisitorTracking();
  
  return (
    <div className="flex flex-col min-h-screen bg-[#0c111d]">
      <Navbar />
      <main className="flex-grow pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

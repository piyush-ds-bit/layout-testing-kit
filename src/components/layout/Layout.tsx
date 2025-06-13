
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pb-16 md:pb-0 bg-gradient-to-br from-[#0c111d] via-[#0f1624] to-[#111827]">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

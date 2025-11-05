import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import RoamingBug from '@/components/bug/RoamingBug';
import ScrollToTopButton from '@/components/mobile/ScrollToTopButton';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Use the visitor tracking hook
  useVisitorTracking();
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <RoamingBug />
      {!isMobile && <ScrollToTopButton />}
    </div>
  );
};

export default Layout;

import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LeftSidebar from './LeftSidebar';
import RightInfoPanel from './RightInfoPanel';
import RoamingBug from '@/components/bug/RoamingBug';
import MobileLoginButton from '@/components/mobile/MobileLoginButton';
import MobileEditButton from '@/components/mobile/MobileEditButton';
import ScrollToTopButton from '@/components/mobile/ScrollToTopButton';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import ChatInterface from '@/components/chatbot/ChatInterface';
import MessagesButton from './MessagesButton';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  useVisitorTracking();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Desktop 3-column layout */}
      <div className="flex flex-1">
        {/* Left Sidebar - hidden on mobile/tablet */}
        <LeftSidebar />
        
        {/* Main Content - properly constrained between fixed sidebars */}
        <main className="flex-grow pb-16 md:pb-0 lg:ml-[240px] lg:mr-[300px] w-full lg:w-[calc(100%-540px)]">
          <div className="w-full">
            {children}
          </div>
        </main>
        
        {/* Right Info Panel - hidden on mobile/tablet */}
        <RightInfoPanel />
      </div>
      
      <Footer />
      
      {/* Floating elements */}
      <RoamingBug />
      <MobileLoginButton />
      <MobileEditButton />
      <ScrollToTopButton />
      <MessagesButton />
      <ChatbotButton onClick={() => setIsChatOpen(true)} />
      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default DashboardLayout;

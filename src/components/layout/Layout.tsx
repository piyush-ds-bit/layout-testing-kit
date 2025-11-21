
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import RoamingBug from '@/components/bug/RoamingBug';
import MobileLoginButton from '@/components/mobile/MobileLoginButton';
import MobileEditButton from '@/components/mobile/MobileEditButton';
import ScrollToTopButton from '@/components/mobile/ScrollToTopButton';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import ChatInterface from '@/components/chatbot/ChatInterface';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Use the visitor tracking hook
  useVisitorTracking();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <RoamingBug />
      <MobileLoginButton />
      <MobileEditButton />
      <ScrollToTopButton />
      <ChatbotButton onClick={() => setIsChatOpen(true)} />
      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Layout;

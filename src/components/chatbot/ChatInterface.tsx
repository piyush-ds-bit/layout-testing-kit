import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatbot } from '@/hooks/useChatbot';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import QuickActions from './QuickActions';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const { messages, isTyping, sendMessage, clearConversation } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleClear = () => {
    if (confirm('Clear this conversation?')) {
      clearConversation();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
            />
          )}
          
          {/* Chat window */}
          <motion.div
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.9, y: 20 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-[70] flex flex-col bg-card/95 backdrop-blur-xl border border-border/50 shadow-2xl ${
              isMobile 
                ? 'inset-x-0 bottom-0 top-[10%] rounded-t-2xl' 
                : 'bottom-24 right-6 w-[400px] h-[600px] rounded-lg'
            }`}
          >
            <ChatHeader onClose={onClose} onClear={handleClear} />
            
            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500">
                    <span className="text-white text-xs">🤖</span>
                  </div>
                  <TypingIndicator />
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Quick actions (shown when conversation starts) */}
            {messages.length <= 1 && !isTyping && (
              <QuickActions onActionClick={sendMessage} />
            )}
            
            {/* Input */}
            <ChatInput onSend={sendMessage} disabled={isTyping} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatInterface;

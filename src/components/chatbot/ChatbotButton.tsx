import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatbotButtonProps {
  onClick: () => void;
  hasUnread?: boolean;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick, hasUnread = false }) => {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-24 md:bottom-6 right-6 z-50 group"
      aria-label="Open chat"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-portfolio-accent to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
        
        {/* Button */}
        <div className="relative bg-gradient-to-r from-portfolio-accent to-purple-500 p-4 rounded-full shadow-lg">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        
        {/* Unread badge */}
        {hasUnread && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-portfolio-dark animate-pulse" />
        )}
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-portfolio-dark/90 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Ask me anything! 💬
        </div>
      </div>
      
      {/* Pulse animation */}
      <motion.div
        className="absolute inset-0 bg-portfolio-accent rounded-full"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </motion.button>
  );
};

export default ChatbotButton;

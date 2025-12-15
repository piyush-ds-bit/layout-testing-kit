import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const MessagesButton: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();

  // Only render for admins
  if (!isAuthorized) {
    return null;
  }

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/contact-messages')}
      className="fixed bottom-48 md:bottom-20 lg:right-[316px] right-4 z-50 group"
      aria-label="View messages"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
        
        {/* Button */}
        <div className="relative bg-gradient-to-r from-blue-500 to-cyan-400 p-4 rounded-full shadow-lg">
          <Mail className="w-6 h-6 text-white" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-portfolio-dark/90 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Contact Messages 📩
        </div>
      </div>
    </motion.button>
  );
};

export default MessagesButton;

import React from 'react';
import { motion } from 'framer-motion';
import { quickActions } from '@/data/chatbotKnowledge';

interface QuickActionsProps {
  onActionClick: (message: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-2">
      {quickActions.map((action, index) => (
        <motion.button
          key={action.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onActionClick(action.message)}
          className="px-3 py-1.5 text-xs bg-secondary/80 hover:bg-secondary text-secondary-foreground rounded-full border border-border/50 transition-colors"
        >
          {action.label}
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;

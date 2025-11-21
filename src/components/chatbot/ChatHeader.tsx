import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  onClose: () => void;
  onClear: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose, onClear }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-portfolio-accent to-purple-500 text-white rounded-t-lg">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <div>
          <h3 className="font-semibold">Piyush's AI Assistant</h3>
          <p className="text-xs opacity-90">Always ready to help</p>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-white hover:bg-white/20"
          title="Clear conversation"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;

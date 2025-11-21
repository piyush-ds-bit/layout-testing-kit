import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 p-4 border-t border-border/50 bg-background/50">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none bg-secondary/50 text-foreground placeholder:text-muted-foreground border border-border/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-portfolio-accent min-h-[40px] max-h-[120px]"
        style={{ 
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent'
        }}
      />
      
      <Button
        onClick={handleSend}
        disabled={!input.trim() || disabled}
        className="bg-gradient-to-r from-portfolio-accent to-purple-500 hover:from-portfolio-accent-dark hover:to-purple-600 text-white rounded-lg h-[40px] w-[40px] p-0 flex items-center justify-center"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ChatInput;

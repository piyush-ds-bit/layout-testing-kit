import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content, timestamp }) => {
  const isUser = role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-gradient-to-br from-portfolio-accent to-purple-500' 
          : 'bg-gradient-to-br from-blue-500 to-cyan-500'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      
      {/* Message bubble */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
        <div className={`px-4 py-2 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-r from-portfolio-accent to-purple-500 text-white rounded-br-sm' 
            : 'bg-background/50 text-foreground rounded-bl-sm border border-border/50'
        }`}>
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap">{content}</p>
          ) : (
            <div className="text-sm prose prose-sm dark:prose-invert prose-p:my-2 prose-headings:my-2 prose-ul:my-2 prose-li:my-0">
              <ReactMarkdown 
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} className="text-portfolio-accent hover:underline" target="_blank" rel="noopener noreferrer" />
                  ),
                  code: ({ node, inline, ...props }: any) => (
                    inline 
                      ? <code className="bg-muted px-1 rounded text-xs" {...props} />
                      : <code className="block bg-muted p-2 rounded text-xs my-2 overflow-x-auto" {...props} />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        
        {/* Timestamp */}
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
};

export default MessageBubble;

import { useState, useCallback, useEffect } from 'react';
import { streamChatResponse } from '@/utils/chatbotStream';
import { greetingMessage } from '@/data/chatbotKnowledge';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [error, setError] = useState<string | null>(null);

  // Load conversation history from session storage
  useEffect(() => {
    if (isOpen) {
      const savedHistory = sessionStorage.getItem('chatHistory');
      const savedSessionId = sessionStorage.getItem('chatSessionId');
      
      if (savedHistory && savedSessionId === sessionId) {
        try {
          const parsed = JSON.parse(savedHistory);
          setMessages(parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })));
        } catch (e) {
          console.error('Failed to load chat history:', e);
        }
      } else {
        // Show greeting message
        setMessages([{
          id: crypto.randomUUID(),
          role: 'assistant',
          content: greetingMessage,
          timestamp: new Date(),
        }]);
      }
    }
  }, [isOpen, sessionId]);

  // Save conversation history
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('chatHistory', JSON.stringify(messages));
      sessionStorage.setItem('chatSessionId', sessionId);
    }
  }, [messages, sessionId]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setError(null);
    
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Create placeholder for assistant message
    const assistantMessageId = crypto.randomUUID();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, assistantMessage]);

    // Get conversation history (last 10 messages for context)
    const conversationHistory = messages.slice(-10).map(m => ({
      role: m.role,
      content: m.content,
    }));

    // Stream response
    await streamChatResponse(
      text,
      conversationHistory,
      (delta) => {
        setMessages(prev => prev.map(m => 
          m.id === assistantMessageId 
            ? { ...m, content: m.content + delta }
            : m
        ));
      },
      () => {
        setIsTyping(false);
        setMessages(prev => prev.map(m =>
          m.id === assistantMessageId && !m.content.trim()
            ? { ...m, content: "Hmm, I couldn't generate a reply that time. Please try asking again or rephrasing your question." }
            : m
        ));
      },
      (errorMsg) => {
        setError(errorMsg);
        setIsTyping(false);
        setMessages(prev => prev.map(m => 
          m.id === assistantMessageId 
            ? { ...m, content: '❌ Sorry, I encountered an error. Please try again.' }
            : m
        ));
      }
    );
  }, [messages, sessionId]);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  
  const clearConversation = useCallback(() => {
    setMessages([{
      id: crypto.randomUUID(),
      role: 'assistant',
      content: greetingMessage,
      timestamp: new Date(),
    }]);
    sessionStorage.removeItem('chatHistory');
  }, []);

  return {
    messages,
    isOpen,
    isTyping,
    error,
    sessionId,
    sendMessage,
    openChat,
    closeChat,
    clearConversation,
  };
};

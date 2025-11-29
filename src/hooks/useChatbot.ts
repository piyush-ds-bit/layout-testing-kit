import { useState, useCallback, useEffect, useRef } from 'react';
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
  const receivedContentRef = useRef<string>('');
  // Load conversation history from session storage
  useEffect(() => {
    if (isOpen) {
      const savedHistory = sessionStorage.getItem('chatHistory');
      const savedSessionId = sessionStorage.getItem('chatSessionId');
      
      if (savedHistory && savedSessionId === sessionId) {
        try {
          const parsed = JSON.parse(savedHistory);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed.map((m: any) => ({
              ...m,
              timestamp: new Date(m.timestamp),
            })));
          } else {
            // Empty history should behave like a fresh conversation
            setMessages([{
              id: crypto.randomUUID(),
              role: 'assistant',
              content: greetingMessage,
              timestamp: new Date(),
            }]);
          }
        } catch (e) {
          console.error('Failed to load chat history:', e);
          // On any parsing error, fall back to greeting
          setMessages([{
            id: crypto.randomUUID(),
            role: 'assistant',
            content: greetingMessage,
            timestamp: new Date(),
          }]);
        }
      } else {
        // Show greeting message for new sessions or missing history
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
    receivedContentRef.current = '';

    // Get conversation history (last 10 messages for context)
    const conversationHistory = messages.slice(-10).map(m => ({
      role: m.role,
      content: m.content,
    }));

    // Set up timeout protection (30 seconds)
    const timeoutId = setTimeout(() => {
      setIsTyping(false);
      setError('Response timeout. The chatbot took too long to respond.');
      setMessages(prev => prev.map(m => 
        m.id === assistantMessageId && !m.content.trim()
          ? { ...m, content: '⏱️ Request timed out. Please try again with a shorter question.' }
          : m
      ));
    }, 30000);

    try {
      // Stream response
      await streamChatResponse(
        text,
        conversationHistory,
        (delta) => {
          receivedContentRef.current += delta;
          setMessages(prev => prev.map(m => 
            m.id === assistantMessageId 
              ? { ...m, content: m.content + delta }
              : m
          ));
        },
        () => {
          clearTimeout(timeoutId); // Clear timeout on success
          setIsTyping(false);
          // Just reset the tracker; don't overwrite the assistant message
          receivedContentRef.current = '';
        },
        (errorMsg) => {
          clearTimeout(timeoutId); // Clear timeout on error
          setError(errorMsg);
          setIsTyping(false);
          setMessages(prev => prev.map(m => 
            m.id === assistantMessageId 
              ? { ...m, content: '❌ Sorry, I encountered an error. Please try again.' }
              : m
          ));
          receivedContentRef.current = '';
        }
      );
    } catch (error) {
      clearTimeout(timeoutId); // Clear timeout on exception
      setIsTyping(false);
      setError('An unexpected error occurred');
      setMessages(prev => prev.map(m => 
        m.id === assistantMessageId 
          ? { ...m, content: '❌ Sorry, something went wrong. Please try again.' }
          : m
      ));
      receivedContentRef.current = '';
    }
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
    receivedContentRef.current = '';
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

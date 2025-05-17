
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { ContactMessage } from '@/types/database';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        setMessages(data as ContactMessage[]);
      }
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      setError(error.message || 'Failed to fetch contact messages.');
      toast({
        title: 'Error',
        description: 'Failed to fetch contact messages.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMessages();
  }, []);
  
  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', id);
      
      if (error) throw error;
      
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      ));
      
      toast({
        title: 'Success',
        description: 'Message marked as read.',
      });
    } catch (error: any) {
      console.error('Error marking message as read:', error);
      toast({
        title: 'Error',
        description: 'Failed to update message status.',
        variant: 'destructive',
      });
    }
  };
  
  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setMessages(messages.filter(msg => msg.id !== id));
      
      toast({
        title: 'Success',
        description: 'Message deleted successfully.',
      });
    } catch (error: any) {
      console.error('Error deleting message:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete message.',
        variant: 'destructive',
      });
    }
  };
  
  if (loading) {
    return <div className="text-white">Loading messages...</div>;
  }
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Contact Messages</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <div className="mt-4">
            <Button onClick={fetchMessages} variant="outline">
              Retry
            </Button>
          </div>
        </Alert>
      )}
      
      {!error && messages.length > 0 ? (
        <div className="space-y-6">
          {messages.map((message) => {
            const date = new Date(message.created_at).toLocaleString();
            
            return (
              <div 
                key={message.id} 
                className={`portfolio-card border-l-4 ${
                  message.read 
                    ? 'border-l-portfolio-gray' 
                    : 'border-l-portfolio-accent'
                }`}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h3 className="text-white font-medium">{message.name}</h3>
                    <a href={`mailto:${message.email}`} className="text-portfolio-accent hover:underline">
                      {message.email}
                    </a>
                  </div>
                  
                  <div className="text-sm text-portfolio-gray mt-2 md:mt-0">
                    {date}
                  </div>
                </div>
                
                <div className="bg-portfolio-darker p-4 rounded-md mb-4">
                  <p className="text-portfolio-gray-light whitespace-pre-wrap">{message.message}</p>
                </div>
                
                <div className="flex gap-2">
                  {!message.read && (
                    <button
                      onClick={() => markAsRead(message.id)}
                      className="text-sm text-portfolio-accent hover:text-portfolio-accent-dark"
                    >
                      Mark as Read
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteMessage(message.id)}
                    className="text-sm text-red-500 hover:text-red-400 ml-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-portfolio-gray-light">
          {error ? '' : 'No contact messages yet.'}
        </p>
      )}
    </div>
  );
};

export default ContactMessages;


import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { ContactMessage } from '@/types/database';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Clock, Trash2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactMessagesPage: React.FC = () => {
  const { isAuthorized } = useAuth();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthorized) return;
    
    fetchMessages();
  }, [isAuthorized]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setMessages(data as ContactMessage[]);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch contact messages.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setMessages(prev => prev.filter(msg => msg.id !== id));
      toast({
        title: 'Success',
        description: 'Message deleted successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to delete message.',
        variant: 'destructive',
      });
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;
      
      setMessages(prev => 
        prev.map(msg => msg.id === id ? { ...msg, read: true } : msg)
      );
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to update message status.',
        variant: 'destructive',
      });
    }
  };

  const downloadAttachment = async (attachmentUrl: string, messageId: string) => {
    try {
      // Extract the file path from the URL
      const url = new URL(attachmentUrl);
      const pathParts = url.pathname.split('/');
      const bucketIndex = pathParts.indexOf('contact-uploads');
      if (bucketIndex === -1) {
        throw new Error('Invalid attachment URL');
      }
      const filePath = pathParts.slice(bucketIndex + 1).join('/');
      
      // Create a signed URL for secure download (1 hour expiration)
      const { data, error } = await supabase.storage
        .from('contact-uploads')
        .createSignedUrl(filePath, 3600);

      if (error) throw error;
      
      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to download attachment.',
        variant: 'destructive',
      });
    }
  };

  if (!isAuthorized) {
    return (
      <Layout>
        <div className="portfolio-section">
          <div className="portfolio-container text-center">
            <h1 className="text-2xl font-semibold text-white mb-4">Access Denied</h1>
            <p className="text-portfolio-gray-light">You don't have permission to view this page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="portfolio-section">
        <div className="portfolio-container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-semibold text-white">Contact Messages</h1>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-white">Loading messages...</div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-portfolio-gray mx-auto mb-4" />
              <p className="text-portfolio-gray-light">No contact messages yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`portfolio-card ${!message.read ? 'border-portfolio-accent' : ''}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-white font-medium">{message.name}</h3>
                        {!message.read && (
                          <span className="bg-portfolio-accent text-white text-xs px-2 py-1 rounded">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-portfolio-gray-light">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {message.email}
                        </div>
                        {message.phone_number && (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {message.phone_number}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(message.submitted_at || message.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!message.read && (
                        <Button
                          onClick={() => markAsRead(message.id)}
                          variant="outline"
                          size="sm"
                          className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white"
                        >
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteMessage(message.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-portfolio-darker p-4 rounded-lg">
                    <p className="text-portfolio-gray-light whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </div>
                  {message.attachment_url && (
                    <div className="mt-4">
                      <Button
                        onClick={() => downloadAttachment(message.attachment_url!, message.id)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download Attachment
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ContactMessagesPage;

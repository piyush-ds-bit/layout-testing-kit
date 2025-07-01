
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import { ContactMessage } from "@/types/database";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Calendar, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const ContactMessagesPage: React.FC = () => {
  const { isAuthorized, loading } = useAuth();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    if (isAuthorized) {
      fetchMessages();
    }
  }, [isAuthorized]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      setMessages(data as ContactMessage[]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch contact messages.",
        variant: "destructive",
      });
    } finally {
      setLoadingMessages(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ read: true })
        .eq("id", id);

      if (error) throw error;
      setMessages(prev =>
        prev.map(msg => (msg.id === id ? { ...msg, read: true } : msg))
      );
      toast({
        title: "Message marked as read",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update message status.",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setMessages(prev => prev.filter(msg => msg.id !== id));
      toast({
        title: "Message deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete message.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <section className="portfolio-section">
        <div className="portfolio-container">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-portfolio-accent hover:text-portfolio-accent-dark mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
            <p className="text-portfolio-gray-light">Manage messages from your contact form</p>
          </div>

          {loadingMessages ? (
            <div className="text-center py-12">
              <div className="text-portfolio-gray-light">Loading messages...</div>
            </div>
          ) : messages.length > 0 ? (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`portfolio-card ${!message.read ? 'border-portfolio-accent' : ''}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-portfolio-accent flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{message.name}</h3>
                        <div className="flex items-center text-sm text-portfolio-gray-light">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(message.submitted_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!message.read && (
                        <span className="px-2 py-1 bg-portfolio-accent text-white text-xs rounded-full">
                          New
                        </span>
                      )}
                      <Button
                        onClick={() => deleteMessage(message.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-portfolio-gray-light">
                      <Mail className="w-4 h-4 mr-2" />
                      <a href={`mailto:${message.email}`} className="hover:text-portfolio-accent">
                        {message.email}
                      </a>
                    </div>
                    
                    {message.phone_number && (
                      <div className="flex items-center text-portfolio-gray-light">
                        <Phone className="w-4 h-4 mr-2" />
                        <a href={`tel:${message.phone_number}`} className="hover:text-portfolio-accent">
                          {message.phone_number}
                        </a>
                      </div>
                    )}

                    <div className="bg-portfolio-dark p-4 rounded-lg">
                      <p className="text-white whitespace-pre-wrap">{message.message}</p>
                    </div>

                    {message.attachment_url && (
                      <div>
                        <a
                          href={message.attachment_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-portfolio-accent hover:text-portfolio-accent-dark"
                        >
                          View Attachment
                        </a>
                      </div>
                    )}

                    {!message.read && (
                      <div className="pt-2">
                        <Button
                          onClick={() => markAsRead(message.id)}
                          size="sm"
                          className="bg-portfolio-accent hover:bg-portfolio-accent-dark"
                        >
                          Mark as Read
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-portfolio-card-bg rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-portfolio-gray" />
              </div>
              <p className="text-portfolio-gray-light">No contact messages yet.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ContactMessagesPage;

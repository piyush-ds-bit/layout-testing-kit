
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { ContactMessage } from "@/types/database";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactMessageCard from "@/components/admin/ContactMessageCard";

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("submitted_at", { ascending: false });
      if (error) throw error;
      setMessages(data as ContactMessage[]);
    } catch (error: any) {
      setError(error.message || "Failed to fetch contact messages.");
      toast({
        title: "Error",
        description: "Failed to fetch contact messages.",
        variant: "destructive",
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
        .from("contact_messages")
        .update({ read: true })
        .eq("id", id);
      if (error) throw error;
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
      );
      toast({
        title: "Success",
        description: "Message marked as read.",
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
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      toast({
        title: "Success",
        description: "Message deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete message.",
        variant: "destructive",
      });
    }
  };

  const downloadAttachment = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="text-white">Loading messages...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">
        Contact Messages
      </h1>

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
          {messages.map((message) => (
            <ContactMessageCard
              key={message.id}
              message={message}
              onMarkAsRead={markAsRead}
              onDelete={deleteMessage}
              onDownloadAttachment={downloadAttachment}
            />
          ))}
        </div>
      ) : (
        <p className="text-portfolio-gray-light">
          {error ? "" : "No contact messages yet."}
        </p>
      )}
    </div>
  );
};

export default ContactMessages;

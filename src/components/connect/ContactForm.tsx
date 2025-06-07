
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Paperclip } from 'lucide-react';

const ContactForm: React.FC = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `contact_${Date.now()}.${fileExt}`;
      const filePath = fileName;
      
      console.log('Uploading contact file:', fileName);
      
      const { error: uploadError } = await supabase.storage
        .from('contact-uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from('contact-uploads')
        .getPublicUrl(filePath);
      
      setUploadedFile(data.publicUrl);
      
      toast({
        title: "File uploaded",
        description: "Your file has been attached to the message.",
      });
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload file.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate inputs
      if (!formData.name.trim()) {
        throw new Error("Please enter your name");
      }
      
      if (!formData.email.trim()) {
        throw new Error("Please enter your email");
      }
      
      if (!formData.message.trim()) {
        throw new Error("Please enter a message");
      }
      
      console.log('Submitting contact form with data:', {
        ...formData,
        attachment_url: uploadedFile
      });
      
      // Save the message to Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          user_id: user?.id,
          attachment_url: uploadedFile,
          read: false
        });
      
      if (error) {
        console.error("Database error:", error);
        throw new Error("Failed to send message. Please try again later.");
      }
      
      toast({
        title: "Message sent successfully",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      // Clear the form
      setFormData({
        name: '',
        email: user?.email || '',
        message: '',
      });
      setUploadedFile(null);
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to send message",
        description: error.message || "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-portfolio-card-bg text-white border border-portfolio-dark focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
          placeholder="Your name"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-portfolio-card-bg text-white border border-portfolio-dark focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
          placeholder="Your email"
          readOnly={!!user?.email}
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-portfolio-card-bg text-white border border-portfolio-dark focus:outline-none focus:ring-1 focus:ring-portfolio-accent resize-none"
          placeholder="Your message"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Attachment (Optional)</label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            id="file-upload"
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
            disabled={uploading}
          />
          <Button
            type="button"
            onClick={() => document.getElementById('file-upload')?.click()}
            variant="outline"
            className="flex items-center gap-2"
            disabled={uploading}
          >
            <Paperclip className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Attach File'}
          </Button>
          {uploadedFile && (
            <span className="text-sm text-green-400">File attached successfully</span>
          )}
        </div>
      </div>
      
      <div>
        <Button 
          type="submit" 
          className="w-full py-3 bg-[#4fd1c5] hover:bg-[#38b2ac] text-white font-medium rounded-lg flex items-center justify-center space-x-2"
          disabled={loading || uploading}
        >
          <Mail className="w-5 h-5" />
          <span>{loading ? 'Sending...' : 'Send Message'}</span>
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;

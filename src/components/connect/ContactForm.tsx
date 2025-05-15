
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

const ContactForm: React.FC = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Save the message to Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            user_id: user?.id,
          }
        ]);
      
      if (error) throw error;
      
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
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-portfolio-gray-light mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="portfolio-input"
          placeholder="Your name"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-portfolio-gray-light mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="portfolio-input"
          placeholder="Your email"
          readOnly={!!user?.email}
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-portfolio-gray-light mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={5}
          className="portfolio-input resize-none"
          placeholder="Your message"
        />
      </div>
      
      <div>
        <Button 
          type="submit" 
          className="portfolio-button w-full"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;

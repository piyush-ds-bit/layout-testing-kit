
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

function isValidPhone(number: string) {
  if (!number.trim()) return true;
  const phoneRegex = /^[+]?[\d\s-()]{7,20}$/;
  return phoneRegex.test(number.trim());
}

export function useContactForm() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    phone_number: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (url: string) => {
    if (url) {
      setUploadedFile(url);
      toast({
        title: "File uploaded",
        description: "Your file has been attached to the message.",
      });
    } else {
      setUploadedFile(null);
      toast({
        title: "Upload failed",
        description: "Failed to upload file.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name.trim()) throw new Error("Please enter your name");
      if (!formData.email.trim()) throw new Error("Please enter your email");
      if (!formData.message.trim()) throw new Error("Please enter a message");
      if (!isValidPhone(formData.phone_number))
        throw new Error(
          "Please provide a valid phone number or leave it blank."
        );

      const { error } = await supabase.from("contact_messages").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        user_id: user?.id,
        attachment_url: uploadedFile,
        phone_number: formData.phone_number.trim() || null,
        read: false,
        submitted_at: new Date().toISOString(),
      });
      if (error) throw new Error("Failed to send message. Please try again later.");

      toast({
        title: "Message sent successfully",
        description: "Thank you for your message. I'll get back to you soon!",
      });

      setFormData({
        name: "",
        email: user?.email || "",
        phone_number: "",
        message: "",
      });
      setUploadedFile(null);
    } catch (error: any) {
      toast({
        title: "Failed to send message",
        description:
          error.message ||
          "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    formData,
    setFormData,
    loading,
    uploadedFile,
    setUploadedFile,
    uploading,
    setUploading,
    handleInputChange,
    handleFileUpload,
    handleSubmit,
  };
}

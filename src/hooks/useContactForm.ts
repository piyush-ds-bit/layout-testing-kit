
import { useState } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Zod schema for contact form validation
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone_number: z.string().max(20, "Phone number too long").regex(/^[+]?[\d\s-()]*$/, "Invalid phone number format").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message must be less than 5000 characters"),
});

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
      // Validate form data with Zod schema
      const validationResult = contactSchema.safeParse(formData);
      if (!validationResult.success) {
        const firstError = validationResult.error.issues[0];
        throw new Error(firstError.message);
      }

      const validatedData = validationResult.data;

      const { error } = await supabase.from("contact_messages").insert({
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        user_id: user?.id,
        attachment_url: uploadedFile,
        phone_number: validatedData.phone_number || null,
        read: false,
        submitted_at: new Date().toISOString(),
      });

      if (error) {
        throw new Error("Failed to send message. Please try again later.");
      }

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
        description: error.message || "There was an error sending your message. Please try again later.",
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

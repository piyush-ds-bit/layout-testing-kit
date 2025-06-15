
import React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactFileUpload from "./ContactFileUpload";
import { useContactForm } from "@/hooks/useContactForm";

const ContactForm: React.FC = () => {
  const {
    user,
    formData,
    loading,
    uploadedFile,
    uploading,
    handleInputChange,
    handleFileUpload,
    handleSubmit,
    setUploading,
  } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Name
        </label>
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
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Email
        </label>
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
        <label
          htmlFor="phone_number"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Phone Number <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg bg-portfolio-card-bg text-white border border-portfolio-dark focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
          placeholder="Your phone number"
          inputMode="tel"
          pattern="[+]?[\d\s\-()]{7,20}"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Attachment (Optional)
        </label>
        <div className="flex items-center gap-4">
          <ContactFileUpload
            uploading={uploading}
            uploadedFile={uploadedFile}
            onUpload={handleFileUpload}
            setUploading={setUploading}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Message
        </label>
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
        <Button
          type="submit"
          className="w-full py-3 bg-[#4fd1c5] hover:bg-[#38b2ac] text-white font-medium rounded-lg flex items-center justify-center space-x-2"
          disabled={loading || uploading}
        >
          <Mail className="w-5 h-5" />
          <span>{loading ? "Sending..." : "Send Message"}</span>
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;


import React from "react";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";

interface ContactFileUploadProps {
  uploading: boolean;
  uploadedFile: string | null;
  onUpload: (url: string) => void;
  setUploading: (uploading: boolean) => void;
}

export const ContactFileUpload: React.FC<ContactFileUploadProps> = ({
  uploading,
  uploadedFile,
  onUpload,
  setUploading,
}) => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client"); // dynamic import
      const fileExt = file.name.split(".").pop();
      const fileName = `contact_${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("contact-uploads")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("contact-uploads")
        .getPublicUrl(filePath);

      onUpload(data.publicUrl);
    } catch (error) {
      onUpload(""); // trigger error messaging from parent
      // Parent should handle toast error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
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
        onClick={() => document.getElementById("file-upload")?.click()}
        variant="outline"
        className="flex items-center gap-2"
        disabled={uploading}
      >
        <Paperclip className="w-4 h-4" />
        {uploading ? "Uploading..." : "Attach File"}
      </Button>
      {uploadedFile && (
        <span className="text-sm text-green-400 ml-2">
          File attached successfully
        </span>
      )}
    </div>
  );
};

export default ContactFileUpload;


import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ContactMessage } from "@/types/database";

interface ContactMessageCardProps {
  message: ContactMessage;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onDownloadAttachment: (url: string, filename: string) => void;
}

const ContactMessageCard: React.FC<ContactMessageCardProps> = ({
  message,
  onMarkAsRead,
  onDelete,
  onDownloadAttachment,
}) => {
  const date = new Date(
    message.submitted_at || message.created_at
  ).toLocaleString();

  return (
    <div
      className={`portfolio-card border-l-4 ${
        message.read ? "border-l-portfolio-gray" : "border-l-portfolio-accent"
      }`}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <h3 className="text-white font-medium">{message.name}</h3>
          <a
            href={`mailto:${message.email}`}
            className="text-portfolio-accent hover:underline"
          >
            {message.email}
          </a>
          {message.phone_number && (
            <span className="block mt-2 text-sm text-gray-300">
              <span className="font-semibold mr-2">Phone:</span>
              <a
                href={`tel:${message.phone_number}`}
                className="text-portfolio-accent hover:underline"
              >
                {message.phone_number}
              </a>
            </span>
          )}
        </div>
        <div className="text-sm text-portfolio-gray mt-2 md:mt-0">{date}</div>
      </div>

      <div className="bg-portfolio-darker p-4 rounded-md mb-4">
        <p className="text-portfolio-gray-light whitespace-pre-wrap">
          {message.message}
        </p>
      </div>

      {message.attachment_url && (
        <div className="mb-4">
          <Button
            onClick={() =>
              onDownloadAttachment(message.attachment_url!, `attachment_${message.id}`)
            }
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Attachment
          </Button>
        </div>
      )}

      <div className="flex gap-2">
        {!message.read && (
          <button
            onClick={() => onMarkAsRead(message.id)}
            className="text-sm text-portfolio-accent hover:text-portfolio-accent-dark"
          >
            Mark as Read
          </button>
        )}

        <button
          onClick={() => onDelete(message.id)}
          className="text-sm text-red-500 hover:text-red-400 ml-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactMessageCard;

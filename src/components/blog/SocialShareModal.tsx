import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  MessageCircle, 
  Instagram, 
  Link2, 
  X 
} from 'lucide-react';
import { generateShareUrls, copyToClipboard, getCurrentPageUrl, ShareData } from '@/utils/shareUtils';
import { toast } from '@/hooks/use-toast';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareData: ShareData;
}

const SocialShareModal: React.FC<SocialShareModalProps> = ({ 
  isOpen, 
  onClose, 
  shareData 
}) => {
  const shareUrls = generateShareUrls(shareData);

  const handleShare = (platform: string, url: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyLink = async () => {
    try {
      await copyToClipboard(shareData.url);
      toast({
        title: "Link copied!",
        description: "The blog post link has been copied to your clipboard.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInstagramShare = () => {
    handleCopyLink();
    toast({
      title: "Link copied for Instagram",
      description: "Paste the link in your Instagram story or post.",
    });
  };

  const shareOptions = [
    {
      name: 'X (Twitter)',
      icon: Twitter,
      url: shareUrls.twitter,
      color: 'hover:bg-blue-500/20 hover:text-blue-400',
      onClick: () => handleShare('twitter', shareUrls.twitter)
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: shareUrls.linkedin,
      color: 'hover:bg-blue-600/20 hover:text-blue-500',
      onClick: () => handleShare('linkedin', shareUrls.linkedin)
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: shareUrls.facebook,
      color: 'hover:bg-blue-700/20 hover:text-blue-600',
      onClick: () => handleShare('facebook', shareUrls.facebook)
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: shareUrls.whatsapp,
      color: 'hover:bg-green-500/20 hover:text-green-400',
      onClick: () => handleShare('whatsapp', shareUrls.whatsapp)
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: null,
      color: 'hover:bg-pink-500/20 hover:text-pink-400',
      onClick: handleInstagramShare
    },
    {
      name: 'Copy Link',
      icon: Link2,
      url: null,
      color: 'hover:bg-portfolio-accent/20 hover:text-portfolio-accent',
      onClick: handleCopyLink
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-portfolio-dark border-portfolio-gray max-w-sm mx-auto backdrop-blur-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-lg">Share Blog Post</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-portfolio-gray-light hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-3 py-4">
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              variant="outline"
              onClick={option.onClick}
              className={`
                flex flex-col items-center justify-center h-20 gap-2 
                bg-portfolio-darkest border-portfolio-gray text-portfolio-gray-light
                transition-all duration-200 hover:scale-105
                ${option.color}
              `}
            >
              <option.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{option.name}</span>
            </Button>
          ))}
        </div>
        
        <div className="text-center text-xs text-portfolio-gray-light border-t border-portfolio-gray pt-3">
          Share "{shareData.title.length > 30 ? shareData.title.substring(0, 30) + '...' : shareData.title}"
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShareModal;
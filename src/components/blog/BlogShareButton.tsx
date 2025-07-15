import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import SocialShareModal from './SocialShareModal';
import { getCurrentPageUrl } from '@/utils/shareUtils';
import { BlogPost } from '@/types/database';

interface BlogShareButtonProps {
  post: BlogPost;
}

const BlogShareButton: React.FC<BlogShareButtonProps> = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shareData = {
    title: post.title,
    url: getCurrentPageUrl(post.id),
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white transition-all duration-200"
      >
        <Share2 className="w-4 h-4" />
      </Button>

      <SocialShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shareData={shareData}
      />
    </>
  );
};

export default BlogShareButton;
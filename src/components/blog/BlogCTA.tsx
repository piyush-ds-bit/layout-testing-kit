
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BlogCTAProps {
  variant?: 'hero' | 'preview';
  className?: string;
}

const BlogCTA: React.FC<BlogCTAProps> = ({ variant = 'preview', className = '' }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const hasVisitedBlog = localStorage.getItem('blog-visited');
    if (!hasVisitedBlog) {
      setIsFirstVisit(true);
      // Auto-show tooltip for first-time visitors after 3 seconds
      const timer = setTimeout(() => setShowTooltip(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleBlogClick = () => {
    localStorage.setItem('blog-visited', 'true');
    setIsFirstVisit(false);
    setShowTooltip(false);
  };

  if (variant === 'hero') {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <TooltipProvider>
          <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
            <TooltipTrigger asChild>
              <Link to="/blog" onClick={handleBlogClick} className="block w-full h-full">
                <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-2 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <PenTool className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-lg font-medium text-white flex items-center gap-1 justify-center">
                      Blog
                      {isFirstVisit && (
                        <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-300 animate-pulse" />
                      )}
                    </h3>
                    <p className="text-xs md:text-sm text-portfolio-gray-light mt-1 hidden md:block">Share your story</p>
                  </div>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-portfolio-card-bg border-portfolio-border text-white">
              <p className="font-medium">Share Your Story!</p>
              <p className="text-sm text-gray-300">Join our community by writing your first blog post</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        
        <Badge 
            variant="secondary" 
            className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs animate-pulse"
          >
            New!
        </Badge>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Link to="/blog" onClick={handleBlogClick}>
        <Button 
          className="relative overflow-hidden bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/30 text-purple-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 rounded-xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <div className="relative flex items-center gap-2">
            <PenTool className="w-4 h-4" />
            <span>Share Your Story</span>
            {isFirstVisit && (
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            )}
          </div>
        </Button>
      </Link>
      
      {isFirstVisit && (
        <Badge 
          variant="secondary" 
          className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs animate-pulse"
        >
          New!
        </Badge>
      )}
    </div>
  );
};

export default BlogCTA;

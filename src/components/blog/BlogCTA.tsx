
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
      <div className={`relative ${className}`}>
        <TooltipProvider>
          <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
            <TooltipTrigger asChild>
              <Link to="/blog" onClick={handleBlogClick}>
                <Button 
                  className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse" />
                  <div className="relative flex items-center gap-2">
                    <PenTool className="w-4 h-4" />
                    <span>Blog</span>
                    {isFirstVisit && (
                      <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                    )}
                  </div>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-portfolio-card-bg border-portfolio-border text-white">
              <p className="font-medium">Share Your Story!</p>
              <p className="text-sm text-gray-300">Join our community by writing your first blog post</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
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


import React, { useState, useEffect } from 'react';
import { X, PenTool, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const hasSeenNotification = sessionStorage.getItem('blog-notification-seen');
    const hasVisitedBlog = sessionStorage.getItem('blog-visited');
    
    if (hasSeenNotification || hasVisitedBlog) return;
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 12000); // Show after 45 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('blog-notification-seen', 'true');
  };
  
  const handleBlogClick = () => {
    setIsVisible(false);
    sessionStorage.setItem('blog-visited', 'true');
    sessionStorage.setItem('blog-notification-seen', 'true');
  };


  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-[320px] z-[999] animate-slide-in">
      <div className="bg-gradient-to-r from-purple-900/95 to-blue-900/95 backdrop-blur-md border border-purple-500/30 rounded-xl p-4 shadow-2xl max-w-sm">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <PenTool className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-white">Join Our Community!</h3>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-sm text-gray-300 mb-3">
          Share your insights and connect with fellow developers in our blog section.
        </p>
        
        <div className="flex items-center gap-3">
          <Link to="/blog" onClick={handleBlogClick}>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105">
              Explore Blog
            </button>
          </Link>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Users className="w-3 h-3" />
            <span>Join the conversation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogNotification;

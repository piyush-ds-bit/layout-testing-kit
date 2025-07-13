import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-portfolio-card-bg/90 backdrop-blur-sm border border-portfolio-accent/30 flex items-center justify-center text-portfolio-accent shadow-lg transition-all duration-300 md:hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      } hover:bg-portfolio-accent hover:text-white hover:shadow-xl hover:scale-105`}
    >
      <Home className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;
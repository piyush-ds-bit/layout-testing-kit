
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import BlogCard from '@/components/blog/BlogCard';
import BlogCTA from '@/components/blog/BlogCTA';

const BlogPreview: React.FC = () => {
  const { data: posts, isLoading } = useBlogPosts();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="blog" 
      className="portfolio-section"
      ref={sectionRef}
    >
      <div 
        className={`max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8 mb-8
        transition-all duration-700 ${isVisible ? 'animate-fade-in transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'}`}
        style={{
          boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
        }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="portfolio-heading">Latest Blog Posts</h2>
          <Link 
            to="/blog" 
            className="flex items-center text-portfolio-accent hover:text-portfolio-accent-dark transition-colors group"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-200">View All</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-portfolio-accent" />
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            {posts.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">✨</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Be the First to Share!</h3>
              <p className="text-portfolio-gray-light mb-6">
                Start the conversation by sharing your insights, experiences, or tutorials with our community.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <BlogCTA />
              <Link 
                to="/blog" 
                className="text-portfolio-accent hover:text-portfolio-accent-dark transition-colors text-sm"
              >
                Learn more about blogging →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPreview;

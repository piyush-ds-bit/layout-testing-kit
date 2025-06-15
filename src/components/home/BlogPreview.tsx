
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import BlogCard from '@/components/blog/BlogCard';

const BlogPreview: React.FC = () => {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <section id="blog" className="portfolio-section">
      <div 
        className="max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8 mb-8
        transition-all duration-300"
        style={{
          boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
        }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="portfolio-heading">Latest Blog Posts</h2>
          <Link 
            to="/blog" 
            className="flex items-center text-portfolio-accent hover:text-portfolio-accent-dark transition-colors"
          >
            View All <ArrowRight className="ml-2 w-4 h-4" />
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
            <p className="text-portfolio-gray-light">No blog posts yet. Check back soon!</p>
            <Link 
              to="/blog" 
              className="inline-block mt-4 text-portfolio-accent hover:text-portfolio-accent-dark transition-colors"
            >
              Create the first post →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPreview;

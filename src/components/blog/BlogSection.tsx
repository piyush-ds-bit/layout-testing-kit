import React from 'react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import BlogCard from './BlogCard';
import CreateBlogPost from './CreateBlogPost';
import { Loader2 } from 'lucide-react';

const BlogSection: React.FC = () => {
  const { data: posts, isLoading, error } = useBlogPosts();

  return (
    <div
      className="max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8
      transition-all duration-300 mb-8"
      style={{
        boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
      }}
    >
      <CreateBlogPost />
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Recent Blog Posts</h2>
        
        {posts && posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-portfolio-gray-light">No blog posts yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;

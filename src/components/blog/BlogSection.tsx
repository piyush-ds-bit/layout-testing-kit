
import React from 'react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import BlogCard from './BlogCard';
import CreateBlogPost from './CreateBlogPost';
import { Loader2 } from 'lucide-react';

const BlogSection: React.FC = () => {
  const { data: posts, isLoading, error } = useBlogPosts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-portfolio-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Error loading blog posts. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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

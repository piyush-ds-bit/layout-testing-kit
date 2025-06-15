
import React from 'react';
import Layout from '@/components/layout/Layout';
import BlogSection from '@/components/blog/BlogSection';

const BlogPage: React.FC = () => {
  return (
    <Layout>
      <section className="portfolio-section">
        <div className="portfolio-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Blog
            </h1>
            <p className="text-xl text-portfolio-gray-light max-w-2xl mx-auto">
              Thoughts, insights, and stories from our community
            </p>
          </div>
          
          <BlogSection />
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;

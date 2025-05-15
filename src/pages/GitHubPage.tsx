
import React from 'react';
import Layout from '@/components/layout/Layout';
import GitHubSection from '@/components/github/GitHubSection';

const GitHubPage: React.FC = () => {
  return (
    <Layout>
      <div className="pt-10">
        <GitHubSection />
      </div>
    </Layout>
  );
};

export default GitHubPage;

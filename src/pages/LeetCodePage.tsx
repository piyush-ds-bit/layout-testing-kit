
import React from 'react';
import Layout from '@/components/layout/Layout';
import LeetCodeSection from '@/components/leetcode/LeetCodeSection';

const LeetCodePage: React.FC = () => {
  return (
    <Layout>
      <div className="pt-10">
        <LeetCodeSection />
      </div>
    </Layout>
  );
};

export default LeetCodePage;

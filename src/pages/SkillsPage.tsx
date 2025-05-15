
import React from 'react';
import Layout from '@/components/layout/Layout';
import SkillsSection from '@/components/skills/SkillsSection';

const SkillsPage: React.FC = () => {
  return (
    <Layout>
      <div className="pt-10">
        <SkillsSection />
      </div>
    </Layout>
  );
};

export default SkillsPage;

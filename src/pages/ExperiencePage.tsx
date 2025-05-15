
import React from 'react';
import Layout from '@/components/layout/Layout';
import ExperienceSection from '@/components/experience/ExperienceSection';

const ExperiencePage: React.FC = () => {
  return (
    <Layout>
      <div className="pt-10">
        <ExperienceSection />
      </div>
    </Layout>
  );
};

export default ExperiencePage;

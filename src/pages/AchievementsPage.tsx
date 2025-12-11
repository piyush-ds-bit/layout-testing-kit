import React from 'react';
import Layout from '@/components/layout/Layout';
import AchievementsSection from '@/components/achievements/AchievementsSection';

const AchievementsPage: React.FC = () => {
  return (
    <Layout>
      <div className="animate-fade-in pt-8">
        <AchievementsSection />
      </div>
    </Layout>
  );
};

export default AchievementsPage;

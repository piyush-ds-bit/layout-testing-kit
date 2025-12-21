import React from 'react';
import Layout from '@/components/layout/Layout';
import AchievementsSection from '@/components/achievements/AchievementsSection';

const AchievementsPage: React.FC = () => {
  return (
    <Layout>
      <AchievementsSection />
    </Layout>
  );
};

export default AchievementsPage;

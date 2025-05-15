
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import SkillsSection from '@/components/skills/SkillsSection';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <SkillsSection />
    </Layout>
  );
};

export default HomePage;

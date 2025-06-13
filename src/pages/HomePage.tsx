
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import SkillsPreview from '@/components/home/SkillsPreview';
import ExperiencePreview from '@/components/home/ExperiencePreview';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import GitHubPreview from '@/components/home/GitHubPreview';
import BlogPreview from '@/components/home/BlogPreview';
import ConnectPreview from '@/components/home/ConnectPreview';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="animate-fade-in">
        <Hero />
        <SkillsPreview />
        <ExperiencePreview />
        <ProjectsPreview />
        <GitHubPreview />
        <BlogPreview />
        <ConnectPreview />
      </div>
    </Layout>
  );
};

export default HomePage;

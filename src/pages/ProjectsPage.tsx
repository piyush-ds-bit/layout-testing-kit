
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProjectsSection from '@/components/projects/ProjectsSection';

const ProjectsPage: React.FC = () => {
  return (
    <Layout>
      <div className="pt-10">
        <ProjectsSection />
      </div>
    </Layout>
  );
};

export default ProjectsPage;

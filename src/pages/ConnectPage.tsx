
import React from 'react';
import Layout from '@/components/layout/Layout';
import ConnectSection from '@/components/connect/ConnectSection';

const ConnectPage: React.FC = () => {
  return (
    <Layout>
      <div className="pt-10">
        <ConnectSection />
      </div>
    </Layout>
  );
};

export default ConnectPage;

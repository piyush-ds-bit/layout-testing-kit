
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import SignupForm from '@/components/auth/SignupForm';

const SignupPage: React.FC = () => {
  const { user } = useAuth();
  
  // Redirect to admin dashboard if already logged in
  if (user) {
    return <Navigate to="/admin" />;
  }
  
  return (
    <Layout>
      <div className="py-16">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default SignupPage;

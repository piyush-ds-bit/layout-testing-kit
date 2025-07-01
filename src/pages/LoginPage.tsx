
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import { toast } from '@/components/ui/use-toast';

const LoginPage: React.FC = () => {
  const { user, loading, isAuthorized } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to home page
    if (user) {
      toast({
        title: "Already logged in",
        description: isAuthorized 
          ? "Welcome back, admin!" 
          : `Welcome back, ${user.email?.split('@')[0] || 'User'}!`,
      });
      navigate('/');
    }
  }, [user, isAuthorized, navigate]);
  
  // Show loading state during authentication
  if (loading) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <div className="text-white">Checking authentication status...</div>
        </div>
      </Layout>
    );
  }
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" />;
  }
  
  return (
    <Layout>
      <div className="py-16">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;

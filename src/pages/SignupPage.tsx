
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import SignupForm from '@/components/auth/SignupForm';
import { toast } from '@/components/ui/use-toast';

const SignupPage: React.FC = () => {
  const { user, loading, isAuthorized } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect appropriately
    if (user) {
      if (isAuthorized) {
        toast({
          title: "Already logged in",
          description: "You are already logged in with admin access.",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Already logged in",
          description: "You are already logged in as " + (user.email || 'an authenticated user'),
        });
        navigate('/');
      }
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
    return <Navigate to={isAuthorized ? "/admin" : "/"} />;
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

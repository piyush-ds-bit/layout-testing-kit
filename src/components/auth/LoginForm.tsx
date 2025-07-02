
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { FcGoogle } from 'react-icons/fc';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signIn(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
      // Redirect happens automatically after successful login
    } catch (error: any) {
      console.error('Google login error:', error);
      toast({
        title: "Google login failed",
        description: error.message || "Failed to login with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="portfolio-card">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-portfolio-gray-light mb-1">Email*</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-gray">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="portfolio-input pl-10"
                placeholder="Your email"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-portfolio-gray-light mb-1">Password*</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-gray">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="portfolio-input pl-10"
                placeholder="Your password"
              />
            </div>
          </div>
          
          <Button
            type="submit"
            className="portfolio-button w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-portfolio-dark"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-portfolio-darkest px-2 text-portfolio-gray">
              Or continue with
            </span>
          </div>
        </div>
        
        <Button
          type="button"
          onClick={handleGoogleLogin}
          variant="outline"
          disabled={googleLoading}
          className="w-full flex justify-center items-center gap-2 border-portfolio-dark hover:bg-portfolio-dark text-white"
        >
          {googleLoading ? (
            <span className="inline-block animate-spin mr-2">◌</span>
          ) : (
            <FcGoogle className="w-5 h-5" />
          )}
          Sign in with Google
        </Button>
        
        <p className="text-center mt-6 text-sm text-portfolio-gray-light">
          Don't have an account?{' '}
          <Link to="/signup" className="text-portfolio-accent hover:text-portfolio-accent-dark transition-colors">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

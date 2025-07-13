import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LogoutConfirmationDialog from '@/components/auth/LogoutConfirmationDialog';

const MobileLoginButton: React.FC = () => {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <LogoutConfirmationDialog onLogout={signOut}>
        <button className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-portfolio-card-bg/90 backdrop-blur-sm border border-portfolio-accent/30 flex items-center justify-center text-portfolio-accent hover:bg-portfolio-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 md:hidden">
          <LogOut className="w-5 h-5" />
        </button>
      </LogoutConfirmationDialog>
    );
  }

  return (
    <Link to="/login">
      <button className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-portfolio-card-bg/90 backdrop-blur-sm border border-portfolio-accent/30 flex items-center justify-center text-portfolio-accent hover:bg-portfolio-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 md:hidden">
        <User className="w-5 h-5" />
      </button>
    </Link>
  );
};

export default MobileLoginButton;
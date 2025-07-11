import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LogoutConfirmationDialog from '@/components/auth/LogoutConfirmationDialog';

const MobileLoginButton: React.FC = () => {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <LogoutConfirmationDialog onLogout={signOut}>
        <button className="md:hidden w-10 h-10 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 flex items-center justify-center shadow-sm hover:bg-primary/20 transition-all duration-300">
          <User className="w-5 h-5 text-primary" />
        </button>
      </LogoutConfirmationDialog>
    );
  }

  return (
    <Link to="/login" className="md:hidden">
      <button className="w-10 h-10 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 flex items-center justify-center shadow-sm hover:bg-primary/20 transition-all duration-300">
        <User className="w-5 h-5 text-primary" />
      </button>
    </Link>
  );
};

export default MobileLoginButton;
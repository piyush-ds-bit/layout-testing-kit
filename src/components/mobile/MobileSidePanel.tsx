import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Code, Briefcase, BookOpen, Github, Mail, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LogoutConfirmationDialog from '@/components/auth/LogoutConfirmationDialog';

interface MobileSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidePanel: React.FC<MobileSidePanelProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Skills', path: '/skills', icon: Code },
    { label: 'Projects', path: '/projects', icon: Briefcase },
    { label: 'Experience', path: '/experience', icon: Briefcase },
    { label: 'Blog', path: '/blog', icon: BookOpen },
    { label: 'GitHub', path: '/github', icon: Github },
    { label: 'Connect', path: '/connect', icon: Mail },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const containerVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    exit: {
      x: '100%',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Side Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-portfolio-card-bg/95 backdrop-blur-xl border-l border-portfolio-accent/30 z-[60] shadow-2xl md:hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              boxShadow: '-4px 0 24px rgba(168, 85, 247, 0.3)',
            }}
          >
            <div className="flex flex-col h-full p-6 pt-20">
              {/* Menu Items */}
              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <motion.button
                      key={item.path}
                      variants={itemVariants}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-portfolio-accent/20 border border-portfolio-accent/50 text-portfolio-accent'
                          : 'text-portfolio-text hover:bg-portfolio-accent/10 border border-transparent'
                      }`}
                      whileTap={{ scale: 0.98 }}
                      style={
                        isActive
                          ? {
                              boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
                            }
                          : {}
                      }
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-lg font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Auth Section */}
              <motion.div
                variants={itemVariants}
                className="pt-4 border-t border-portfolio-accent/20"
              >
                {user ? (
                  <LogoutConfirmationDialog onLogout={signOut}>
                    <motion.button
                      className="w-full flex items-center gap-4 px-4 py-3 rounded-lg bg-gradient-to-r from-portfolio-accent/20 to-purple-500/20 border border-portfolio-accent/30 text-portfolio-accent hover:border-portfolio-accent/50 transition-all duration-300"
                      whileTap={{ scale: 0.98 }}
                      style={{
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)',
                      }}
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="text-lg font-medium">Logout</span>
                    </motion.button>
                  </LogoutConfirmationDialog>
                ) : (
                  <motion.button
                    onClick={() => {
                      navigate('/login');
                      onClose();
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-lg bg-gradient-to-r from-portfolio-accent/20 to-purple-500/20 border border-portfolio-accent/30 text-portfolio-accent hover:border-portfolio-accent/50 transition-all duration-300"
                    whileTap={{ scale: 0.98 }}
                    style={{
                      boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)',
                    }}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-lg font-medium">Login</span>
                  </motion.button>
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidePanel;

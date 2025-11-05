import React from 'react';
import { motion } from 'framer-motion';

interface MobileHamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileHamburgerMenu: React.FC<MobileHamburgerMenuProps> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-4 right-4 z-[60] w-12 h-12 rounded-full bg-portfolio-card-bg/80 backdrop-blur-md border border-portfolio-accent/30 flex flex-col items-center justify-center gap-1.5 shadow-lg md:hidden"
      whileTap={{ scale: 0.95 }}
      style={{
        boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
      }}
    >
      <motion.span
        className="w-6 h-0.5 bg-portfolio-accent rounded-full"
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: '0 0 8px rgba(168, 85, 247, 0.6)',
        }}
      />
      <motion.span
        className="w-6 h-0.5 bg-portfolio-accent rounded-full"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: '0 0 8px rgba(168, 85, 247, 0.6)',
        }}
      />
      <motion.span
        className="w-6 h-0.5 bg-portfolio-accent rounded-full"
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: '0 0 8px rgba(168, 85, 247, 0.6)',
        }}
      />
    </motion.button>
  );
};

export default MobileHamburgerMenu;

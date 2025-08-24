import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Calendar } from 'lucide-react';

interface IdentityCardProps {
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
}

const IdentityCard: React.FC<IdentityCardProps> = ({ isDragging, setIsDragging }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ y: -100, rotate: 0 }}
      animate={{ y: 0, rotate: 0 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      }}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      dragConstraints={{
        top: -200,
        bottom: 200,
        left: -150,
        right: 150
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        // Add shake animation after drag
      }}
      whileDrag={{ 
        scale: 1.05,
        rotate: isDragging ? 5 : 0,
        zIndex: 1000
      }}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      {/* Card String/Thread */}
      <motion.div
        className="absolute top-0 left-1/2 w-0.5 bg-gray-400"
        style={{
          height: 60,
          transformOrigin: 'bottom center',
          transform: 'translateX(-50%)'
        }}
        animate={{
          rotate: isDragging ? (Math.random() - 0.5) * 10 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
      />
      
      {/* Identity Card */}
      <motion.div
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-portfolio-accent shadow-2xl p-6 min-w-[320px] max-w-[380px]"
        style={{
          boxShadow: '0 0 30px rgba(168, 85, 247, 0.3), 0 20px 60px rgba(0, 0, 0, 0.4)'
        }}
        animate={{
          rotateY: isDragging ? (Math.random() - 0.5) * 15 : 0,
          rotateX: isDragging ? (Math.random() - 0.5) * 10 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      >
        {/* Card Header */}
        <div className="text-center mb-6">
          <div className="text-xs text-portfolio-accent font-semibold tracking-wider uppercase mb-2">
            IDENTITY CARD
          </div>
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-portfolio-accent to-transparent mb-4" />
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-4 mb-6">
        {/* Profile Image */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-portfolio-accent to-purple-600 p-0.5">
            <img
              src="/profile_image.jpeg"  // <-- replace with your actual image path (public folder or URL)
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-800" />
        </div>

          
          {/* Basic Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">Piyush Singh</h3>
            <p className="text-sm text-gray-300">Data Scientist</p>
            <p className="text-xs text-portfolio-accent">Portfolio Owner</p>
          </div>
        </div>

        {/* Personal Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-portfolio-accent" />
            <span className="text-sm text-gray-300">Software Engineer</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-portfolio-accent" />
            <span className="text-sm text-gray-300">Data Science Enthusiast</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <div className="text-xs text-portfolio-accent font-semibold tracking-wider uppercase">
            CONNECT
          </div>
          <div className="grid grid-cols-1 gap-2">
            <motion.a
              href="https://github.com/piyush-ds-bit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="w-4 h-4 text-white" />
              <span className="text-sm text-white">GitHub</span>
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/piyushkrsingh-/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white">LinkedIn</span>
            </motion.a>
            
            <motion.a
              href="https://twitter.com/_piyushkrsingh_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white">Twitter/X</span>
            </motion.a>
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-6 pt-4 border-t border-slate-700">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>ID: PS-2024</span>
            <span>Valid: Always</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IdentityCard;

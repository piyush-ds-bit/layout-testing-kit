import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IdentityCard from './IdentityCard';

interface IdentityCardOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const IdentityCardOverlay: React.FC<IdentityCardOverlayProps> = ({ isVisible, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Semi-transparent black overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isDragging ? onClose : undefined}
            style={{ cursor: !isDragging ? 'pointer' : 'default' }}
          />
          
          {/* Identity Card */}
          <div className="relative z-10">
            <IdentityCard 
              isDragging={isDragging}
              setIsDragging={setIsDragging}
            />
          </div>
          
          {/* Close instruction */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {isDragging ? (
              <p>Drag the card around • Release to settle</p>
            ) : (
              <p>Tap outside to close • Drag the card to play with it</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IdentityCardOverlay;
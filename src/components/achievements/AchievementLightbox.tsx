import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Award, ExternalLink, Download } from 'lucide-react';
import { Achievement } from '@/types/database';
import { Button } from '@/components/ui/button';

interface AchievementLightboxProps {
  achievement: Achievement | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const AchievementLightbox: React.FC<AchievementLightboxProps> = ({
  achievement,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && hasPrevious) onPrevious?.();
    if (e.key === 'ArrowRight' && hasNext) onNext?.();
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleOpenPdf = () => {
    if (achievement?.file_url) {
      window.open(achievement.file_url, '_blank');
    }
  };

  const isPdf = achievement?.file_type === 'pdf';

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Arrows */}
          {hasPrevious && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious?.();
              }}
              className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
          )}
          
          {hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
              className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative max-w-5xl w-full max-h-[90vh] bg-portfolio-darker rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
              {/* Image Section */}
              <div className="lg:w-2/3 bg-black flex items-center justify-center p-4 min-h-[300px] lg:min-h-[500px]">
                {isPdf ? (
                  <div className="text-center">
                    <Award className="w-24 h-24 text-portfolio-accent/50 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">PDF Certificate</p>
                    <Button onClick={handleOpenPdf} className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Open PDF
                    </Button>
                  </div>
                ) : achievement.image_url ? (
                  <img
                    src={achievement.image_url}
                    alt={achievement.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                  />
                ) : (
                  <Award className="w-32 h-32 text-portfolio-accent/30" />
                )}
              </div>

              {/* Info Section */}
              <div className="lg:w-1/3 p-6 overflow-y-auto">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-portfolio-accent/20 text-portfolio-accent rounded-full mb-4">
                  {achievement.category}
                </span>
                
                <h2 className="text-2xl font-bold text-white mb-3">
                  {achievement.title}
                </h2>

                {achievement.event_name && (
                  <p className="text-lg text-gray-300 mb-3">
                    {achievement.event_name}
                  </p>
                )}

                {achievement.date && (
                  <div className="flex items-center text-gray-400 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(achievement.date)}
                  </div>
                )}

                {achievement.description && (
                  <p className="text-gray-400 leading-relaxed">
                    {achievement.description}
                  </p>
                )}

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  {achievement.file_url && (
                    <a
                      href={achievement.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex items-center gap-2 px-4 py-2 bg-portfolio-accent hover:bg-portfolio-accent-dark text-white rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementLightbox;

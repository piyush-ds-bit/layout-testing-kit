import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Calendar, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Achievement } from '@/hooks/useAchievementsData';
import { format } from 'date-fns';

interface AchievementPreviewModalProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

const AchievementPreviewModal: React.FC<AchievementPreviewModalProps> = ({
  achievement,
  isOpen,
  onClose,
}) => {
  if (!achievement) return null;

  const handleDownload = () => {
    const url = achievement.file_url || achievement.image_url;
    if (url) {
      window.open(url, '_blank');
    }
  };

  const getPreviewContent = () => {
    if (achievement.file_type === 'pdf' && achievement.file_url) {
      return (
        <iframe
          src={achievement.file_url}
          className="w-full h-[60vh] rounded-lg"
          title={achievement.title}
        />
      );
    }
    
    const imageUrl = achievement.image_url || achievement.file_url;
    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt={achievement.title}
          className="max-w-full max-h-[60vh] object-contain rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      );
    }

    return (
      <div className="flex items-center justify-center h-48 bg-portfolio-darker rounded-lg">
        <Award className="w-16 h-16 text-muted-foreground" />
      </div>
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'certificate':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'award':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'recognition':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'competition':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-portfolio-accent/20 text-portfolio-accent border-portfolio-accent/30';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-portfolio-card-bg border border-portfolio-dark rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-2 ${getCategoryColor(achievement.category)}`}>
                  {achievement.category}
                </div>
                <h2 className="text-2xl font-bold text-foreground">{achievement.title}</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Preview */}
            <div className="flex justify-center mb-6">
              {getPreviewContent()}
            </div>

            {/* Details */}
            <div className="space-y-4">
              {achievement.description && (
                <p className="text-muted-foreground">{achievement.description}</p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {achievement.event_name && (
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>{achievement.event_name}</span>
                  </div>
                )}
                
                {achievement.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(achievement.date), 'MMMM d, yyyy')}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              {(achievement.file_url || achievement.image_url) && (
                <div className="flex gap-3 pt-4 border-t border-portfolio-dark">
                  <Button
                    onClick={handleDownload}
                    className="bg-portfolio-accent hover:bg-portfolio-accent-dark"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    className="border-portfolio-dark"
                    onClick={() => window.open(achievement.file_url || achievement.image_url || '', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in New Tab
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementPreviewModal;

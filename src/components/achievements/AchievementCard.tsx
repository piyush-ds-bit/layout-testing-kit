import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Edit2, Trash2, FileText } from 'lucide-react';
import { Achievement } from '@/types/database';
import { useAdminEdit } from '@/context/AdminEditContext';
import { Button } from '@/components/ui/button';

interface AchievementCardProps {
  achievement: Achievement;
  onEdit?: (achievement: Achievement) => void;
  onDelete?: (id: string) => void;
  onClick?: (achievement: Achievement) => void;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onEdit,
  onDelete,
  onClick
}) => {
  const { isEditMode } = useAdminEdit();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [rowSpan, setRowSpan] = useState(25);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Calculate row span based on image aspect ratio
  useEffect(() => {
    if (achievement.image_url && imgRef.current) {
      const img = new Image();
      img.src = achievement.image_url;
      img.onload = () => {
        const aspectRatio = img.height / img.width;
        // Base height + proportional height based on aspect ratio
        const calculatedSpan = Math.ceil(15 + (aspectRatio * 20));
        setRowSpan(Math.min(Math.max(calculatedSpan, 20), 45));
      };
    }
  }, [achievement.image_url]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const isPdf = achievement.file_type === 'pdf';

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      style={{ gridRowEnd: `span ${rowSpan}` }}
      className="group relative rounded-xl overflow-hidden cursor-pointer bg-portfolio-card-bg border border-portfolio-border hover:border-portfolio-accent/50 transition-all duration-300"
      onClick={() => onClick?.(achievement)}
    >
      {/* Image Container */}
      <div className="relative w-full h-full min-h-[200px]">
        {achievement.image_url ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-portfolio-dark animate-pulse" />
            )}
            <img
              ref={imgRef}
              src={achievement.image_url}
              alt={achievement.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        ) : (
          <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-portfolio-accent/20 to-portfolio-dark flex items-center justify-center">
            {isPdf ? (
              <FileText className="w-16 h-16 text-portfolio-accent/50" />
            ) : (
              <Award className="w-16 h-16 text-portfolio-accent/50" />
            )}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-portfolio-accent/80 text-white rounded-full mb-2">
              {achievement.category}
            </span>
            <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
              {achievement.title}
            </h3>
            {achievement.event_name && (
              <p className="text-sm text-gray-300 mb-1">{achievement.event_name}</p>
            )}
            {achievement.date && (
              <div className="flex items-center text-xs text-gray-400">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(achievement.date)}
              </div>
            )}
          </div>
        </div>

        {/* Category Badge (always visible) */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs font-medium bg-black/60 backdrop-blur-sm text-white rounded-full">
            {achievement.category}
          </span>
        </div>

        {/* PDF indicator */}
        {isPdf && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-xs font-medium bg-red-500/80 text-white rounded-full flex items-center gap-1">
              <FileText className="w-3 h-3" />
              PDF
            </span>
          </div>
        )}

        {/* Admin Actions */}
        {isEditMode && (
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(achievement);
              }}
            >
              <Edit2 className="w-4 h-4 text-gray-700" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(achievement.id);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Bottom info strip (always visible) */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity">
        <h3 className="text-sm font-semibold text-white line-clamp-1">{achievement.title}</h3>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: '0 0 30px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.1)'
        }}
      />
    </motion.div>
  );
};

export default AchievementCard;

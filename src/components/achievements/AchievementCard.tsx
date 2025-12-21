import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Achievement } from '@/hooks/useAchievementsData';
import { format } from 'date-fns';

interface AchievementCardProps {
  achievement: Achievement;
  onView: (achievement: Achievement) => void;
  onEdit?: (achievement: Achievement) => void;
  onDelete?: (achievement: Achievement) => void;
  showAdminControls?: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onView,
  onEdit,
  onDelete,
  showAdminControls = false,
}) => {
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

  const getPreviewUrl = () => {
    if (achievement.image_url) return achievement.image_url;
    if (achievement.file_type === 'pdf') return '/placeholder.svg';
    return '/placeholder.svg';
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-portfolio-card-bg border border-portfolio-dark rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-portfolio-accent/50 hover:shadow-lg hover:shadow-portfolio-accent/10"
      onClick={() => onView(achievement)}
    >
      {/* Image/Preview */}
      <div className="relative h-48 overflow-hidden bg-portfolio-darker">
        <img
          src={getPreviewUrl()}
          alt={achievement.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-portfolio-card-bg via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(achievement.category)}`}>
          {achievement.category}
        </div>

        {/* Admin Controls */}
        {showAdminControls && (
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-portfolio-card-bg/90 hover:bg-portfolio-accent"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(achievement);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(achievement);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-portfolio-accent transition-colors">
          {achievement.title}
        </h3>
        
        {achievement.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {achievement.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Award className="w-3 h-3" />
            <span>{achievement.event_name || 'Achievement'}</span>
          </div>
          
          {achievement.date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(achievement.date), 'MMM yyyy')}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;

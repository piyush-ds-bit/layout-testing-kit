import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, FolderKanban, Award, BookOpen, ExternalLink, Calendar } from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

const RightInfoPanel: React.FC = () => {
  const navigate = useNavigate();
  const { currentlyWorkingOn, latestProject, latestAchievement, latestBlog, loading } = useDashboardData();

  const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.1 }
    })
  };

  return (
    <aside className="fixed right-0 top-0 h-screen w-[300px] bg-portfolio-darker/95 border-l border-portfolio-border/50 backdrop-blur-xl z-40 hidden lg:block overflow-y-auto scrollbar-thin pt-20 pb-6 px-4">
      <div className="space-y-4">
        {/* Currently Working On */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="p-4 rounded-xl bg-portfolio-card-bg/50 border border-portfolio-border/50 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-portfolio-accent/20">
              <Rocket className="w-4 h-4 text-portfolio-accent" />
            </div>
            <h3 className="font-semibold text-sm text-white">Currently Working On</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">{currentlyWorkingOn}</p>
        </motion.div>

        {/* Latest Project */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="p-4 rounded-xl bg-portfolio-card-bg/50 border border-portfolio-border/50 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <FolderKanban className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="font-semibold text-sm text-white">Latest Project</h3>
          </div>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4 bg-portfolio-border/50" />
              <Skeleton className="h-3 w-full bg-portfolio-border/50" />
            </div>
          ) : latestProject ? (
            <div>
              <h4 className="font-medium text-white text-sm mb-1">{latestProject.title}</h4>
              <p className="text-xs text-gray-400 line-clamp-2 mb-2">{latestProject.description}</p>
              {latestProject.live_url && (
                <a
                  href={latestProject.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-portfolio-accent hover:underline"
                >
                  View Project <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No projects yet</p>
          )}
        </motion.div>

        {/* Recent Achievement */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="p-4 rounded-xl bg-portfolio-card-bg/50 border border-portfolio-border/50 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Award className="w-4 h-4 text-yellow-400" />
            </div>
            <h3 className="font-semibold text-sm text-white">Recent Achievement</h3>
          </div>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4 bg-portfolio-border/50" />
              <Skeleton className="h-3 w-1/2 bg-portfolio-border/50" />
            </div>
          ) : latestAchievement ? (
            <div>
              <h4 className="font-medium text-white text-sm mb-1">{latestAchievement.title}</h4>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="px-2 py-0.5 rounded-full bg-portfolio-accent/10 text-portfolio-accent">
                  {latestAchievement.category}
                </span>
                {latestAchievement.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(latestAchievement.date), 'MMM yyyy')}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No achievements yet</p>
          )}
        </motion.div>

        {/* Last Blog Published */}
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="p-4 rounded-xl bg-portfolio-card-bg/50 border border-portfolio-border/50 backdrop-blur-sm cursor-pointer hover:border-portfolio-accent/30 transition-colors"
          onClick={() => navigate('/blog')}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <BookOpen className="w-4 h-4 text-green-400" />
            </div>
            <h3 className="font-semibold text-sm text-white">Last Blog Published</h3>
          </div>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4 bg-portfolio-border/50" />
              <Skeleton className="h-3 w-1/2 bg-portfolio-border/50" />
            </div>
          ) : latestBlog ? (
            <div>
              <h4 className="font-medium text-white text-sm mb-1 line-clamp-2">{latestBlog.title}</h4>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar className="w-3 h-3" />
                {format(new Date(latestBlog.created_at), 'MMM d, yyyy')}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No blogs yet</p>
          )}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="p-4 rounded-xl bg-gradient-to-br from-portfolio-accent/10 to-purple-500/10 border border-portfolio-accent/20"
        >
          <h3 className="font-semibold text-sm text-white mb-3">What's Happening</h3>
          <div className="space-y-2 text-xs text-gray-400">
            <p>🔥 Active on GitHub</p>
            <p>📚 Learning new technologies</p>
            <p>💼 Open for opportunities</p>
          </div>
        </motion.div>
      </div>
    </aside>
  );
};

export default RightInfoPanel;

import React from "react";
import { motion } from "framer-motion";
import { Database, Clock, TrendingUp, Activity } from "lucide-react";
import { PipelineMetrics as MetricsType } from "@/hooks/usePipelineAnimation";

interface PipelineMetricsProps {
  metrics: MetricsType;
  isVisible: boolean;
}

const PipelineMetrics: React.FC<PipelineMetricsProps> = ({ metrics, isVisible }) => {
  if (!isVisible) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-4 rounded-lg bg-[#182437]/90 border border-portfolio-accent/30 backdrop-blur-sm space-y-4"
    >
      <h3 className="text-sm font-semibold text-portfolio-accent mb-3 flex items-center gap-2">
        <Activity className="w-4 h-4" />
        Pipeline Metrics
      </h3>

      {/* Data Processed */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400 flex items-center gap-1">
            <Database className="w-3 h-3" />
            Data Points
          </span>
          <motion.span
            key={metrics.dataProcessed}
            initial={{ scale: 1.2, color: "#a855f7" }}
            animate={{ scale: 1, color: "#ffffff" }}
            className="font-mono font-semibold"
          >
            {metrics.dataProcessed.toLocaleString()}
          </motion.span>
        </div>
      </div>

      {/* Processing Time */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Time Elapsed
          </span>
          <span className="font-mono font-semibold text-white">
            {formatTime(metrics.timeElapsed)}
          </span>
        </div>
      </div>

      {/* Success Rate */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Success Rate
          </span>
          <span className="font-mono font-semibold text-green-400">
            {metrics.successRate}%
          </span>
        </div>
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${metrics.successRate}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Current Step */}
      <div className="pt-3 border-t border-portfolio-accent/20">
        <div className="text-xs text-gray-400">Current Step</div>
        <div className="text-sm font-semibold text-white mt-1">
          Step {metrics.currentStep + 1} of 9
        </div>
      </div>
    </motion.div>
  );
};

export default PipelineMetrics;

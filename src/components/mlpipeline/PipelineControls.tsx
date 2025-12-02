import React from "react";
import { Play, Pause, Square, Repeat, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { AnimationSpeed } from "@/hooks/usePipelineAnimation";
interface PipelineControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  loop: boolean;
  speed: AnimationSpeed;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onToggleLoop: () => void;
  onSpeedChange: (speed: AnimationSpeed) => void;
}
const PipelineControls: React.FC<PipelineControlsProps> = ({
  isPlaying,
  isPaused,
  loop,
  speed,
  onPlay,
  onPause,
  onStop,
  onToggleLoop,
  onSpeedChange
}) => {
  const speeds: AnimationSpeed[] = [0.5, 1, 2, 4];
  return <motion.div initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="gap-3 p-3 rounded-lg bg-[#182437]/90 border border-portfolio-accent/30 backdrop-blur-sm flex-row flex items-center max-w-fit">
      {/* Play/Pause Button */}
      <button onClick={isPlaying && !isPaused ? onPause : onPlay} className="p-2 rounded-md bg-portfolio-accent/20 hover:bg-portfolio-accent/30 transition-colors" aria-label={isPlaying && !isPaused ? "Pause" : "Play"}>
        {isPlaying && !isPaused ? <Pause className="w-5 h-5 text-portfolio-accent" /> : <Play className="w-5 h-5 text-portfolio-accent" />}
      </button>

      {/* Stop Button */}
      <button onClick={onStop} className="p-2 rounded-md bg-portfolio-accent/20 hover:bg-portfolio-accent/30 transition-colors" aria-label="Stop" disabled={!isPlaying && !isPaused}>
        <Square className="w-5 h-5 text-portfolio-accent" />
      </button>

      {/* Divider */}
      <div className="w-px h-8 bg-portfolio-accent/20" />

      {/* Speed Selector */}
      <div className="flex items-center gap-2">
        <Gauge className="w-4 h-4 text-portfolio-accent" />
        <div className="flex gap-1">
          {speeds.map(s => <button key={s} onClick={() => onSpeedChange(s)} className={`px-2 py-1 rounded text-xs font-medium transition-colors ${speed === s ? "bg-portfolio-accent text-white" : "bg-portfolio-accent/20 text-gray-300 hover:bg-portfolio-accent/30"}`}>
              {s}x
            </button>)}
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-portfolio-accent/20" />

      {/* Loop Toggle */}
      <button onClick={onToggleLoop} className={`p-2 rounded-md transition-colors ${loop ? "bg-portfolio-accent/30 text-portfolio-accent" : "bg-portfolio-accent/20 text-gray-400 hover:bg-portfolio-accent/30"}`} aria-label="Toggle Loop">
        <Repeat className="w-5 h-5" />
      </button>
    </motion.div>;
};
export default PipelineControls;
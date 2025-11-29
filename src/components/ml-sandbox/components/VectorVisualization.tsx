import React from 'react';

interface VectorVisualizationProps {
  similarity: number;
}

const VectorVisualization: React.FC<VectorVisualizationProps> = ({ similarity }) => {
  // Convert similarity (0-1) to angle (90° to 0°)
  const angle = (1 - similarity) * 90;
  
  // Color based on similarity (red -> yellow -> green)
  const getColor = (sim: number) => {
    if (sim < 0.5) {
      // Red to Yellow
      const r = 255;
      const g = Math.round(sim * 2 * 255);
      return `rgb(${r}, ${g}, 0)`;
    } else {
      // Yellow to Green
      const r = Math.round((1 - (sim - 0.5) * 2) * 255);
      const g = 255;
      return `rgb(${r}, ${g}, 0)`;
    }
  };
  
  const color = getColor(similarity);
  
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <svg width="200" height="200" viewBox="-100 -100 200 200" className="mb-4">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Center point */}
        <circle cx="0" cy="0" r="3" fill="hsl(var(--accent))" />
        
        {/* Vector A (always pointing right) */}
        <line 
          x1="0" 
          y1="0" 
          x2="80" 
          y2="0" 
          stroke={color}
          strokeWidth="3" 
          strokeLinecap="round"
          filter="url(#glow)"
          className="transition-all duration-500"
        />
        <polygon 
          points="80,0 72,-4 72,4" 
          fill={color}
          className="transition-all duration-500"
        />
        
        {/* Vector B (rotates based on similarity) */}
        <line 
          x1="0" 
          y1="0" 
          x2={80 * Math.cos((angle * Math.PI) / 180)} 
          y2={-80 * Math.sin((angle * Math.PI) / 180)} 
          stroke={color}
          strokeWidth="3" 
          strokeLinecap="round"
          filter="url(#glow)"
          className="transition-all duration-500"
        />
        <polygon 
          points={`${80 * Math.cos((angle * Math.PI) / 180)},${-80 * Math.sin((angle * Math.PI) / 180)} ${72 * Math.cos((angle * Math.PI) / 180) - 4 * Math.sin((angle * Math.PI) / 180)},${-72 * Math.sin((angle * Math.PI) / 180) - 4 * Math.cos((angle * Math.PI) / 180)} ${72 * Math.cos((angle * Math.PI) / 180) + 4 * Math.sin((angle * Math.PI) / 180)},${-72 * Math.sin((angle * Math.PI) / 180) + 4 * Math.cos((angle * Math.PI) / 180)}`}
          fill={color}
          className="transition-all duration-500"
        />
        
        {/* Angle arc */}
        {angle > 0 && (
          <path
            d={`M ${60 * Math.cos(0)},${60 * Math.sin(0)} A 60,60 0 0,0 ${60 * Math.cos((angle * Math.PI) / 180)},${-60 * Math.sin((angle * Math.PI) / 180)}`}
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1"
            strokeDasharray="2,2"
            opacity="0.5"
          />
        )}
        
        {/* Labels */}
        <text x="85" y="5" fill="hsl(var(--foreground))" fontSize="12" className="font-mono">A</text>
        <text 
          x={85 * Math.cos((angle * Math.PI) / 180)} 
          y={-85 * Math.sin((angle * Math.PI) / 180) + 5} 
          fill="hsl(var(--foreground))" 
          fontSize="12"
          className="font-mono transition-all duration-500"
        >
          B
        </text>
      </svg>
      
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-1">Angle: {angle.toFixed(1)}°</div>
        <div className="text-xs text-muted-foreground">(Lower angle = Higher similarity)</div>
      </div>
    </div>
  );
};

export default VectorVisualization;


import React from "react";

const Arrow: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center justify-center ${className || ""}`}>
    <svg
      className="w-8 h-8 md:w-10 md:h-10 animate-bounce-x"
      viewBox="0 0 48 48"
      fill="none"
    >
      <defs>
        <linearGradient id="arrow-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4fd1c5"/>
          <stop offset="1" stopColor="#38b2ac"/>
        </linearGradient>
        <filter id="glow" x="-6" y="-6" width="60" height="60">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#4fd1c566"/>
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#4fd1c5cc"/>
        </filter>
      </defs>
      <path
        d="M7 24h28M27 13l10 11-10 11"
        stroke="url(#arrow-gradient)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        filter="url(#glow)"
      />
    </svg>
  </div>
);

export default Arrow;

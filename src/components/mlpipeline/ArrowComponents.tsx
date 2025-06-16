
import React from "react";

export const ArrowDown = () => (
  <svg className="w-7 h-7 mx-auto my-2" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="arrow-down-gradient" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4"/>
        <stop offset="1" stopColor="#0891b2"/>
      </linearGradient>
    </defs>
    <path d="M16 8v16M8 20l8 8 8-8" stroke="url(#arrow-down-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowRightSvg = () => (
  <svg className="w-9 h-6 my-auto" viewBox="0 0 32 16" fill="none">
    <defs>
      <linearGradient id="arrow-right-gradient" x1="0" y1="8" x2="32" y2="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4"/>
        <stop offset="1" stopColor="#0891b2"/>
      </linearGradient>
    </defs>
    <path d="M2 8h24M25 4l5 4-5 4" stroke="url(#arrow-right-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

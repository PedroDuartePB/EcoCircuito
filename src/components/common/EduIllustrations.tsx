import React from 'react';

// Illustration 1: Plant sprout growing from smartphone in healthy soil
export const SproutDeviceIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Ground base */}
    <ellipse cx="100" cy="110" rx="75" ry="12" fill="#15803d" fillOpacity="0.15" />
    <path d="M40 108 C 70 100, 130 100, 160 108 Z" fill="#14532d" fillOpacity="0.2" />

    {/* Device lying diagonally */}
    <g transform="translate(68, 48) rotate(-15)">
      <rect x="0" y="0" width="46" height="76" rx="8" fill="#1e293b" />
      <rect x="3" y="4" width="40" height="68" rx="5" fill="#f0fdf4" />
      <circle cx="23" cy="8" r="1.5" fill="#94a3b8" />
    </g>

    {/* Sprout emerging with leaves */}
    <path d="M100 85 C 98 60, 105 45, 108 30" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" />
    {/* Left leaf */}
    <path d="M104 55 C 80 50, 75 30, 95 32 C 105 33, 104 48, 104 55 Z" fill="#22c55e" />
    {/* Right leaf */}
    <path d="M107 42 C 128 35, 132 18, 115 18 C 105 18, 106 32, 107 42 Z" fill="#4ade80" />
    {/* Dew drop */}
    <circle cx="120" cy="22" r="2" fill="#38bdf8" />
  </svg>
);

// Illustration 2: Shield with battery and safety protection
export const ShieldHealthIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <ellipse cx="100" cy="112" rx="70" ry="10" fill="#0284c7" fillOpacity="0.12" />

    {/* Protection Shield */}
    <path
      d="M100 20 L135 34 C135 68 118 96 100 106 C82 96 65 68 65 34 Z"
      fill="#0284c7"
      fillOpacity="0.12"
      stroke="#0284c7"
      strokeWidth="2.5"
    />

    {/* Inner heart of safety */}
    <path
      d="M100 48 C93 40, 80 43, 80 54 C80 64, 100 78, 100 78 C100 78, 120 64, 120 54 C120 43, 107 40, 100 48 Z"
      fill="#0369a1"
    />

    {/* Battery protected next to shield */}
    <g transform="translate(48, 48)">
      <rect x="0" y="6" width="18" height="34" rx="3" fill="#334155" />
      <rect x="5" y="2" width="8" height="4" rx="1.5" fill="#64748b" />
      <rect x="2" y="16" width="14" height="22" rx="2" fill="#38bdf8" />
    </g>

    {/* Safety cross / star */}
    <circle cx="145" cy="55" r="10" fill="#22c55e" />
    <path d="M141 55 L149 55 M145 51 L145 59" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Illustration 3: Circular recycling loop & urban mining renewal
export const CircularLoopIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <ellipse cx="100" cy="112" rx="70" ry="10" fill="#d97706" fillOpacity="0.12" />

    {/* Golden & Green Recycling Circle */}
    <g transform="translate(100, 62)">
      {/* Top curved arrow */}
      <path
        d="M-30 -10 A 34 34 0 0 1 25 -22 L 30 -32 L 38 -16 L 20 -14 L 25 -22"
        fill="#15803d"
        stroke="#15803d"
        strokeWidth="1.5"
      />
      {/* Right-bottom curved arrow */}
      <path
        d="M28 8 A 34 34 0 0 1 -16 30 L -14 38 L -32 32 L -24 16 L -16 28"
        fill="#d97706"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      {/* Electronic chip reborn in center */}
      <rect x="-14" y="-14" width="28" height="28" rx="6" fill="#14532d" />
      <circle cx="0" cy="0" r="5" fill="#facc15" />
      {/* Chip pins */}
      <line x1="-18" y1="-7" x2="-14" y2="-7" stroke="#86efac" strokeWidth="2" />
      <line x1="-18" y1="7" x2="-14" y2="7" stroke="#86efac" strokeWidth="2" />
      <line x1="14" y1="-7" x2="18" y2="-7" stroke="#86efac" strokeWidth="2" />
      <line x1="14" y1="7" x2="18" y2="7" stroke="#86efac" strokeWidth="2" />
    </g>
  </svg>
);

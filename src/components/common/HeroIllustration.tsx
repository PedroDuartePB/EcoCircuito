import React from 'react';

export const HeroIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center p-6 ${className}`}>
      {/* Background soft circular glow */}
      <div className="absolute inset-0 bg-eco-100/60 rounded-3xl -rotate-1 scale-95 blur-xs transition-transform hover:scale-100" />
      
      <svg
        viewBox="0 0 460 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full max-w-[420px] h-auto drop-shadow-sm select-none"
        aria-hidden="true"
      >
        {/* Ecological leafy loop halo */}
        <circle cx="230" cy="170" r="145" stroke="#86efac" strokeWidth="6" strokeDasharray="16 12" opacity="0.45" />
        <circle cx="230" cy="170" r="125" stroke="#22c55e" strokeWidth="2.5" strokeOpacity="0.3" />

        {/* Decorative foliage elements */}
        <path d="M120 70C125 50 150 55 150 75C135 85 120 80 120 70Z" fill="#22c55e" opacity="0.8" />
        <path d="M340 75C345 55 370 60 370 80C355 90 340 85 340 75Z" fill="#16a34a" opacity="0.85" />
        <path d="M390 190C410 195 405 220 385 220C375 205 380 190 390 190Z" fill="#4ade80" opacity="0.75" />
        <path d="M75 210C60 215 65 240 85 240C95 225 90 210 75 210Z" fill="#15803d" opacity="0.6" />

        {/* Shadow under main objects */}
        <ellipse cx="230" cy="275" rx="170" ry="18" fill="#14532d" fillOpacity="0.08" />

        {/* Main Computer Monitor */}
        <g transform="translate(105, 75)">
          {/* Monitor stand */}
          <path d="M70 145L60 175H100L90 145H70Z" fill="#cbd5e1" />
          <rect x="45" y="173" width="70" height="7" rx="3.5" fill="#94a3b8" />

          {/* Monitor outer body */}
          <rect x="0" y="0" width="160" height="120" rx="14" fill="#0f172a" />
          {/* Monitor screen bezel */}
          <rect x="7" y="7" width="146" height="106" rx="8" fill="#0284c7" fillOpacity="0.85" />
          {/* Screen background with subtle circuit */}
          <rect x="10" y="10" width="140" height="100" rx="6" fill="#0369a1" />

          {/* Large recycling arrows loop on screen */}
          <g transform="translate(80, 60)">
            <path
              d="M-22 -8 A 24 24 0 0 1 18 -16 L 22 -24 L 28 -12 L 14 -10 L 18 -16"
              fill="#fef08a"
              stroke="#fef08a"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M20 5 A 24 24 0 0 1 -12 22 L -10 28 L -24 24 L -18 12 L -12 20"
              fill="#86efac"
              stroke="#86efac"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="0" cy="0" r="5" fill="#ffffff" />
          </g>

          {/* Webcam dot */}
          <circle cx="80" cy="4" r="1.5" fill="#64748b" />
        </g>

        {/* Green Recycling Bin (Right of monitor, matching Figma) */}
        <g transform="translate(255, 100)">
          {/* Bin body */}
          <path
            d="M15 40 L22 150 C23 158 30 165 38 165 H72 C80 165 87 158 88 150 L95 40 Z"
            fill="#15803d"
          />
          {/* Bin 3D shadow gradient side */}
          <path
            d="M60 40 L65 150 C67 158 74 165 72 165 H72 C80 165 87 158 88 150 L95 40 Z"
            fill="#14532d"
            opacity="0.3"
          />
          {/* Bin lid */}
          <rect x="10" y="30" width="90" height="13" rx="4" fill="#166534" />
          <rect x="35" y="24" width="40" height="8" rx="3" fill="#14532d" />

          {/* Recycling symbol on bin */}
          <g transform="translate(55, 95) scale(0.9)">
            <path
              d="M0 -20 L-6 -10 H-1 L-1 -2 H3 L3 -10 H8 Z"
              fill="#ffffff"
            />
            <path
              d="M-18 12 L-10 6 L-7 10 L0 5 L-2 1 L-6 3 L-12 -6 Z"
              fill="#ffffff"
            />
            <path
              d="M18 12 L12 -6 L6 3 L2 1 L0 5 L7 10 L10 6 Z"
              fill="#ffffff"
            />
          </g>
        </g>

        {/* Small Smartphone (in front of bin) */}
        <g transform="translate(305, 175)">
          <rect x="0" y="0" width="38" height="68" rx="6" fill="#1e293b" />
          <rect x="2.5" y="3.5" width="33" height="61" rx="4" fill="#f8fafc" />
          <circle cx="19" cy="34" r="9" fill="#22c55e" fillOpacity="0.2" />
          <path d="M16 34 L18 36 L23 31" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Battery with charge indicator (in front of monitor) */}
        <g transform="translate(130, 215)">
          <rect x="6" y="8" width="22" height="42" rx="4" fill="#334155" />
          <rect x="13" y="4" width="8" height="4" rx="1.5" fill="#94a3b8" />
          {/* Green charge fill */}
          <rect x="8" y="22" width="18" height="26" rx="2" fill="#22c55e" />
          {/* Lightning symbol */}
          <path d="M18 14 L14 26 H18 L16 34 L21 22 H17 Z" fill="#facc15" />
        </g>

        {/* Cables / Wires coiled on ground */}
        <path
          d="M165 245 C 190 265, 230 250, 250 260 C 270 270, 290 255, 305 245"
          stroke="#0284c7"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="165" cy="245" r="3.5" fill="#0284c7" />
        <rect x="300" y="241" width="10" height="7" rx="2" fill="#475569" />

        {/* Floating eco sparkles and nodes */}
        <g fill="#22c55e">
          <circle cx="100" cy="120" r="3" />
          <circle cx="360" cy="140" r="3" />
          <circle cx="210" cy="60" r="2.5" />
          <circle cx="380" cy="240" r="2.5" />
        </g>
      </svg>
    </div>
  );
};

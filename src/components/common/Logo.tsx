import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark' }) => {
  const isLight = variant === 'light';

  return (
    <a 
      href="#inicio" 
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight text-xl transition-opacity hover:opacity-90 ${className}`}
      aria-label="EcoCircuito - Início"
    >
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-eco-900 text-white shadow-sm overflow-hidden">
        {/* Leaf & circuit tech integrated icon matching Figma */}
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-5 h-5 text-eco-400"
        >
          <path 
            d="M8 24C8 17.3726 13.3726 12 20 12H24V16C24 22.6274 18.6274 28 12 28H8V24Z" 
            fill="currentColor" 
            fillOpacity="0.25"
          />
          <path 
            d="M8 24C12 24 16 20 20 12" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          <circle cx="20" cy="12" r="3" fill="#4ade80" />
          <circle cx="10" cy="22" r="2" fill="#22c55e" />
          <path 
            d="M14 18L18 22M22 16L24 14" 
            stroke="#86efac" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      </div>

      <span className={`text-2xl font-extrabold ${isLight ? 'text-white' : 'text-eco-900'}`}>
        Eco<span className={isLight ? 'text-eco-300' : 'text-eco-600'}>Circuito</span>
      </span>
    </a>
  );
};

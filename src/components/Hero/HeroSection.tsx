import React from 'react';
import { Check } from 'lucide-react';
import { HeroIllustration } from '../common/HeroIllustration';
import { SearchBar } from './SearchBar';

interface HeroSectionProps {
  onSearch: (filters: { locationQuery: string; materialType: string }) => void;
  onLocateUser: (coords: { latitude: number; longitude: number }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch, onLocateUser }) => {
  return (
    <section 
      id="inicio" 
      className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Soft pastel green container backdrop matching Figma desktop */}
        <div className="bg-gradient-to-br from-[#EEF7F1] via-[#F4FAF6] to-[#EDF6F1] rounded-[2.5rem] p-6 sm:p-10 lg:p-14 border border-eco-200/50 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Badge matching Figma */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-eco-800 text-xs font-bold uppercase tracking-wider mb-5 shadow-xs border border-eco-200/60">
                <span className="w-2 h-2 rounded-full bg-eco-500 animate-pulse" />
                <span>Descarte responsável e seguro</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-eco-900 leading-[1.12] tracking-tight mb-5">
                Descarte seu lixo eletrônico do jeito certo.
              </h1>

              {/* Subheading / Explanatory text */}
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 max-w-xl font-normal">
                Seu eletrônico pode ter um novo destino. Encontre pontos de coleta perto de você e transforme pequenos gestos em grandes mudanças.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-eco-800 mb-8">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-eco-600 text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span>Pontos verificados</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-eco-600 text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span>Capacidade em tempo real</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-eco-600 text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span>100% Gratuito e anônimo</span>
                </div>
              </div>

              {/* Search Bar Component */}
              <div className="w-full">
                <SearchBar onSearch={onSearch} onLocateUser={onLocateUser} />
              </div>
            </div>

            {/* Right Illustration Column */}
            <div className="lg:col-span-5 flex justify-center items-center order-first lg:order-last">
              <HeroIllustration className="w-full max-w-md transform hover:scale-[1.02] transition-transform duration-300" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

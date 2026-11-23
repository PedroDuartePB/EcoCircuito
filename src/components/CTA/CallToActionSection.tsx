import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';

interface CallToActionSectionProps {
  onOpenRegister: () => void;
  onScrollToPoints: () => void;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  onOpenRegister,
  onScrollToPoints,
}) => {
  return (
    <section className="py-20 sm:py-24 bg-eco-900 text-white relative overflow-hidden text-center">
      {/* Soft circular background ambient light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-eco-800/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-eco-300 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Comece agora mesmo</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight">
          Faça parte do circuito.
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-eco-100/80 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          O descarte correto começa com uma atitude simples. Encontre agora o ponto mais próximo de você e ajude a transformar resíduos em futuro.
        </p>

        {/* Action Buttons matching Figma */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {/* Yellow Primary Button */}
          <button
            onClick={onOpenRegister}
            type="button"
            className="w-full sm:w-auto px-8 py-4 bg-eco-yellow hover:bg-eco-yellowHover text-slate-900 font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            Cadastrar-se
          </button>

          {/* White Secondary Button */}
          <button
            onClick={onScrollToPoints}
            type="button"
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-100 text-eco-900 font-bold text-sm sm:text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4 text-eco-700" />
            <span>Encontrar ponto de coleta</span>
          </button>
        </div>

        {/* Footnote */}
        <p className="mt-8 text-xs text-eco-200/60 font-normal">
          Plataforma pública e gratuita. Sem viés comercial ou cobrança de taxas aos cidadãos.
        </p>

      </div>
    </section>
  );
};

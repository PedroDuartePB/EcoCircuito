import React, { useState } from 'react';
import { EducationalArticle } from '../../types';
import { EDUCATIONAL_ARTICLES } from '../../data/mockData';
import { ArticleModal } from './ArticleModal';
import { 
  SproutDeviceIllustration, 
  ShieldHealthIllustration, 
  CircularLoopIllustration 
} from '../common/EduIllustrations';
import { ArrowRight, ShieldAlert } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);

  const getIllustration = (type: string) => {
    switch (type) {
      case 'environment':
        return <SproutDeviceIllustration className="w-full h-36" />;
      case 'health':
        return <ShieldHealthIllustration className="w-full h-36" />;
      case 'circular':
        return <CircularLoopIllustration className="w-full h-36" />;
      default:
        return null;
    }
  };

  return (
    <section id="educacao" className="py-14 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Figma */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-eco-700 block mb-2">
              Educação Ambiental
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-eco-900 tracking-tight">
              Por que descartar corretamente?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              Informações que fazem bem para você e para o meio ambiente.
            </p>
          </div>

          <button
            onClick={() => setSelectedArticle(EDUCATIONAL_ARTICLES[0])}
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-eco-800 hover:text-eco-950 transition-colors self-start sm:self-auto"
          >
            <span>Materiais educativos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Educational Cards matching Figma */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {EDUCATIONAL_ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden hover:border-eco-400 hover:shadow-lg hover:shadow-eco-900/5 transition-all duration-200 flex flex-col justify-between cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedArticle(art);
                }
              }}
              aria-label={`Ler artigo: ${art.title}`}
            >
              {/* Top Colored Illustration Area */}
              <div className="p-6 bg-slate-50 flex items-center justify-center border-b border-slate-100 group-hover:bg-eco-50/50 transition-colors">
                {getIllustration(art.iconType)}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider mb-3 ${art.badgeColor}`}>
                    {art.tag}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-eco-900 transition-colors mb-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {art.summary}
                  </p>
                </div>

                {/* Read more link */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-eco-800 group-hover:text-eco-950">
                  <span>Saiba mais</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 30-Day Highlight Card matching Figma banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#EEF7F1] via-[#F4FAF6] to-[#EEF7F1] border border-eco-200/60 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="text-4xl sm:text-5xl font-black text-eco-900 tracking-tight">
              864 kg
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-eco-900">
                coletados nos últimos 30 dias em João Pessoa (PB)
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Fonte: Registros de descarte da plataforma. Dados agregados e atualizados em 23/11/2026.
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 text-right shrink-0">
            * Quantidade encaminhada para triagem e logística reversa certificada.
          </div>
        </div>

        {/* Hazardous Waste Safety Notice (RF03 / Safety Requirement) */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3.5 text-xs text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Aviso de Segurança para Resíduos Danificados:</strong> Nunca desmonte baterias estufadas ou tente quebrar tubos de telas e lâmpadas. Isole os polos elétricos com fita adesiva e entregue em recipiente seguro. Orientações elaboradas conforme diretrizes técnicas do MMA e da ABNT.
          </div>
        </div>

      </div>

      {/* Article Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};

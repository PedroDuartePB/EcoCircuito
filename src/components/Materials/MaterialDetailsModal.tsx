import React from 'react';
import { MaterialCategoryInfo } from '../../types';
import { 
  X, CheckCircle, AlertTriangle, ShieldCheck, HeartHandshake 
} from 'lucide-react';

interface MaterialDetailsModalProps {
  category: MaterialCategoryInfo | null;
  onClose: () => void;
  onFilterByMaterial?: (materialName: string) => void;
}

export const MaterialDetailsModal: React.FC<MaterialDetailsModalProps> = ({
  category,
  onClose,
  onFilterByMaterial,
}) => {
  if (!category) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="material-details-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Fechar detalhes do material"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Category Header */}
        <div className="pr-10 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-eco-100 text-eco-800">
              Guia de Descarte
            </span>
            {category.isHazardous ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                Resíduo com Cuidados Especiais
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800">
                100% Reciclável
              </span>
            )}
          </div>

          <h2 id="material-details-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {category.name}
          </h2>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Examples */}
        <div className="mb-5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
            Exemplos de equipamentos incluídos:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {category.examples.map((ex, i) => (
              <span key={i} className="text-xs font-medium text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                {ex}
              </span>
            ))}
          </div>
        </div>

        {/* Reuse / Donation Encouragement (ODS 12 / Ethical Requirement) */}
        <div className="mb-5 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-900">
          <div className="flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                Antes de descartar: Considere a reutilização ou doação!
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {category.reuseRecommendation}
              </p>
            </div>
          </div>
        </div>

        {/* Proper Handling Instructions */}
        <div className="mb-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-eco-700" />
            Instruções de Descarte Seguro e Preparação
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {category.properDisposalGuide}
          </p>
        </div>

        {/* Safety Hazards Warning (if hazardous) */}
        {category.safetyHazards && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              Alerta de Segurança (Evite Riscos à Saúde)
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              {category.safetyHazards}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          {onFilterByMaterial && (
            <button
              onClick={() => {
                onClose();
                onFilterByMaterial(category.name);
                const target = document.getElementById('pontos-de-coleta');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              type="button"
              className="flex-1 py-3 px-4 bg-eco-900 hover:bg-eco-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
            >
              Encontrar pontos que aceitam {category.name}
            </button>
          )}

          <button
            onClick={onClose}
            type="button"
            className="py-3 px-5 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>

        {/* Technical Validation source */}
        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-eco-600 shrink-0" />
          <span>Informações validadas conforme a Política Nacional de Resíduos Sólidos (Lei 12.305/2010).</span>
        </div>
      </div>
    </div>
  );
};

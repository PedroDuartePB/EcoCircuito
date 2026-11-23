import React from 'react';
import { ShieldCheck, MapPin, X } from 'lucide-react';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loc-perm-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7 border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Fechar diálogo de permissão"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-eco-100 flex items-center justify-center text-eco-800">
            <MapPin className="w-6 h-6 text-eco-700" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-wider text-eco-700 uppercase">Privacidade e LGPD</span>
            <h3 id="loc-perm-title" className="text-lg font-bold text-slate-900">
              Usar sua localização atual?
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          O <strong>EcoCircuito</strong> calcula a distância em linha reta até os pontos de coleta mais próximos de você para facilitar o descarte.
        </p>

        {/* Ethical guarantees bullet points */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-2 mb-6">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-eco-600 shrink-0 mt-0.5" />
            <span>Suas coordenadas geográficas são usadas <strong>exclusivamente</strong> para ordenar os pontos neste momento.</span>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-eco-600 shrink-0 mt-0.5" />
            <span><strong>Nenhum histórico</strong> de deslocamento é salvo em seu perfil ou transmitido para terceiros/publicidade.</span>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-eco-600 shrink-0 mt-0.5" />
            <span>A busca manual por cidade ou bairro continua 100% disponível se preferir não compartilhar.</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            type="button"
            className="flex-1 py-3 px-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Continuar com busca manual
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="flex-1 py-3 px-4 text-sm font-semibold text-white bg-eco-900 hover:bg-eco-800 active:bg-eco-950 rounded-xl shadow-md transition-colors"
          >
            Permitir localização
          </button>
        </div>
      </div>
    </div>
  );
};

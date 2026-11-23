import React from 'react';
import { CollectionPoint } from '../../types';
import { 
  X, MapPin, Clock, Phone, ShieldCheck, Check, Ban, 
  Navigation, AlertTriangle, AlertCircle, ExternalLink, Info 
} from 'lucide-react';

interface CollectionPointDetailsModalProps {
  point: CollectionPoint | null;
  onClose: () => void;
  onOpenDisposalForPoint?: (point: CollectionPoint) => void;
}

export const CollectionPointDetailsModal: React.FC<CollectionPointDetailsModalProps> = ({
  point,
  onClose,
  onOpenDisposalForPoint,
}) => {
  if (!point) return null;

  // External GPS Route URL (Google Maps directions)
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}&destination_place_id=${encodeURIComponent(point.name)}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="point-details-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Fechar detalhes do ponto"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header with Name & Verification */}
        <div className="pr-10 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-eco-100 text-eco-800">
              Ponto de Coleta
            </span>
            {point.isVerified ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Estabelecimento Verificado
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                Cadastro Comunitário
              </span>
            )}
            {point.distanceKm !== undefined && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                A {point.distanceKm.toFixed(1).replace('.', ',')} km de você
              </span>
            )}
          </div>

          <h2 id="point-details-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {point.name}
          </h2>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-eco-700 shrink-0" />
            <span>{point.address} — {point.neighborhood}, {point.city} - {point.state}</span>
          </p>
        </div>

        {/* Capacity Warning Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {point.capacityStatus === 'available' ? (
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              ) : point.capacityStatus === 'near_limit' ? (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <div>
                <div className="text-sm font-bold text-slate-800">
                  {point.capacityStatus === 'available'
                    ? 'Disponível para receber novos descartes'
                    : point.capacityStatus === 'near_limit'
                    ? `Próximo do limite de armazenamento (${point.capacityPercentage}%)`
                    : 'Ponto com capacidade lotada no momento'}
                </div>
                <div className="text-xs text-slate-500">
                  {point.capacityStatus === 'full' 
                    ? 'Recomendamos utilizar outros ecopontos disponíveis para evitar perda de viagem.'
                    : 'A capacidade é monitorada pela cooperativa para evitar superlotação.'}
                </div>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 shrink-0">
              Atualizado: {point.lastUpdated.split('-').reverse().join('/')}
            </span>
          </div>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Operating Hours & Contact */}
          <div className="space-y-3.5 text-sm">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Horário de Atendimento
              </span>
              <div className="flex items-start gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-eco-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{point.operatingHours.weekdays}</p>
                  {point.operatingHours.saturday && (
                    <p className="text-slate-500">{point.operatingHours.saturday}</p>
                  )}
                  {point.operatingHours.sunday ? (
                    <p className="text-slate-500">{point.operatingHours.sunday}</p>
                  ) : (
                    <p className="text-slate-400 text-xs">Domingos e feriados: Fechado</p>
                  )}
                </div>
              </div>
            </div>

            {point.phone && (
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Contato
                </span>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-eco-700 shrink-0" />
                  <span className="font-semibold">{point.phone}</span>
                </div>
              </div>
            )}

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Custos de Recebimento
              </span>
              <p className="font-semibold text-emerald-800">
                {point.isFree ? '100% Gratuito para a população' : point.costDescription || 'Não informado'}
              </p>
            </div>
          </div>

          {/* Receiving Conditions & Responsible */}
          <div className="space-y-3.5 text-sm">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Condições de Recebimento
              </span>
              <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed text-xs">
                {point.receivingConditions}
              </p>
            </div>

            {point.responsibleName && (
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Responsável pelo Ponto
                </span>
                <p className="font-semibold text-slate-800 text-xs">
                  {point.responsibleName}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Accepted vs Unaccepted Materials (RF02, RF10) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Accepted */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
              Materiais Aceitos
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
              {point.acceptedMaterials.map((mat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Unaccepted */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
            <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Ban className="w-4 h-4 text-rose-700" />
              Materiais NÃO Aceitos
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
              {point.unacceptedMaterials.map((mat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Services offered */}
        {point.servicesOffered.length > 0 && (
          <div className="mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Serviços Oferecidos
            </span>
            <div className="flex flex-wrap gap-2">
              {point.servicesOffered.map((srv, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700"
                >
                  ✓ {srv}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions Bar: Route & Disposal Recording */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 bg-eco-900 hover:bg-eco-800 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4 text-eco-300" />
            <span>Ver rota no mapa (GPS)</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          {onOpenDisposalForPoint && (
            <button
              onClick={() => {
                onClose();
                onOpenDisposalForPoint(point);
              }}
              type="button"
              className="py-3 px-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-sm rounded-xl transition-colors"
            >
              Registrar descarte neste ponto
            </button>
          )}

          <button
            onClick={onClose}
            type="button"
            className="py-3 px-4 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>

        {/* Transparency Footnote */}
        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Informações mantidas pela cooperativa responsável. Dados não presumidos.</span>
        </div>
      </div>
    </div>
  );
};

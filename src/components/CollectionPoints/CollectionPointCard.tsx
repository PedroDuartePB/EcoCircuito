import React from 'react';
import { CollectionPoint } from '../../types';
import { MapPin, Clock, AlertTriangle, AlertCircle, ShieldCheck, ChevronRight } from 'lucide-react';

interface CollectionPointCardProps {
  point: CollectionPoint;
  isSelected: boolean;
  onSelect: (point: CollectionPoint) => void;
  onOpenDetails: (point: CollectionPoint) => void;
}

export const CollectionPointCard: React.FC<CollectionPointCardProps> = ({
  point,
  isSelected,
  onSelect,
  onOpenDetails,
}) => {
  // Format capacity badge according to Figma
  const renderCapacityBadge = () => {
    switch (point.capacityStatus) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Disponível para receber
          </span>
        );
      case 'near_limit':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            Próximo do limite ({point.capacityPercentage}%)
          </span>
        );
      case 'full':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            Ponto lotado no momento
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => onSelect(point)}
      className={`group relative bg-white rounded-3xl p-5 sm:p-6 transition-all duration-200 cursor-pointer border ${
        isSelected
          ? 'border-eco-600 shadow-lg shadow-eco-900/5 ring-2 ring-eco-500/20'
          : 'border-slate-200/90 hover:border-eco-300 hover:shadow-md'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(point);
        }
      }}
      aria-label={`Ver detalhes do ponto de coleta ${point.name}`}
    >
      {/* Top row: Name & Distance */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-eco-900 transition-colors">
              {point.name}
            </h3>
            {point.isVerified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-eco-700 bg-eco-50 px-2 py-0.5 rounded-md border border-eco-200" title="Ponto validado com documentação regular">
                <ShieldCheck className="w-3 h-3 text-eco-600" />
                Verificado
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-md">{point.address}</span>
          </p>
        </div>

        {/* Distance Pill */}
        {point.distanceKm !== undefined && (
          <span className="shrink-0 px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            {point.distanceKm.toFixed(1).replace('.', ',')} km
          </span>
        )}
      </div>

      {/* Operating Hours */}
      <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3.5 font-medium">
        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>{point.operatingHours.weekdays}</span>
      </div>

      {/* Accepted Material Badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {point.acceptedMaterials.slice(0, 3).map((mat, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 border border-slate-100"
          >
            {mat}
          </span>
        ))}
        {point.acceptedMaterials.length > 3 && (
          <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">
            +{point.acceptedMaterials.length - 3}
          </span>
        )}
      </div>

      {/* Bottom Status & Details Trigger */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
        <div>{renderCapacityBadge()}</div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(point);
          }}
          type="button"
          className="inline-flex items-center gap-1 text-xs font-bold text-eco-800 hover:text-eco-950 transition-colors focus:outline-none focus:underline"
        >
          <span>Ver detalhes e rota</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Last update transparency tag */}
      <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
        <span>Atualizado: {point.lastUpdated.split('-').reverse().join('/')}</span>
        {point.isFree ? <span className="text-emerald-700 font-semibold">✓ Recebimento gratuito</span> : null}
      </div>
    </div>
  );
};

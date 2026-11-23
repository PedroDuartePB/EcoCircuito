import React, { useState } from 'react';
import { CollectionPoint, PointSearchFilters } from '../../types';
import { CollectionPointCard } from './CollectionPointCard';
import { CollectionMap } from './CollectionMap';
import { CollectionPointDetailsModal } from './CollectionPointDetailsModal';
import { MATERIAL_CATEGORIES } from '../../data/mockData';
import { Filter, RotateCcw, AlertCircle, ArrowRight } from 'lucide-react';

interface CollectionPointsSectionProps {
  points: CollectionPoint[];
  isLoading: boolean;
  filters: PointSearchFilters;
  onFilterChange: (filters: PointSearchFilters) => void;
  userCoords?: { latitude: number; longitude: number } | null;
  onOpenDisposalForPoint?: (point: CollectionPoint) => void;
}

export const CollectionPointsSection: React.FC<CollectionPointsSectionProps> = ({
  points,
  isLoading,
  filters,
  onFilterChange,
  userCoords,
  onOpenDisposalForPoint,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(points[0] || null);
  const [modalPoint, setModalPoint] = useState<CollectionPoint | null>(null);

  const handleMaterialChip = (matName: string) => {
    if (filters.materialType === matName) {
      onFilterChange({ ...filters, materialType: 'all' });
    } else {
      onFilterChange({ ...filters, materialType: matName });
    }
  };

  const toggleOnlyAvailable = () => {
    onFilterChange({ ...filters, onlyAvailable: !filters.onlyAvailable });
  };

  const toggleOnlyFree = () => {
    onFilterChange({ ...filters, onlyFree: !filters.onlyFree });
  };

  const resetFilters = () => {
    onFilterChange({
      locationQuery: '',
      materialType: 'all',
      onlyAvailable: false,
      onlyFree: false,
    });
  };

  return (
    <section id="pontos-de-coleta" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Figma */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-eco-700 block mb-2">
              Pontos de Coleta
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-eco-900 tracking-tight">
              Seu próximo descarte começa aqui.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {filters.locationQuery 
                ? `Exibindo pontos de coleta para "${filters.locationQuery}".` 
                : 'Pontos de coleta em João Pessoa, PB prontos para receber seu descarte.'}
            </p>
          </div>

          {/* Quick link on top right */}
          <button
            onClick={resetFilters}
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-eco-800 hover:text-eco-950 transition-colors self-start md:self-auto"
          >
            <span>Ver todos os pontos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pb-6 mb-8 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtros:</span>
          </div>

          {/* All Materials */}
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, materialType: 'all' })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              !filters.materialType || filters.materialType === 'all'
                ? 'bg-eco-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Todos os materiais
          </button>

          {/* Specific Material Chips */}
          {MATERIAL_CATEGORIES.slice(0, 4).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleMaterialChip(cat.name)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filters.materialType === cat.name
                  ? 'bg-eco-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}

          {/* Only Available Toggle */}
          <button
            type="button"
            onClick={toggleOnlyAvailable}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              filters.onlyAvailable
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${filters.onlyAvailable ? 'bg-white' : 'bg-emerald-500'}`} />
            <span>Apenas com espaço disponível</span>
          </button>

          {/* Free Collection Toggle */}
          <button
            type="button"
            onClick={toggleOnlyFree}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filters.onlyFree
                ? 'bg-eco-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Coleta 100% gratuita
          </button>

          {/* Reset button if active */}
          {(filters.materialType !== 'all' || filters.onlyAvailable || filters.onlyFree || filters.locationQuery) && (
            <button
              type="button"
              onClick={resetFilters}
              className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-full transition-colors"
              title="Limpar todos os filtros"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>

        {/* 2-Column Responsive Layout: Cards List (Left) + Interactive Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Points Cards List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {isLoading ? (
              <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-3xl">
                <div className="w-8 h-8 border-3 border-eco-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm font-semibold">Localizando pontos compatíveis...</p>
              </div>
            ) : points.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-3xl border border-slate-200">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  Nenhum ponto encontrado com esses filtros
                </h3>
                <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                  Tente ampliar a localização ou remover filtros restritivos para encontrar outros locais de descarte.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 text-xs font-bold text-white bg-eco-900 hover:bg-eco-800 rounded-xl transition-colors"
                >
                  Restaurar todos os pontos
                </button>
              </div>
            ) : (
              points.map((pt) => (
                <CollectionPointCard
                  key={pt.id}
                  point={pt}
                  isSelected={selectedPoint?.id === pt.id}
                  onSelect={(p) => setSelectedPoint(p)}
                  onOpenDetails={(p) => setModalPoint(p)}
                />
              ))
            )}
          </div>

          {/* Right Column: Interactive Map */}
          <div className="lg:col-span-7 sticky top-24">
            <CollectionMap
              points={points}
              selectedPoint={selectedPoint}
              onSelectPoint={(p) => {
                setSelectedPoint(p);
                setModalPoint(p);
              }}
              userCoords={userCoords}
            />
          </div>

        </div>

      </div>

      {/* Point Details Modal */}
      <CollectionPointDetailsModal
        point={modalPoint}
        onClose={() => setModalPoint(null)}
        onOpenDisposalForPoint={onOpenDisposalForPoint}
      />
    </section>
  );
};

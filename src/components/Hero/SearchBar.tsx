import React, { useState } from 'react';
import { MapPin, Search, ChevronDown } from 'lucide-react';
import { MATERIAL_CATEGORIES } from '../../data/mockData';
import { LocationPermissionModal } from '../Modals/LocationPermissionModal';

interface SearchBarProps {
  onSearch: (filters: { locationQuery: string; materialType: string }) => void;
  onLocateUser: (coords: { latitude: number; longitude: number }) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocateUser }) => {
  const [locationQuery, setLocationQuery] = useState('João Pessoa, PB');
  const [materialType, setMaterialType] = useState('all');
  const [isPermModalOpen, setIsPermModalOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ locationQuery, materialType });
    const target = document.getElementById('pontos-de-coleta');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestLocation = () => {
    setIsPermModalOpen(true);
  };

  const handleConfirmLocation = () => {
    setIsPermModalOpen(false);
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada pelo seu navegador. Por favor, use a busca manual.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setLocationSuccess(true);
        setLocationQuery('Sua localização atual');
        onLocateUser({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setTimeout(() => setLocationSuccess(false), 4000);
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation error:', err);
        alert('Não foi possível obter a localização exata. A busca manual continua ativa para sua comodidade.');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-3 sm:p-4 shadow-xl shadow-slate-900/5 border border-slate-200/80 transition-all hover:border-slate-300"
      >
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Location field */}
          <div className="flex-1 flex items-center px-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-eco-500 rounded-2xl transition-all border border-slate-100">
            <MapPin className="w-5 h-5 text-eco-700 shrink-0 mr-3" />
            <div className="w-full">
              <label htmlFor="search-location" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Sua localização
              </label>
              <input
                id="search-location"
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Ex: João Pessoa, Bancários, Manaíra..."
                className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Material Category select */}
          <div className="flex-1 flex items-center px-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-eco-500 rounded-2xl transition-all border border-slate-100 relative">
            <div className="w-full">
              <label htmlFor="search-material" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Tipo de item
              </label>
              <div className="relative">
                <select
                  id="search-material"
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-800 focus:outline-none appearance-none pr-8 cursor-pointer"
                >
                  <option value="all">Tipo de resíduo eletrônico...</option>
                  {MATERIAL_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full lg:w-auto px-7 py-4 bg-eco-900 hover:bg-eco-800 active:bg-eco-950 text-white font-bold text-sm sm:text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:ring-offset-2 shrink-0"
          >
            <Search className="w-5 h-5 text-eco-300" />
            <span>Buscar pontos de coleta</span>
          </button>
        </div>
      </form>

      {/* Ethical Location Guarantee & Link */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-slate-500">
        <button
          type="button"
          onClick={handleRequestLocation}
          className="inline-flex items-center gap-1.5 font-semibold text-eco-700 hover:text-eco-900 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-eco-500 rounded"
        >
          <MapPin className="w-3.5 h-3.5" />
          {isLocating ? 'Obtendo GPS...' : locationSuccess ? 'Localização atual aplicada!' : 'Usar sua localização atual 📍'}
        </button>

        <span className="text-slate-400 text-[11px]">
          Busca imparcial com respeito à sua privacidade (LGPD).
        </span>
      </div>

      {/* Permission Modal */}
      <LocationPermissionModal
        isOpen={isPermModalOpen}
        onClose={() => setIsPermModalOpen(false)}
        onConfirm={handleConfirmLocation}
      />
    </div>
  );
};

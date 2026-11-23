import React, { useState } from 'react';
import { MaterialCategoryInfo } from '../../types';
import { MATERIAL_CATEGORIES } from '../../data/mockData';
import { MaterialDetailsModal } from './MaterialDetailsModal';
import { 
  Smartphone, Laptop, BatteryCharging, Plug, Coffee, Lightbulb, 
  ArrowRight, Sparkles 
} from 'lucide-react';

interface MaterialsSectionProps {
  onFilterByMaterial?: (materialName: string) => void;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({ onFilterByMaterial }) => {
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategoryInfo | null>(null);

  // Map icon name to Lucide component
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return Smartphone;
      case 'Laptop':
        return Laptop;
      case 'BatteryCharging':
        return BatteryCharging;
      case 'Plug':
        return Plug;
      case 'Coffee':
        return Coffee;
      case 'Lightbulb':
        return Lightbulb;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="guia" className="py-14 sm:py-20 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching Figma */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-eco-700 block mb-2">
            Guia de Materiais Aceitos
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-eco-900 tracking-tight">
            O que você pode descartar?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            Selecione uma categoria para consultar orientações de descarte e cuidados com resíduos.
          </p>
        </div>

        {/* 6 Category Cards Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {MATERIAL_CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.iconName);

            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className="group relative bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-eco-400 hover:shadow-lg hover:shadow-eco-900/5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedCategory(cat);
                  }
                }}
                aria-label={`Ver orientações para ${cat.name}`}
              >
                <div>
                  {/* Category Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-eco-50 text-eco-800 group-hover:bg-eco-900 group-hover:text-white flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Category Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-eco-900 transition-colors mb-2">
                    {cat.name}
                  </h3>

                  {/* Brief description */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Trigger Link */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-eco-800 group-hover:text-eco-950">
                  <span>Ver orientações</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Details Modal */}
      <MaterialDetailsModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onFilterByMaterial={onFilterByMaterial}
      />
    </section>
  );
};

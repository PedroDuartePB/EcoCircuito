import React from 'react';
import { EnvironmentalStats } from '../../types';
import { Database, Calendar } from 'lucide-react';

interface ImpactSectionProps {
  stats: EnvironmentalStats;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ stats }) => {
  return (
    <div className="pt-8 border-t border-slate-200">
      {/* Banner matching Figma bottom row */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Title */}
          <div className="lg:col-span-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-eco-900 tracking-tight mb-2">
              Juntos, fechamos o ciclo.
            </h3>
            <p className="text-sm text-slate-600 font-normal">
              Impacto coletivo registrado e auditado pela plataforma em João Pessoa.
            </p>
          </div>

          {/* Right Metrics Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 sm:border-l sm:border-slate-100 sm:pl-8">
            {/* Metric 1 */}
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-eco-900 tracking-tight">
                {stats.totalDisposalsCount.toLocaleString('pt-BR')}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                descartes registrados
              </div>
            </div>

            {/* Metric 2 */}
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-eco-900 tracking-tight">
                {stats.activePointsCount}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                pontos de coleta ativos
              </div>
            </div>

            {/* Metric 3 */}
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-eco-900 tracking-tight">
                {stats.totalCollectedKg.toLocaleString('pt-BR')} kg
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                resíduos encaminhados
              </div>
            </div>
          </div>

        </div>

        {/* Data Provenance & Methodology Footnote (Ethical Requirement US 30) */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-eco-700 shrink-0" />
            <span><strong>Fonte dos dados:</strong> {stats.dataSource}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Período: {stats.period}</span>
            </span>
            <span>Atualizado: {stats.lastUpdated.split('-').reverse().join('/')}</span>
            <span className="text-emerald-700 font-medium">
              * {stats.recycledVerifiedKg} kg com laudo final de reciclagem emitido.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

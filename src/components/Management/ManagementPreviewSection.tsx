import React, { useState } from 'react';
import { Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { capacityService } from '../../services/capacityService';

interface ManagementPreviewSectionProps {
  onOpenManagerAuth: () => void;
}

export const ManagementPreviewSection: React.FC<ManagementPreviewSectionProps> = ({
  onOpenManagerAuth,
}) => {
  const [capacityPercent, setCapacityPercent] = useState(62);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulateUpdate = async (newVal: number) => {
    setCapacityPercent(newVal);
    setIsSimulating(true);
    try {
      await capacityService.updateCapacity('pt-1', newVal);
    } catch (err) {
      console.warn(err);
    } finally {
      setTimeout(() => setIsSimulating(false), 500);
    }
  };

  return (
    <section id="para-responsaveis" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, description & access button */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-eco-700 block mb-2">
              Para Gestores de Pontos de Coleta
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-eco-900 tracking-tight leading-tight mb-4">
              Mais controle.<br />Mais espaço para transformar.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
              Acompanhe o volume recebido, atualize a capacidade do seu ponto e organize o fluxo de atendimento da comunidade em um único lugar.
            </p>

            {/* Bullets */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-eco-100 flex items-center justify-center text-eco-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  Disponibilidade por tipo de resíduo
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-eco-100 flex items-center justify-center text-eco-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  Histórico de descartes recebidos
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-eco-100 flex items-center justify-center text-eco-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  Notificações para evitar a lotação
                </span>
              </div>
            </div>

            {/* Access button */}
            <button
              onClick={onOpenManagerAuth}
              type="button"
              className="px-8 py-3.5 bg-eco-900 hover:bg-eco-800 active:bg-eco-950 text-white font-bold text-sm sm:text-base rounded-2xl shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Acesse sua área</span>
              <ArrowRight className="w-4 h-4 text-eco-300" />
            </button>
          </div>

          {/* Right Column: Dashboard Mockup Card matching Figma */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-900/5">
              
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-200">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Painel do Ponto
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Ecoponto Bancários
                  </h3>
                  <p className="text-xs text-slate-500">
                    Av. Sérgio Guerra, 450 - Bancários
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Ponto Ativo
                  </span>
                </div>
              </div>

              {/* Status Alert Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 mb-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="text-xs font-medium text-amber-950">
                    Capacidade geral em <strong>{capacityPercent}%</strong>. O fluxo público de recomendações está ajustado.
                  </span>
                </div>
                {isSimulating && (
                  <span className="text-[11px] text-eco-700 font-bold animate-pulse">Sincronizando...</span>
                )}
              </div>

              {/* Category Capacity Gauges */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Pilhas e baterias</span>
                    <span className="text-amber-700">78% (Atenção)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Celulares e informática</span>
                    <span className="text-emerald-700">48% (Normal)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '48%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Cabos e pequenos aparelhos</span>
                    <span className="text-rose-700">88% (Próximo do limite)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>
              </div>

              {/* Simulated weekly volume bars */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-3">
                  <span>Volume diário de entradas (kg)</span>
                  <span className="text-[11px] text-slate-400 font-normal">Últimos 7 dias</span>
                </div>

                <div className="flex items-end justify-between gap-2 h-20 px-2">
                  {[
                    { day: 'Seg', val: 40 },
                    { day: 'Ter', val: 65 },
                    { day: 'Qua', val: 50 },
                    { day: 'Qui', val: 85 },
                    { day: 'Sex', val: 100 },
                    { day: 'Sáb', val: 70 },
                    { day: 'Dom', val: 20 },
                  ].map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div
                        className="w-full rounded-t-md bg-eco-600/80 hover:bg-eco-700 transition-all"
                        style={{ height: `${d.val}%` }}
                        title={`${d.day}: ${d.val} kg`}
                      />
                      <span className="text-[10px] font-bold text-slate-500">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time simulation buttons for testing */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 text-[11px]">Simular atualização de capacidade:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleSimulateUpdate(50)}
                    type="button"
                    className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-[11px]"
                  >
                    Livre (50%)
                  </button>
                  <button
                    onClick={() => handleSimulateUpdate(85)}
                    type="button"
                    className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-[11px]"
                  >
                    Quase cheio (85%)
                  </button>
                  <button
                    onClick={() => handleSimulateUpdate(98)}
                    type="button"
                    className="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-[11px]"
                  >
                    Lotado (98%)
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

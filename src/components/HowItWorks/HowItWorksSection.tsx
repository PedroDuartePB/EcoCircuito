import React from 'react';
import { MapPin, PackageCheck, Truck, ClipboardCheck } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Encontre um ponto',
      desc: 'Busque pelo seu bairro ou ative a localização para ver locais próximos.',
      icon: MapPin,
    },
    {
      number: '02',
      title: 'Separe os itens',
      desc: 'Agrupe seus eletrônicos e confira os materiais aceitos no ponto.',
      icon: PackageCheck,
    },
    {
      number: '03',
      title: 'Leve até o local',
      desc: 'Vá até o ponto de coleta dentro do horário e entregue com segurança.',
      icon: Truck,
    },
    {
      number: '04',
      title: 'Registre seu descarte',
      desc: 'Faça o registro anônimo e acompanhe o impacto gerado para o planeta.',
      icon: ClipboardCheck,
    },
  ];

  return (
    <section id="como-funciona" className="py-16 sm:py-20 lg:py-24 bg-eco-900 text-white relative overflow-hidden">
      {/* Subtle organic pattern accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-eco-800/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-eco-700/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-eco-300 block mb-3">
            Como funciona o EcoCircuito
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight">
            Um pequeno gesto. Um novo ciclo.
          </h2>
        </div>

        {/* 4 Steps Grid (Horizontal on Desktop, Stacked on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div 
                key={idx}
                className="group relative flex flex-col items-start p-6 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step Icon circle */}
                <div className="w-14 h-14 rounded-2xl bg-eco-700/80 group-hover:bg-eco-600 text-eco-200 group-hover:text-white flex items-center justify-center mb-6 shadow-inner transition-colors">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Step Title & Number */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-1.5">
                  <span className="text-eco-400 font-extrabold">{st.number} /</span>
                  <span>{st.title}</span>
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-eco-100/80 leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

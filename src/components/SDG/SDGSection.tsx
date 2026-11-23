import React from 'react';

export const SDGSection: React.FC = () => {
  const sdgs = [
    {
      number: '12',
      title: 'Consumo e Produção Responsáveis',
      colorBg: 'bg-[#bf8b2e]',
      borderColor: 'border-[#bf8b2e]/30',
      description: 'Incentivo prioritário à reutilização, conserto e descarte seguro para reduzir a geração de resíduos tóxicos e promover a economia circular.',
    },
    {
      number: '11',
      title: 'Cidades e Comunidades Sustentáveis',
      colorBg: 'bg-[#e67e22]',
      borderColor: 'border-[#e67e22]/30',
      description: 'Mapeamento inteligente e descentralizado para tornar a destinação correta de resíduos sólidos acessível a todos os bairros e comunidades.',
    },
    {
      number: '3',
      title: 'Saúde e Bem-Estar',
      colorBg: 'bg-[#27ae60]',
      borderColor: 'border-[#27ae60]/30',
      description: 'Prevenção da contaminação do solo e lençóis freáticos por metais pesados, protegendo a saúde da população e de trabalhadores da reciclagem.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-50/80 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Figma */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-eco-700 block mb-2">
            Objetivos de Desenvolvimento Sustentável
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-eco-900 tracking-tight">
            Um circuito alinhado ao futuro.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            Nosso compromisso prático com a Agenda 2030 das Nações Unidas para um planeta mais equilibrado e inclusivo.
          </p>
        </div>

        {/* 3 SDG Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {sdgs.map((sdg, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Official SDG Number Badge matching Figma */}
                <div className={`w-14 h-14 rounded-2xl ${sdg.colorBg} text-white font-black text-2xl flex items-center justify-center mb-6 shadow-sm`}>
                  {sdg.number}
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  ODS {sdg.number} — ONU
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                  {sdg.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {sdg.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                <span>Meta da Agenda 2030</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

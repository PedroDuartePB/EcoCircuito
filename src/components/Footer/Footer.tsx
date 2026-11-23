import React from 'react';
import { Logo } from '../common/Logo';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2">
            <Logo className="mb-4" />
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mb-5 font-normal">
              Conectando cidadãos a pontos de coleta responsáveis para transformar resíduos eletrônicos em novos ciclos sustentáveis.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-eco-700 shrink-0" />
              <span>Aderente à Lei Geral de Proteção de Dados (LGPD)</span>
            </div>
          </div>

          {/* Col 3: Navegação */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-medium">
              <li>
                <a href="#inicio" className="hover:text-eco-800 transition-colors">Início</a>
              </li>
              <li>
                <a href="#pontos-de-coleta" className="hover:text-eco-800 transition-colors">Pontos de coleta</a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-eco-800 transition-colors">Como funciona</a>
              </li>
              <li>
                <a href="#guia" className="hover:text-eco-800 transition-colors">Guia de materiais</a>
              </li>
              <li>
                <a href="#meu-impacto" className="hover:text-eco-800 transition-colors">Meu impacto</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Educação & Transparência */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Transparência
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-medium">
              <li>
                <a href="#educacao" className="hover:text-eco-800 transition-colors">Educação ambiental</a>
              </li>
              <li>
                <a href="#para-responsaveis" className="hover:text-eco-800 transition-colors">Para responsáveis</a>
              </li>
              <li>
                <span className="text-slate-400">Política de Imparcialidade</span>
              </li>
              <li>
                <span className="text-slate-400">Auditoria de Dados</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Institucional & Contato */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Institucional
            </h4>
            <p className="text-xs text-slate-500 mb-2 leading-relaxed">
              Projeto socioambiental desenvolvido no DCX / UFPB (Paraíba).
            </p>
            <p className="text-xs text-slate-400">
              Contato: ecocircuito@dcx.ufpb.br
            </p>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} EcoCircuito. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-6">
            <span>Privacidade & LGPD</span>
            <span>Acessibilidade (WCAG 2.1 AA)</span>
            <span>Termos de Uso</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

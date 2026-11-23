import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onOpenAuth: (role: 'citizen' | 'manager', mode: 'login' | 'register') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleHighContrast = () => {
    const next = !isHighContrast;
    setIsHighContrast(next);
    if (next) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3.5 border-b border-slate-100' 
          : 'bg-white py-4 border-b border-transparent'
      }`}
    >
      {/* Skip to main content link for accessibility (WCAG AA) */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-eco-900 focus:text-white focus:rounded-md"
      >
        Pular para o conteúdo principal
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700" aria-label="Navegação Principal">
            <a 
              href="#inicio" 
              className="hover:text-eco-700 transition-colors py-1 focus:outline-none focus:ring-2 focus:ring-eco-500 rounded px-1"
            >
              Início
            </a>
            <a 
              href="#pontos-de-coleta" 
              className="hover:text-eco-700 transition-colors py-1 focus:outline-none focus:ring-2 focus:ring-eco-500 rounded px-1"
            >
              Pontos de coleta
            </a>
            <a 
              href="#como-funciona" 
              className="hover:text-eco-700 transition-colors py-1 focus:outline-none focus:ring-2 focus:ring-eco-500 rounded px-1"
            >
              Ajuda
            </a>
            <a 
              href="#meu-impacto" 
              className="hover:text-eco-700 transition-colors py-1 focus:outline-none focus:ring-2 focus:ring-eco-500 rounded px-1"
            >
              Meu impacto
            </a>
            <a 
              href="#para-responsaveis" 
              className="hover:text-eco-700 transition-colors py-1 focus:outline-none focus:ring-2 focus:ring-eco-500 rounded px-1"
            >
              Para responsáveis
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* High Contrast Mode Toggle (Accessibility RF08) */}
            <button
              onClick={toggleHighContrast}
              type="button"
              className="p-2 rounded-lg text-slate-500 hover:text-eco-800 hover:bg-slate-100 transition-colors"
              title={isHighContrast ? "Desativar alto contraste" : "Ativar alto contraste"}
              aria-label="Alternar modo de alto contraste"
            >
              {isHighContrast ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Entrar Button */}
            <button
              onClick={() => onOpenAuth('citizen', 'login')}
              type="button"
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-eco-800 hover:bg-slate-50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-eco-500"
            >
              Entrar
            </button>

            {/* Cadastrar-se Button */}
            <button
              onClick={() => onOpenAuth('citizen', 'register')}
              type="button"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-eco-900 hover:bg-eco-800 active:bg-eco-950 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-eco-500 focus:ring-offset-2"
            >
              Cadastrar-se
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleHighContrast}
              type="button"
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Alternar modo de alto contraste"
            >
              {isHighContrast ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl text-slate-700 hover:text-eco-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-eco-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-6 border-t border-slate-100 animate-fadeIn">
            <nav className="flex flex-col gap-3 font-medium text-slate-800" aria-label="Menu móvel">
              <a
                href="#inicio"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-eco-50 hover:text-eco-900 transition-colors"
              >
                Início
              </a>
              <a
                href="#pontos-de-coleta"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-eco-50 hover:text-eco-900 transition-colors"
              >
                Pontos de coleta
              </a>
              <a
                href="#como-funciona"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-eco-50 hover:text-eco-900 transition-colors"
              >
                Ajuda
              </a>
              <a
                href="#meu-impacto"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-eco-50 hover:text-eco-900 transition-colors"
              >
                Meu impacto
              </a>
              <a
                href="#para-responsaveis"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-eco-50 hover:text-eco-900 transition-colors"
              >
                Para responsáveis
              </a>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('citizen', 'login');
                  }}
                  className="w-full py-2.5 text-center font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Entrar
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('citizen', 'register');
                  }}
                  className="w-full py-2.5 text-center font-semibold text-white bg-eco-900 hover:bg-eco-800 rounded-xl transition-colors shadow-sm"
                >
                  Cadastrar-se
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

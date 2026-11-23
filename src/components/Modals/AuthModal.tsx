import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Key, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'citizen' | 'manager';
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'citizen',
  defaultMode = 'login',
}) => {
  const [role, setRole] = useState<'citizen' | 'manager'>(defaultRole);
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [entityName, setEntityName] = useState('');
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  React.useEffect(() => {
    setRole(defaultRole);
    setMode(defaultMode);
    setAuthSuccess(false);
  }, [defaultRole, defaultMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register' && !lgpdConsent) {
      alert('É necessário concordar com a política de privacidade e LGPD para continuar.');
      return;
    }

    // Simulate safe authentication (OAuth/JWT mock)
    setAuthSuccess(true);
    setTimeout(() => {
      setAuthSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Fechar diálogo de autenticação"
        >
          <X className="w-5 h-5" />
        </button>

        {authSuccess ? (
          <div className="py-8 text-center animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              {mode === 'login' ? 'Login realizado com sucesso!' : 'Cadastro concluído!'}
            </h3>
            <p className="text-xs text-slate-500">
              {role === 'manager' 
                ? 'Acesso liberado ao painel de gestão de capacidade.' 
                : 'Bem-vindo ao EcoCircuito!'}
            </p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-eco-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-eco-800">
                  {role === 'manager' ? 'Acesso do Responsável' : 'Acesso Cidadão'}
                </span>
              </div>
              <h2 id="auth-modal-title" className="text-2xl font-extrabold text-slate-900">
                {mode === 'login' ? 'Entrar no EcoCircuito' : 'Criar sua conta'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {role === 'manager' 
                  ? 'Exclusivo para gestores e cooperativas de pontos de coleta.' 
                  : 'Acompanhe seu histórico pessoal de descartes.'}
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-6 text-xs font-bold">
              <button
                type="button"
                onClick={() => setRole('citizen')}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  role === 'citizen' ? 'bg-white text-eco-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Cidadão
              </button>
              <button
                type="button"
                onClick={() => setRole('manager')}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  role === 'manager' ? 'bg-white text-eco-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Responsável por Ponto
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:bg-white"
                  />
                </div>
              )}

              {mode === 'register' && role === 'manager' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nome do Estabelecimento / Cooperativa
                  </label>
                  <input
                    type="text"
                    required
                    value={entityName}
                    onChange={(e) => setEntityName(e.target.value)}
                    placeholder="Ex: Ecoponto Bancários"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  E-mail
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:bg-white"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:bg-white"
                  />
                  <Key className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* LGPD Consent for register */}
              {mode === 'register' && (
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lgpdConsent}
                      onChange={(e) => setLgpdConsent(e.target.checked)}
                      required
                      className="w-4 h-4 rounded text-eco-700 focus:ring-eco-500 border-slate-300 mt-0.5"
                    />
                    <span>
                      Concordo com os Termos de Uso e com o tratamento dos meus dados conforme a LGPD.
                    </span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-eco-900 hover:bg-eco-800 active:bg-eco-950 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
              >
                {mode === 'login' ? 'Entrar' : 'Concluir cadastro'}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="mt-5 text-center text-xs text-slate-500">
              {mode === 'login' ? (
                <>
                  Ainda não tem conta?{' '}
                  <button
                    onClick={() => setMode('register')}
                    type="button"
                    className="font-bold text-eco-800 hover:underline"
                  >
                    Cadastre-se gratuitamente
                  </button>
                </>
              ) : (
                <>
                  Já possui conta?{' '}
                  <button
                    onClick={() => setMode('login')}
                    type="button"
                    className="font-bold text-eco-800 hover:underline"
                  >
                    Faça login
                  </button>
                </>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-eco-700" />
              <span>Conexão criptografada de ponta a ponta.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

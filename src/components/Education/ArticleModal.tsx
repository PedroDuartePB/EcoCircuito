import React from 'react';
import { EducationalArticle } from '../../types';
import { X, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ArticleModalProps {
  article: EducationalArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Fechar artigo"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Article Header */}
        <div className="pr-8 mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5 ${article.badgeColor}`}>
            {article.tag}
          </span>
          <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {article.title}
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            {article.subtitle}
          </p>
        </div>

        {/* Summary Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
          <p className="text-sm text-slate-700 font-medium leading-relaxed italic">
            "{article.summary}"
          </p>
        </div>

        {/* Full Text Paragraphs */}
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed mb-6 font-normal">
          {article.fullContent.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Key Recommendations Box */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            Recomendações Práticas
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
            {article.keyRecommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Source Citation & Validation */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span><strong>Fonte dos dados:</strong> {article.source}</span>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-eco-700 shrink-0 mt-0.5" />
            <span><strong>Validação técnica:</strong> {article.technicalValidation}</span>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="py-2.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-colors"
          >
            Fechar artigo
          </button>
        </div>
      </div>
    </div>
  );
};

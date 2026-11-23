import React, { useState } from 'react';
import { CollectionPoint, DisposalRecord } from '../../types';
import { registryService } from '../../services/registryService';
import { MATERIAL_CATEGORIES } from '../../data/mockData';
import { 
  HeartHandshake, CheckCircle2, Copy, Check, 
  Lock, AlertCircle, ShieldCheck 
} from 'lucide-react';

interface DisposalSectionProps {
  points: CollectionPoint[];
  preSelectedPoint?: CollectionPoint | null;
  onDisposalRegistered: (record: DisposalRecord) => void;
}

export const DisposalSection: React.FC<DisposalSectionProps> = ({
  points,
  preSelectedPoint,
  onDisposalRegistered,
}) => {
  const [materialCategory, setMaterialCategory] = useState('Celulares e tablets');
  const [quantity, setQuantity] = useState('1');
  const [pointId, setPointId] = useState(preSelectedPoint?.id || points[0]?.id || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successRecord, setSuccessRecord] = useState<DisposalRecord | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [humanCheck, setHumanCheck] = useState(true); // Anti-bot verified

  // When preSelectedPoint changes, update state
  React.useEffect(() => {
    if (preSelectedPoint) {
      setPointId(preSelectedPoint.id);
    }
  }, [preSelectedPoint]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!humanCheck) {
      setErrorMsg('Por favor, marque a confirmação de que você realizou a entrega.');
      return;
    }

    const selectedPt = points.find((p) => p.id === pointId) || points[0];
    if (!selectedPt) {
      setErrorMsg('Por favor, selecione um ponto de coleta.');
      return;
    }

    try {
      setIsSubmitting(true);
      const units = parseInt(quantity, 10) || 1;

      const record = await registryService.registerAnonymousDisposal({
        materialCategory,
        quantityUnits: units,
        pointId: selectedPt.id,
        pointName: selectedPt.name,
      });

      setSuccessRecord(record);
      onDisposalRegistered(record);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao registrar descarte. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyProtocol = () => {
    if (!successRecord) return;
    navigator.clipboard.writeText(successRecord.protocolCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <section id="meu-impacto" className="py-14 sm:py-20 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Form Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Column: Context & Ethical Guarantees */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-wider text-eco-700 block mb-2">
              Seu Registro
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-eco-900 tracking-tight mb-4">
              Seu descarte conta.<br />E faz a diferença.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
              Registre o que você entregou no ponto de coleta para mantermos as estatísticas do projeto vivas, auditáveis e transparentes para toda a comunidade.
            </p>

            {/* Ethical Guarantees Bullet List */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-eco-100 flex items-center justify-center text-eco-700 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm text-slate-700 font-medium">
                  <strong>Registro 100% anônimo:</strong> sem necessidade de cadastro pessoal.
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-eco-100 flex items-center justify-center text-eco-700 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm text-slate-700 font-medium">
                  <strong>Privacidade estrita (LGPD):</strong> não exigimos CPF, telefone ou endereço residencial.
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-eco-100 flex items-center justify-center text-eco-700 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm text-slate-700 font-medium">
                  <strong>Auditoria e transparência:</strong> gera um comprovante anônimo rastreável.
                </span>
              </div>
            </div>

            {/* Pre-disposal advice banner (ODS 12) */}
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong>Incentivo à Reutilização (ODS 12):</strong> O equipamento ainda funciona ou pode ser consertado? Considere doar para uma escola ou parente antes de realizar o descarte definitivo!
              </div>
            </div>
          </div>

          {/* Right Column: Anonymous Form or Confirmation Card */}
          <div className="lg:col-span-6">
            {successRecord ? (
              /* Success Confirmation Card */
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 border border-emerald-200 animate-fadeIn">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Descarte Documentado com Sucesso!
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-2">
                  Obrigado pela sua atitude sustentável!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6">
                  Seu registro anônimo foi computado na base pública de João Pessoa. Nenhum dado pessoal foi coletado ou vinculado.
                </p>

                {/* Protocol Info Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Protocolo Anônimo:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-bold text-eco-900 bg-eco-100 px-2 py-0.5 rounded-md">
                        {successRecord.protocolCode}
                      </span>
                      <button
                        onClick={copyProtocol}
                        type="button"
                        className="p-1 rounded text-slate-400 hover:text-slate-700"
                        title="Copiar código de protocolo"
                      >
                        {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <span className="text-slate-500">Material informado:</span>
                    <span className="font-semibold">{successRecord.materialCategory} ({successRecord.quantityUnits} un)</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <span className="text-slate-500">Ponto de entrega:</span>
                    <span className="font-semibold">{successRecord.pointName}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <span className="text-slate-500">Impacto estimado:</span>
                    <span className="font-bold text-emerald-700">
                      ~{successRecord.avoidedSoilContaminationLiters.toLocaleString('pt-BR')} L de água subterrânea protegidos
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSuccessRecord(null)}
                  type="button"
                  className="w-full py-3 px-4 bg-eco-900 hover:bg-eco-800 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  Registrar outro descarte
                </button>
              </div>
            ) : (
              /* Anonymous Disposal Form matching Figma */
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 border border-slate-200/90">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-eco-700">
                      Formulário Anônimo
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      Gravar descarte
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    <Lock className="w-3 h-3 text-eco-700" />
                    <span>100% Anônimo</span>
                  </div>
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Material Category select */}
                  <div>
                    <label htmlFor="disp-category" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Categoria do eletrônico
                    </label>
                    <select
                      id="disp-category"
                      value={materialCategory}
                      onChange={(e) => setMaterialCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:bg-white"
                      required
                    >
                      {MATERIAL_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label htmlFor="disp-quantity" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Quantidade aproximada (unidades)
                    </label>
                    <input
                      id="disp-quantity"
                      type="number"
                      min="1"
                      max="100"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Collection Point select */}
                  <div>
                    <label htmlFor="disp-point" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Ponto de coleta utilizado
                    </label>
                    <select
                      id="disp-point"
                      value={pointId}
                      onChange={(e) => setPointId(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:bg-white"
                      required
                    >
                      {points.map((pt) => (
                        <option key={pt.id} value={pt.id}>
                          {pt.name} — {pt.neighborhood} ({pt.capacityStatus === 'full' ? 'Lotado' : 'Operando'})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Anti-Bot check (Ethical requirement) */}
                  <div className="pt-2">
                    <label className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={humanCheck}
                        onChange={(e) => setHumanCheck(e.target.checked)}
                        className="w-4 h-4 rounded text-eco-700 focus:ring-eco-500 border-slate-300"
                      />
                      <span>Declaro que este registro corresponde a um descarte real.</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 bg-eco-900 hover:bg-eco-800 active:bg-eco-950 text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Gravando descarte anônimo...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5 text-eco-300" />
                        <span>Registrar descarte</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <span className="text-[11px] text-slate-400">
                    Nenhum cookie de rastreamento ou dado pessoal coletado.
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

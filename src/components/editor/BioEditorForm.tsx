import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { BioProfile, MetricItem } from '../../types/portfolio';
import { validateBioForm } from '../../schemas/validation';
import { Check, AlertCircle } from 'lucide-react';

const PRESET_PORTRAITS = [
  {
    label: 'Estúdio Arquitetônico (Padrão)',
    url: '/src/assets/images/hero_studio_portrait_1793150764156.jpg',
  },
  {
    label: 'Editorial & Monografia',
    url: '/src/assets/images/project_editorial_press_1793150767304.jpg',
  },
  {
    label: 'Hardware & Síntese',
    url: '/src/assets/images/project_audio_synth_1793150767550.jpg',
  },
];

export const BioEditorForm: React.FC = () => {
  const { data, updateBio, updateMetrics } = usePortfolio();
  const [formState, setFormState] = useState<BioProfile>(data.bio);
  const [metricsState, setMetricsState] = useState<MetricItem[]>(data.metrics);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    setFormState(data.bio);
    setMetricsState(data.metrics);
  }, [data.bio, data.metrics]);

  const handleFieldChange = (field: keyof BioProfile, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSocialChange = (network: keyof BioProfile['socials'], value: string) => {
    setFormState((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [network]: value,
      },
    }));
  };

  const handleMetricChange = (index: number, field: keyof MetricItem, value: string) => {
    setMetricsState((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBioForm(formState);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    updateBio(formState);
    updateMetrics(metricsState);
    setErrors({});
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Status Banner */}
      {savedToast && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-3 text-xs font-medium text-emerald-300">
          <Check className="h-4 w-4 shrink-0" />
          Biografia e indicadores atualizados em tempo real e salvos no navegador.
        </div>
      )}

      <div className="space-y-5">
        <div className="border-b border-zinc-800 pb-3">
          <h3 className="font-display text-base font-semibold text-zinc-100">
            Identidade Institucional & Hero
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Estes campos atualizam imediatamente o topo do site e a seção Sobre.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Nome da Marca / Estúdio *
            </label>
            <input
              type="text"
              value={formState.brandName}
              onChange={(e) => handleFieldChange('brandName', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
            />
            {errors.brandName && (
              <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
                <AlertCircle className="h-3 w-3" /> {errors.brandName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Nome Completo / Assinatura *
            </label>
            <input
              type="text"
              value={formState.fullName}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
            />
            {errors.fullName && (
              <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
                <AlertCircle className="h-3 w-3" /> {errors.fullName}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Cargo / Especialidade Principal
            </label>
            <input
              type="text"
              value={formState.roleTitle}
              onChange={(e) => handleFieldChange('roleTitle', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Kicker Editorial (Acima do Título)
            </label>
            <input
              type="text"
              value={formState.kicker}
              onChange={(e) => handleFieldChange('kicker', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Headline Principal (Hero) *
          </label>
          <textarea
            rows={2}
            value={formState.headline}
            onChange={(e) => handleFieldChange('headline', e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
          />
          {errors.headline && (
            <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
              <AlertCircle className="h-3 w-3" /> {errors.headline}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Parágrafo de Abertura (Lead) *
          </label>
          <textarea
            rows={3}
            value={formState.leadParagraph}
            onChange={(e) => handleFieldChange('leadParagraph', e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
          />
          {errors.leadParagraph && (
            <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
              <AlertCircle className="h-3 w-3" /> {errors.leadParagraph}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Biografia Estendida (Seção Sobre)
          </label>
          <textarea
            rows={4}
            value={formState.ExtendedBio}
            onChange={(e) => handleFieldChange('ExtendedBio', e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Citação / Filosofia de Trabalho
          </label>
          <textarea
            rows={2}
            value={formState.philosophyQuote}
            onChange={(e) => handleFieldChange('philosophyQuote', e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
          />
        </div>

        {/* Hero Image Picker */}
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            URL da Fotografia de Capa (Hero)
          </label>
          <input
            type="text"
            value={formState.heroImageUrl}
            onChange={(e) => handleFieldChange('heroImageUrl', e.target.value)}
            placeholder="/src/assets/images/..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-xs font-mono text-zinc-200 focus:border-[#F2B705] focus:outline-none"
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-zinc-500">Presets de Estúdio:</span>
            {PRESET_PORTRAITS.map((preset) => (
              <button
                key={preset.url}
                type="button"
                onClick={() => handleFieldChange('heroImageUrl', preset.url)}
                className="rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] text-zinc-300 hover:border-[#F2B705] hover:text-[#F2B705] transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              E-mail Institucional *
            </label>
            <input
              type="email"
              value={formState.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
            />
            {errors.email && (
              <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
                <AlertCircle className="h-3 w-3" /> {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Localização
            </label>
            <input
              type="text"
              value={formState.location}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Status de Agenda
            </label>
            <input
              type="text"
              value={formState.availabilityText}
              onChange={(e) => handleFieldChange('availabilityText', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-2">
          <p className="text-xs font-medium text-zinc-300 mb-3">Links de Redes & Repositórios</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="url"
              placeholder="GitHub URL"
              value={formState.socials.github}
              onChange={(e) => handleSocialChange('github', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs text-zinc-200 focus:border-[#F2B705] focus:outline-none"
            />
            <input
              type="url"
              placeholder="LinkedIn URL"
              value={formState.socials.linkedin}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs text-zinc-200 focus:border-[#F2B705] focus:outline-none"
            />
            <input
              type="url"
              placeholder="Behance URL"
              value={formState.socials.behance}
              onChange={(e) => handleSocialChange('behance', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs text-zinc-200 focus:border-[#F2B705] focus:outline-none"
            />
            <input
              type="url"
              placeholder="Instagram URL"
              value={formState.socials.instagram}
              onChange={(e) => handleSocialChange('instagram', e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs text-zinc-200 focus:border-[#F2B705] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Quantitative Metrics Strip Editor */}
      <div className="space-y-4 border-t border-zinc-800 pt-6">
        <div>
          <h3 className="font-display text-base font-semibold text-zinc-100">
            Faixa de Indicadores Quantitativos (Abaixo do Hero)
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Métricas com unidades e contexto verificável para prova social imediata.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {metricsState.map((metric, idx) => (
            <div
              key={metric.id}
              className="rounded-xl border border-zinc-800/90 bg-zinc-900/50 p-4 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-zinc-500">Indicador 0{idx + 1}</span>
              </div>
              <input
                type="text"
                value={metric.value}
                onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                placeholder="Ex: +142%"
                className="w-full rounded border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 font-mono text-sm font-semibold text-[#F2B705] focus:border-[#F2B705] focus:outline-none"
              />
              <input
                type="text"
                value={metric.label}
                onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                placeholder="Título do indicador"
                className="w-full rounded border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs font-medium text-zinc-200 focus:border-[#F2B705] focus:outline-none"
              />
              <input
                type="text"
                value={metric.context}
                onChange={(e) => handleMetricChange(idx, 'context', e.target.value)}
                placeholder="Contexto temporal/técnico"
                className="w-full rounded border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-400 focus:border-[#F2B705] focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-zinc-800 bg-[#0A0A0C]/95 py-4 backdrop-blur-md">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-[#F2B705] px-5 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-[#fbbf24] transition-colors cursor-pointer"
        >
          <Check className="h-4 w-4" />
          Salvar Alterações na Bio & Indicadores
        </button>
      </div>
    </form>
  );
};

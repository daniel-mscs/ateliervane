import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ExperienceItem } from '../../types/portfolio';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';

const EMPTY_EXP: Omit<ExperienceItem, 'id'> = {
  period: '2024 — Presente',
  role: '',
  company: '',
  location: 'São Paulo, Brasil',
  description: '',
  impact: '',
};

export const ExperienceEditorManager: React.FC = () => {
  const { data, addExperience, updateExperience, deleteExperience } = usePortfolio();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Omit<ExperienceItem, 'id'>>(EMPTY_EXP);
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const handleStartNew = () => {
    setFormState(EMPTY_EXP);
    setEditingId('NEW');
  };

  const handleStartEdit = (exp: ExperienceItem) => {
    const { id: _unused, ...rest } = exp;
    setFormState(rest);
    setEditingId(exp.id);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.role.trim() || !formState.company.trim()) return;

    if (editingId === 'NEW') {
      addExperience(formState);
      triggerToast('Nova experiência adicionada à trajetória.');
    } else if (editingId) {
      updateExperience(editingId, formState);
      triggerToast('Experiência atualizada com sucesso.');
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-3 text-xs font-medium text-emerald-300">
          <Check className="h-4 w-4 shrink-0" />
          {toast}
        </div>
      )}

      {!editingId && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h3 className="font-display text-base font-semibold text-zinc-100">
              Trajetória & Liderança ({data.experiences.length})
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Gerencie os marcos profissionais exibidos na seção de Biografia.
            </p>
          </div>
          <button
            type="button"
            onClick={handleStartNew}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#F2B705] px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-[#fbbf24] transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            Adicionar Experiência
          </button>
        </div>
      )}

      {editingId ? (
        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h4 className="font-display text-sm font-semibold text-zinc-100">
              {editingId === 'NEW' ? 'Adicionar Marco Profissional' : 'Editar Experiência'}
            </h4>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" /> Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Cargo *</label>
              <input
                type="text"
                required
                value={formState.role}
                onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                placeholder="Ex: Staff Design Engineer"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Empresa / Estúdio *
              </label>
              <input
                type="text"
                required
                value={formState.company}
                onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                placeholder="Ex: Vektor Systems AG"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Período</label>
              <input
                type="text"
                value={formState.period}
                onChange={(e) => setFormState({ ...formState, period: e.target.value })}
                placeholder="2022 — Presente"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-xs text-zinc-200 focus:border-[#F2B705] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Localização</label>
              <input
                type="text"
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                placeholder="Zurique, Suíça"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 focus:border-[#F2B705] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Descrição das Responsabilidades
            </label>
            <textarea
              rows={3}
              value={formState.description}
              onChange={(e) => setFormState({ ...formState, description: e.target.value })}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Impacto Quantitativo / Resultado
            </label>
            <input
              type="text"
              value={formState.impact}
              onChange={(e) => setFormState({ ...formState, impact: e.target.value })}
              placeholder="Ex: Redução de 52% no tempo de ciclo entre design e deploy."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-xs text-[#F2B705] focus:border-[#F2B705] focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-800 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#F2B705] px-5 py-2 text-xs font-semibold text-zinc-950 hover:bg-[#fbbf24] cursor-pointer"
            >
              <Check className="h-3.5 w-3.5" /> Salvar
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {data.experiences.map((exp) => (
            <div
              key={exp.id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-4 sm:flex-row sm:items-center"
            >
              <div>
                <p className="font-mono text-xs text-zinc-400">
                  {exp.period} · {exp.location}
                </p>
                <h4 className="mt-1 font-display text-sm font-semibold text-zinc-100">
                  {exp.role} — <span className="text-zinc-400 font-normal">{exp.company}</span>
                </h4>
                <p className="mt-1 text-xs text-[#F2B705] font-mono">{exp.impact}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleStartEdit(exp)}
                  className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200 hover:border-[#F2B705] hover:text-[#F2B705] cursor-pointer"
                >
                  <Pencil className="h-3 w-3" /> Editar
                </button>
                <button
                  type="button"
                  onClick={() => deleteExperience(exp.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-rose-400 cursor-pointer"
                  title="Remover experiência"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

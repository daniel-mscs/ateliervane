import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectCategory, ProjectItem } from '../../types/portfolio';
import { validateProjectForm } from '../../schemas/validation';
import {
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
  AlertCircle,
  X,
} from 'lucide-react';

const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Sistemas & Produto',
  'Arquitetura Digital',
  'Hardware & Áudio',
  'Editorial & Tipografia',
];

const STUDIO_IMAGE_PRESETS = [
  {
    label: 'Spatial OS Glass',
    url: '/src/assets/images/project_spatial_os_1793150764465.jpg',
  },
  {
    label: 'Terminal Financeiro',
    url: '/src/assets/images/project_fintech_ledger_1793150765875.jpg',
  },
  {
    label: 'Sintetizador MOD-1',
    url: '/src/assets/images/project_audio_synth_1793150767550.jpg',
  },
  {
    label: 'Monografia Editorial',
    url: '/src/assets/images/project_editorial_press_1793150767304.jpg',
  },
];

const EMPTY_PROJECT: Omit<ProjectItem, 'id'> = {
  title: '',
  subtitle: '',
  category: 'Sistemas & Produto',
  year: '2026',
  client: '',
  role: 'Direção de Design & Engenharia',
  featured: true,
  bentoSpan: 'standard',
  imageUrl: '/src/assets/images/project_spatial_os_1793150764465.jpg',
  summary: '',
  challenge: '',
  outcome: '',
  metrics: '+45% Conversão · Latência <15ms',
  technologies: ['React', 'TypeScript', 'Tailwind CSS'],
  liveUrl: 'https://example.com',
  repositoryUrl: '',
};

export const ProjectsEditorManager: React.FC = () => {
  const {
    data,
    editingProjectId,
    setEditingProjectId,
    addProject,
    updateProject,
    deleteProject,
    reorderProject,
  } = usePortfolio();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState<Omit<ProjectItem, 'id'>>(EMPTY_PROJECT);
  const [techInput, setTechInput] = useState('React, TypeScript, Tailwind CSS');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (editingProjectId === 'NEW') {
      setFormState(EMPTY_PROJECT);
      setTechInput(EMPTY_PROJECT.technologies.join(', '));
      setErrors({});
      setIsFormOpen(true);
    } else if (editingProjectId) {
      const target = data.projects.find((p) => p.id === editingProjectId);
      if (target) {
        const { id: _unused, ...rest } = target;
        setFormState(rest);
        setTechInput(target.technologies.join(', '));
        setErrors({});
        setIsFormOpen(true);
      }
    } else {
      setIsFormOpen(false);
    }
  }, [editingProjectId, data.projects]);

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 2600);
  };

  const handleOpenCreate = () => {
    setEditingProjectId('NEW');
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProjectId(project.id);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProjectId(null);
    setErrors({});
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTechs = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Omit<ProjectItem, 'id'> = {
      ...formState,
      technologies: parsedTechs,
    };

    const validation = validateProjectForm(payload);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    if (editingProjectId === 'NEW' || !editingProjectId) {
      addProject(payload);
      showToast('Novo projeto adicionado ao portfólio com sucesso.');
    } else {
      updateProject(editingProjectId, payload);
      showToast('Projeto atualizado com sucesso.');
    }

    handleCloseForm();
  };

  const handleConfirmDelete = (id: string) => {
    deleteProject(id);
    setConfirmDeleteId(null);
    if (editingProjectId === id) {
      handleCloseForm();
    }
    showToast('Projeto removido do acervo.');
  };

  return (
    <div className="space-y-6">
      {feedbackMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-3 text-xs font-medium text-emerald-300">
          <Check className="h-4 w-4 shrink-0" />
          {feedbackMsg}
        </div>
      )}

      {/* Header Action Bar */}
      {!isFormOpen && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h3 className="font-display text-base font-semibold text-zinc-100">
              Projetos Publicados ({data.projects.length})
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Adicione, edite ou reordene os estudos de caso exibidos no Bento Grid.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#F2B705] px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-[#fbbf24] transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            Adicionar Novo Projeto
          </button>
        </div>
      )}

      {/* Create / Edit Project Form */}
      {isFormOpen ? (
        <form
          onSubmit={handleSaveProject}
          className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h4 className="font-display text-base font-semibold text-zinc-100">
              {editingProjectId === 'NEW' ? 'Cadastrar Novo Estudo de Caso' : 'Editar Projeto'}
            </h4>
            <button
              type="button"
              onClick={handleCloseForm}
              className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Título do Projeto *
              </label>
              <input
                type="text"
                value={formState.title}
                onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                placeholder="Ex: Sistema Operacional Arquitetônico"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
              />
              {errors.title && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
                  <AlertCircle className="h-3 w-3" /> {errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Subtítulo Editorial
              </label>
              <input
                type="text"
                value={formState.subtitle}
                onChange={(e) => setFormState({ ...formState, subtitle: e.target.value })}
                placeholder="Resumo complementar em uma linha"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Categoria
              </label>
              <select
                value={formState.category}
                onChange={(e) =>
                  setFormState({ ...formState, category: e.target.value as ProjectCategory })
                }
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
              >
                {PROJECT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Ano (4 dígitos) *
              </label>
              <input
                type="text"
                value={formState.year}
                onChange={(e) => setFormState({ ...formState, year: e.target.value })}
                placeholder="2026"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 font-mono text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
              />
              {errors.year && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
                  <AlertCircle className="h-3 w-3" /> {errors.year}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Proporção no Grid
              </label>
              <select
                value={formState.bentoSpan}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    bentoSpan: e.target.value as 'wide' | 'standard',
                  })
                }
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
              >
                <option value="wide">Destaque Largo (7 col)</option>
                <option value="standard">Compacto (5 col)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Cliente / Organização *
              </label>
              <input
                type="text"
                value={formState.client}
                onChange={(e) => setFormState({ ...formState, client: e.target.value })}
                placeholder="Ex: Spatial Architects Oslo"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
              />
              {errors.client && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
                  <AlertCircle className="h-3 w-3" /> {errors.client}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Papel Desempenhado
              </label>
              <input
                type="text"
                value={formState.role}
                onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                placeholder="Ex: Arquitetura Front-End & UI"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL & Studio Presets */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              URL da Imagem do Projeto
            </label>
            <input
              type="text"
              value={formState.imageUrl}
              onChange={(e) => setFormState({ ...formState, imageUrl: e.target.value })}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 font-mono text-xs text-zinc-200 focus:border-[#F2B705] focus:outline-none"
            />
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-zinc-500">Imagens de Estúdio:</span>
              {STUDIO_IMAGE_PRESETS.map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => setFormState({ ...formState, imageUrl: preset.url })}
                  className="rounded border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-300 hover:border-[#F2B705] hover:text-[#F2B705] transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Resumo Executivo (Exibido no Card) *
            </label>
            <textarea
              rows={2}
              value={formState.summary}
              onChange={(e) => setFormState({ ...formState, summary: e.target.value })}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
            />
            {errors.summary && (
              <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
                <AlertCircle className="h-3 w-3" /> {errors.summary}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Desafio Técnico (Exibido no Modal)
              </label>
              <textarea
                rows={3}
                value={formState.challenge}
                onChange={(e) => setFormState({ ...formState, challenge: e.target.value })}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Resultado & Impacto (Exibido no Modal)
              </label>
              <textarea
                rows={3}
                value={formState.outcome}
                onChange={(e) => setFormState({ ...formState, outcome: e.target.value })}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Métrica de Destaque
              </label>
              <input
                type="text"
                value={formState.metrics}
                onChange={(e) => setFormState({ ...formState, metrics: e.target.value })}
                placeholder="Ex: -64% Tempo de Revisão · 60fps"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 font-mono text-xs text-[#F2B705] focus:border-[#F2B705] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Tecnologias (separadas por vírgula) *
              </label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="React, TypeScript, Tailwind CSS"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 font-mono text-xs text-zinc-200 focus:border-[#F2B705] focus:outline-none"
              />
              {errors.technologies && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
                  <AlertCircle className="h-3 w-3" /> {errors.technologies}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                URL do Projeto Online
              </label>
              <input
                type="url"
                value={formState.liveUrl}
                onChange={(e) => setFormState({ ...formState, liveUrl: e.target.value })}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs text-zinc-200 focus:border-[#F2B705] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                URL de Repositório / Documentação (Opcional)
              </label>
              <input
                type="url"
                value={formState.repositoryUrl || ''}
                onChange={(e) => setFormState({ ...formState, repositoryUrl: e.target.value })}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs text-zinc-200 focus:border-[#F2B705] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-zinc-800 pt-4">
            <button
              type="button"
              onClick={handleCloseForm}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#F2B705] px-5 py-2 text-xs font-semibold text-zinc-950 hover:bg-[#fbbf24] transition-colors cursor-pointer"
            >
              <Check className="h-3.5 w-3.5" />
              {editingProjectId === 'NEW' ? 'Publicar Projeto' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      ) : (
        /* Project List */
        <div className="space-y-3">
          {data.projects.map((project, idx) => (
            <div
              key={project.id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="font-mono text-zinc-500 tabular-nums">0{idx + 1}</span>
                  <span>·</span>
                  <span className="text-[#F2B705]">{project.category}</span>
                  <span>·</span>
                  <span className="font-mono tabular-nums">{project.year}</span>
                  <span>·</span>
                  <span>{project.bentoSpan === 'wide' ? 'Card Largo' : 'Card Compacto'}</span>
                </div>
                <h4 className="mt-1 font-display text-sm font-semibold text-zinc-100 truncate">
                  {project.title}
                </h4>
                <p className="mt-0.5 text-xs text-zinc-400 truncate">
                  Cliente: {project.client} — {project.technologies.join(' / ')}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => reorderProject(project.id, 'up')}
                  title="Mover para cima"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === data.projects.length - 1}
                  onClick={() => reorderProject(project.id, 'down')}
                  title="Mover para baixo"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(project)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:border-[#F2B705] hover:text-[#F2B705] transition-colors cursor-pointer"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Editar
                </button>

                {confirmDeleteId === project.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleConfirmDelete(project.id)}
                      className="rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-rose-500 cursor-pointer"
                    >
                      Confirmar
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      className="rounded-lg border border-zinc-700 px-2 py-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                    >
                      Não
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(project.id)}
                    title="Excluir projeto"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-rose-500/50 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

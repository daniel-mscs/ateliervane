import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  X,
  User,
  FolderKanban,
  Briefcase,
  Sparkles,
  Download,
  RotateCcw,
  Upload,
  Check,
} from 'lucide-react';
import { BioEditorForm } from './BioEditorForm';
import { ProjectsEditorManager } from './ProjectsEditorManager';
import { ExperienceEditorManager } from './ExperienceEditorManager';

export const PortfolioEditorDrawer: React.FC = () => {
  const {
    data,
    isEditorOpen,
    activeEditorTab,
    closeEditor,
    setActiveEditorTab,
    updateCursorSettings,
    resetToDefaultMock,
    importPortfolioJson,
  } = usePortfolio();

  const [confirmReset, setConfirmReset] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  if (!isEditorOpen) return null;

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${data.bio.brandName.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = importPortfolioJson(content);
      if (!result.success) {
        setImportError(result.error || 'Erro ao importar JSON');
        setImportSuccess(false);
      } else {
        setImportError(null);
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Painel Administrativo do Portfólio"
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs"
      onClick={closeEditor}
    >
      <div
        className="relative flex h-full w-full max-w-3xl flex-col border-l border-zinc-800 bg-[#0A0A0C] text-zinc-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drawer Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-zinc-100">
              Painel de Gestão do Portfólio
            </h2>
            <p className="text-xs text-zinc-400">
              Persistência ativa via <span className="font-mono text-zinc-300">localStorage</span> · Validação pronta para Zod / React Hook Form
            </p>
          </div>

          <button
            type="button"
            onClick={closeEditor}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar painel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 bg-zinc-950 px-6 py-2.5">
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveEditorTab('bio')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeEditorTab === 'bio'
                  ? 'bg-[#F2B705] text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              Biografia & KPIs
            </button>

            <button
              type="button"
              onClick={() => setActiveEditorTab('projects')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeEditorTab === 'projects'
                  ? 'bg-[#F2B705] text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <FolderKanban className="h-3.5 w-3.5" />
              Projetos ({data.projects.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveEditorTab('experience')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeEditorTab === 'experience'
                  ? 'bg-[#F2B705] text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              Trajetória
            </button>

            <button
              type="button"
              onClick={() => setActiveEditorTab('cursor')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeEditorTab === 'cursor'
                  ? 'bg-[#F2B705] text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Efeito Nuvem & Backup
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeEditorTab === 'bio' && <BioEditorForm />}
          {activeEditorTab === 'projects' && <ProjectsEditorManager />}
          {activeEditorTab === 'experience' && <ExperienceEditorManager />}

          {activeEditorTab === 'cursor' && (
            <div className="space-y-8">
              {/* Mouse Cloud Effect Settings */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-base font-semibold text-zinc-100">
                      Calibragem da Nuvem Multicor do Cursor
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Ajuste o comportamento físico e cromático da nuvem que segue o mouse.
                    </p>
                  </div>

                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.cursorSettings.enabled}
                      onChange={(e) =>
                        updateCursorSettings({
                          ...data.cursorSettings,
                          enabled: e.target.checked,
                        })
                      }
                      className="h-4 w-4 accent-[#F2B705] rounded"
                    />
                    <span className="text-xs font-medium text-zinc-200">
                      {data.cursorSettings.enabled ? 'Ativado' : 'Desativado'}
                    </span>
                  </label>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-zinc-300">Intensidade Luminosa das Cores</span>
                      <span className="font-mono text-[#F2B705] tabular-nums">
                        {Math.round(data.cursorSettings.intensity * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.12"
                      max="0.65"
                      step="0.02"
                      value={data.cursorSettings.intensity}
                      onChange={(e) =>
                        updateCursorSettings({
                          ...data.cursorSettings,
                          intensity: parseFloat(e.target.value),
                        })
                      }
                      className="w-full accent-[#F2B705]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-zinc-300">Raio de Difusão da Nuvem</span>
                      <span className="font-mono text-[#F2B705] tabular-nums">
                        {data.cursorSettings.radius}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="220"
                      max="540"
                      step="10"
                      value={data.cursorSettings.radius}
                      onChange={(e) =>
                        updateCursorSettings({
                          ...data.cursorSettings,
                          radius: parseInt(e.target.value, 10),
                        })
                      }
                      className="w-full accent-[#F2B705]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-zinc-300">Velocidade de Resposta (Suavidade Elástica)</span>
                      <span className="font-mono text-[#F2B705] tabular-nums">
                        {Math.round(data.cursorSettings.smoothing * 1000)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.03"
                      max="0.18"
                      step="0.01"
                      value={data.cursorSettings.smoothing}
                      onChange={(e) =>
                        updateCursorSettings({
                          ...data.cursorSettings,
                          smoothing: parseFloat(e.target.value),
                        })
                      }
                      className="w-full accent-[#F2B705]"
                    />
                  </div>
                </div>
              </div>

              {/* Backup, Export & Reset */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-5">
                <div>
                  <h3 className="font-display text-base font-semibold text-zinc-100">
                    Persistência Local, Exportação JSON & Restauração
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Exporte seus dados editados em JSON ou restaure os dados mockados originais do estúdio.
                  </p>
                </div>

                {importError && (
                  <p className="rounded-lg border border-rose-500/40 bg-rose-950/40 p-3 text-xs text-rose-300">
                    {importError}
                  </p>
                )}

                {importSuccess && (
                  <p className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 p-3 text-xs text-emerald-300">
                    <Check className="h-4 w-4" /> Arquivo JSON importado com sucesso!
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-white transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Exportar Portfólio (.JSON)
                  </button>

                  <label className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-zinc-200 hover:border-zinc-500 transition-colors cursor-pointer">
                    <Upload className="h-3.5 w-3.5" />
                    Importar Arquivo JSON
                    <input
                      type="file"
                      accept="application/json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {confirmReset ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          resetToDefaultMock();
                          setConfirmReset(false);
                        }}
                        className="rounded-lg bg-rose-600 px-3.5 py-2.5 text-xs font-semibold text-white hover:bg-rose-500 cursor-pointer"
                      >
                        Confirmar Restauração Padrão
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmReset(false)}
                        className="rounded-lg border border-zinc-700 px-3 py-2.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmReset(true)}
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs font-medium text-zinc-400 hover:border-rose-500/40 hover:text-rose-300 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Restaurar Dados Mockados Originais
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

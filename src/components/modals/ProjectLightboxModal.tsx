import React, { useEffect } from 'react';
import { ProjectItem } from '../../types/portfolio';
import { ResilientImage } from '../ui/ResilientImage';
import { X, ExternalLink, Pencil } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface ProjectLightboxModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectLightboxModal: React.FC<ProjectLightboxModalProps> = ({ project, onClose }) => {
  const { openEditor } = usePortfolio();

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const handleEditClick = () => {
    const id = project.id;
    onClose();
    openEditor('projects', id);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 lg:p-10 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#0A0A0C] text-zinc-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="font-mono text-zinc-300 tabular-nums">{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.client}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleEditClick}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:border-[#F2B705] hover:text-[#F2B705] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5" />
              Editar este Projeto
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar estudo de caso"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="max-h-[82vh] overflow-y-auto p-6 sm:p-10">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950">
            <ResilientImage
              src={project.imageUrl}
              alt={project.title}
              fallbackTitle={project.title}
              fallbackCategory={project.category}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2
                id="modal-project-title"
                className="font-display text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
                style={{ textWrap: 'balance' }}
              >
                {project.title}
              </h2>
              <p className="mt-2 font-serif italic text-base text-zinc-300">{project.subtitle}</p>

              <p className="mt-6 text-sm leading-relaxed text-zinc-300">{project.summary}</p>

              <div className="mt-8 space-y-6 border-t border-zinc-800/80 pt-6">
                <div>
                  <h3 className="text-xs font-mono text-zinc-400">01. Desafio Técnico & Arquitetural</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.challenge}</p>
                </div>

                <div>
                  <h3 className="text-xs font-mono text-zinc-400">02. Resultado & Impacto Verificado</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.outcome}</p>
                </div>
              </div>
            </div>

            {/* Metadata Monograph Column */}
            <div className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-6">
              <div className="space-y-5">
                <div>
                  <p className="text-xs text-zinc-500">Cliente / Instituição</p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">{project.client}</p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500">Papel & Liderança</p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">{project.role}</p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500">Indicadores de Impacto</p>
                  <p className="mt-1 font-mono text-xs text-[#F2B705] tabular-nums">{project.metrics}</p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500">Stack & Disciplinas</p>
                  <p className="mt-1 font-mono text-xs leading-relaxed text-zinc-300">
                    {project.technologies.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-2.5 border-t border-zinc-800/80 pt-5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F2B705] px-4 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-[#fbbf24] transition-colors whitespace-nowrap"
                  >
                    Acessar Projeto Online
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Documentação Técnica
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

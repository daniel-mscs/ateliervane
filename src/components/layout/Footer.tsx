import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowUpRight, Copy, Check, SlidersHorizontal } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, openEditor } = usePortfolio();
  const { bio } = data;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(bio.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer id="contato" className="relative z-10 border-t border-zinc-800/80 bg-[#050505]">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-mono text-zinc-500">04. Contato Institucional & Novos Projetos</p>
            <h2
              className="mt-3 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              Inicie uma conversa sobre arquitetura digital ou direção de produto.
            </h2>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${bio.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[#F2B705] px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-[#fbbf24] transition-colors whitespace-nowrap shrink-0"
              >
                {bio.email}
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-xs font-medium text-zinc-200 hover:border-zinc-700 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    E-mail Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copiar Endereço
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between lg:items-end">
            <div className="space-y-2 lg:text-right">
              <p className="text-xs text-zinc-400">{bio.location}</p>
              <p className="text-xs text-[#F2B705]">{bio.availabilityText}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-medium text-zinc-400">
              {bio.socials.github && (
                <a
                  href={bio.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-100 hover:underline underline-offset-4 transition-colors"
                >
                  GitHub
                </a>
              )}
              {bio.socials.linkedin && (
                <a
                  href={bio.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-100 hover:underline underline-offset-4 transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {bio.socials.behance && (
                <a
                  href={bio.socials.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-100 hover:underline underline-offset-4 transition-colors"
                >
                  Behance
                </a>
              )}
              {bio.socials.instagram && (
                <a
                  href={bio.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-100 hover:underline underline-offset-4 transition-colors"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-zinc-900 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {bio.brandName} ({bio.fullName}). Todos os direitos reservados.
          </p>

          <button
            type="button"
            onClick={() => openEditor('bio')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-[#F2B705] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Abrir Painel Administrativo do Portfólio
          </button>
        </div>
      </div>
    </footer>
  );
};

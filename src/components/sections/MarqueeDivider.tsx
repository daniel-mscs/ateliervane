import React from 'react';

export const MarqueeDivider: React.FC = () => {
  const items = [
    'acervo selecionado',
    'engenharia de design',
    'sistemas interativos',
    'tipografia editorial',
    'arquitetura front-end',
    'direção criativa',
  ];

  return (
    <div className="relative z-10 overflow-hidden border-y border-zinc-900 bg-[#050505]/70 py-3.5 select-none">
      <div className="animate-marquee flex items-center gap-8 text-xs font-mono tracking-wider text-zinc-500">
        {[...items, ...items, ...items].map((label, idx) => (
          <React.Fragment key={idx}>
            <span className="whitespace-nowrap">{label}</span>
            <span aria-hidden="true" className="text-[#F2B705]">
              ·
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

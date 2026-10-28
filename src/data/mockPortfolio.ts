import { PortfolioData } from '../types/portfolio';
import heroStudioPortrait from '../assets/images/hero_studio_portrait_1793150764156.jpg';
import projectSpatialOs from '../assets/images/project_spatial_os_1793150764465.jpg';
import projectFintechLedger from '../assets/images/project_fintech_ledger_1793150765875.jpg';
import projectAudioSynth from '../assets/images/project_audio_synth_1793150767550.jpg';
import projectEditorialPress from '../assets/images/project_editorial_press_1793150767304.jpg';

export const STORAGE_KEY = 'atelier_vane_portfolio_v1';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  lastUpdated: new Date().toISOString(),
  cursorSettings: {
    enabled: true,
    intensity: 0.34,
    radius: 380,
    smoothing: 0.08,
  },
  bio: {
    brandName: 'Atelier Vane',
    fullName: 'Helena Vane',
    roleTitle: 'Diretora de Engenharia de Design & Arquitetura de Sistemas',
    kicker: 'Estúdio Independente · São Paulo & Zurique',
    headline: 'Arquitetura de software e direção criativa para produtos de alta precisão.',
    leadParagraph:
      'Construímos sistemas digitais, interfaces espaciais e linguagens visuais duradouras para empresas de tecnologia, finanças quantitativas e equipamentos de áudio.',
    ExtendedBio:
      'Com mais de 11 anos na interseção entre desenho industrial e engenharia de software full-stack, Helena Vane lidera o Atelier Vane com foco em interfaces de latência zero, tipografia editorial rigorosa e sistemas de design escaláveis. Cada projeto é tratado como uma monografia técnica onde forma e execução operam sem atrito.',
    philosophyQuote:
      'A precisão técnica não compete com a sensibilidade editorial; quando a engenharia é silenciosa, a clareza torna-se imediata.',
    location: 'São Paulo, Brasil · Atendimento Global',
    availabilityText: 'Agenda aberta para Q4 2026 — Consultoria & Projetos Fechados',
    email: 'contato@ateliervane.studio',
    heroImageUrl: heroStudioPortrait,
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      behance: 'https://behance.net',
      instagram: 'https://instagram.com',
    },
  },
  metrics: [
    {
      id: 'metric-1',
      value: '+142%',
      label: 'Retenção em Plataformas B2B',
      context: 'Média verificada após redesign arquitetural em 6 meses',
    },
    {
      id: 'metric-2',
      value: '18.4M',
      label: 'Usuários Ativos Mensais',
      context: 'Interagindo diariamente com nossos Design Systems em produção',
    },
    {
      id: 'metric-3',
      value: '11 Anos',
      label: 'Liderança em Produto & Código',
      context: 'Entregas contínuas para startups Series B+ e fundos globais',
    },
    {
      id: 'metric-4',
      value: '99.98%',
      label: 'Estabilidade de Front-End',
      context: 'Arquitetura tipada em TypeScript estrito com zero regressões críticas',
    },
  ],
  projects: [
    {
      id: 'proj-spatial-vista',
      title: 'Project Vista — Sistema Operacional Arquitetônico',
      subtitle: 'Visualização paramétrica em tempo real e controle ambiental para residências minimalistas',
      category: 'Arquitetura Digital',
      year: '2026',
      client: 'Spatial Architects Oslo',
      role: 'Direção de Interface & Engenharia WebGL',
      featured: true,
      bentoSpan: 'wide',
      imageUrl: projectSpatialOs,
      summary:
        'Interface embarcada em painéis de vidro temperado para gestão de plantas arquitetônicas, iluminação circadiana e telemetria estrutural de edifícios sustentáveis.',
      challenge:
        'Unificar dados complexos de engenharia civil (CAD/BIM) e automação residencial em uma tela tátil de parede que pudesse ser operada com naturalidade por arquitetos e moradores.',
      outcome:
        'Redução de 64% no tempo de aprovação de plantas executivas em estúdio e adoção em 48 empreendimentos residenciais escandinavos.',
      metrics: '-64% Tempo de Revisão BIM · 60fps Constantes em Painel Embarcado',
      technologies: ['TypeScript', 'React 19', 'WebGL', 'Tailwind CSS', 'Design System'],
      liveUrl: 'https://example.com/vista-spatial',
      repositoryUrl: 'https://github.com/example/vista-spatial-ui',
    },
    {
      id: 'proj-krono-ledger',
      title: 'Krono Quantitative — Terminal de Liquidez Institucional',
      subtitle: 'Análise de risco multi-ativos e execução algorítmica com tipografia tabular de alta densidade',
      category: 'Sistemas & Produto',
      year: '2025',
      client: 'Krono Capital Geneva',
      role: 'Arquitetura Front-End & Design de Dados',
      featured: true,
      bentoSpan: 'standard',
      imageUrl: projectFintechLedger,
      summary:
        'Plataforma web de baixa latência desenhada para gestores de portfólio acompanharem alocação setorial, exposição cambial e livros de ofertas sem fadiga visual.',
      challenge:
        'Substituir três sistemas legados fragmentados por um único workspace responsivo capaz de renderizar 15.000 atualizações de preço por segundo.',
      outcome:
        'Aumento de 38% na velocidade de tomada de decisão da mesa de operações e migração completa de US$ 2.8B sob gestão para o novo terminal.',
      metrics: 'US$ 2.8B Sob Gestão · <12ms Tempo de Renderização de Frame',
      technologies: ['React', 'TypeScript', 'WebSockets', 'Canvas API', 'Zod'],
      liveUrl: 'https://example.com/krono-ledger',
    },
    {
      id: 'proj-mod1-synth',
      title: 'MOD-1 Harmonic — Estação de Síntese Modular Híbrida',
      subtitle: 'Design de interface embarcada OLED e aplicativo companion para sintetizador polifônico',
      category: 'Hardware & Áudio',
      year: '2025',
      client: 'Klangwerk Berlin',
      role: 'Design Industrial de UI & DSP Visualizer',
      featured: true,
      bentoSpan: 'standard',
      imageUrl: projectAudioSynth,
      summary:
        'Ecossistema visual unindo display OLED âmbar de alta precisão no hardware físico e editor de patches em WebAudio API para compositores de trilhas sonoras.',
      challenge:
        'Garantir correspondência tátil imediata entre os potenciômetros físicos de alumínio anodizado e a resposta visual de envelopes e filtros na tela.',
      outcome:
        'Premiado pela crítica especializada em Berlim com mais de 14.000 unidades vendidas no lote inaugural.',
      metrics: '14.000+ Unidades Vendidas · Latência MIDI-to-Screen <2ms',
      technologies: ['WebAudio API', 'TypeScript', 'Embedded C++ UI', 'SVG Shaders'],
      liveUrl: 'https://example.com/mod1-synth',
    },
    {
      id: 'proj-taschen-archive',
      title: 'Archive Press — Motor de Publicação de Monografias de Arte',
      subtitle: 'Sistema editorial digital para curadoria de acervo museológico e livros de arte contemporânea',
      category: 'Editorial & Tipografia',
      year: '2024',
      client: 'Fondation Rothko & Archive Press',
      role: 'Direção Editorial & Engenharia Front-End',
      featured: true,
      bentoSpan: 'wide',
      imageUrl: projectEditorialPress,
      summary:
        'Ambiente de leitura e diagramação assistida que preserva a proporção áurea, o contraste cromático fiel e a hierarquia tipográfica de edições impressas de colecionador.',
      challenge:
        'Reproduzir a riqueza cromática de pinturas expressionistas e cadernos tipográficos históricos em telas de múltiplos formatos sem perda de rigor curatorial.',
      outcome:
        'Tempo médio de sessão de leitura de 19 minutos (+210% acima da média do setor cultural) e integração oficial em 12 galerias europeias.',
      metrics: '19 min Tempo Médio de Leitura · +210% Engajamento Curatorial',
      technologies: ['React', 'TypeScript', 'CSS Grid Level 2', 'Color Management'],
      liveUrl: 'https://example.com/archive-press',
    },
  ],
  services: [
    {
      id: 'srv-1',
      index: '01.',
      title: 'Sistemas de Design & Arquitetura Front-End',
      description:
        'Construção de bibliotecas de componentes acessíveis, fortemente tipadas em TypeScript e documentadas para equipes de engenharia em crescimento.',
      deliverables: [
        'Design Tokens multi-tema e especificação tipográfica',
        'Componentes React modulares sem dependências supérfluas',
        'Auditoria de performance, acessibilidade WCAG AA e testes',
      ],
    },
    {
      id: 'srv-2',
      index: '02.',
      title: 'Direção Criativa & Interfaces de Produto Complexo',
      description:
        'Transformação de softwares densos — terminais financeiros, ferramentas científicas, editores criativos — em experiências claras e silenciosas.',
      deliverables: [
        'Arquitetura de informação e fluxos de trabalho de alta densidade',
        'Prototipagem interativa em código real (React + Tailwind)',
        'Visualização de dados quantitativos e telemetria em tempo real',
      ],
    },
    {
      id: 'srv-3',
      index: '03.',
      title: 'Plataformas Institucionais & Monografias Digitais',
      description:
        'Presença digital sob medida com estética editorial, animações baseadas em física no compositor e autonomia total de conteúdo.',
      deliverables: [
        'Direção de arte autoral e curadoria visual de portfólio',
        'Micro-interações fluidas a 60fps e efeitos sutis de WebGL/Canvas',
        'Estrutura modular pronta para integração com CMS, Zod e APIs',
      ],
    },
  ],
  experiences: [
    {
      id: 'exp-1',
      period: '2022 — Presente',
      role: 'Fundadora & Diretora Técnica de Design',
      company: 'Atelier Vane',
      location: 'São Paulo / Zurique',
      description:
        'Liderança de estúdio boutique focado em engenharia de design para clientes de tecnologia profunda, finanças e cultura.',
      impact: 'Mais de 24 produtos digitais lançados com retenção e performance auditadas.',
    },
    {
      id: 'exp-2',
      period: '2019 — 2022',
      role: 'Staff Design Engineer',
      company: 'Vektor Systems AG',
      location: 'Zurique, Suíça',
      description:
        'Responsável pela arquitetura do Design System unificado utilizado por 140 engenheiros em plataformas de análise financeira.',
      impact: 'Redução de 52% no tempo de ciclo entre concepção em design e deploy em produção.',
    },
    {
      id: 'exp-3',
      period: '2016 — 2019',
      role: 'Senior Creative Technologist',
      company: 'Estúdio Nômade Digital',
      location: 'São Paulo, Brasil',
      description:
        'Desenvolvimento de instalações interativas, plataformas editoriais e identidades dinâmicas para instituições artísticas.',
      impact: 'Reconhecimento em festivais internacionais de design interativo e tipografia.',
    },
  ],
};

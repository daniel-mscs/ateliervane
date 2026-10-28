import React, { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { CursorCloudEffect } from './components/ui/CursorCloudEffect';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { MarqueeDivider } from './components/sections/MarqueeDivider';
import { ProjectsBentoSection } from './components/sections/ProjectsBentoSection';
import { BioAndExperienceSection } from './components/sections/BioAndExperienceSection';
import { Footer } from './components/layout/Footer';
import { ProjectLightboxModal } from './components/modals/ProjectLightboxModal';
import { PortfolioEditorDrawer } from './components/editor/PortfolioEditorDrawer';
import { ProjectItem } from './types/portfolio';

const PortfolioContent: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Sincroniza o projeto aberto no modal caso ele seja editado ao vivo
  const activeModalProject = selectedProject
    ? data.projects.find((p) => p.id === selectedProject.id) || null
    : null;

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 selection:bg-[#F2B705] selection:text-zinc-950">
      {/* Efeito de Nuvem Multicor Suave no Cursor */}
      <CursorCloudEffect settings={data.cursorSettings} />

      {/* Navegação Superior (3-Zone Contract) */}
      <Navbar />

      {/* Conteúdo Institucional Principal */}
      <main>
        <HeroSection />
        <MarqueeDivider />
        <ProjectsBentoSection onSelectProject={(project) => setSelectedProject(project)} />
        <BioAndExperienceSection />
      </main>

      {/* Rodapé Institucional */}
      <Footer />

      {/* Lightbox de Estudo de Caso */}
      <ProjectLightboxModal
        project={activeModalProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Painel Administrativo Lateral (CMS Local) */}
      <PortfolioEditorDrawer />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}

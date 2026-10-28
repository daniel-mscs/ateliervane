import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PortfolioData,
  BioProfile,
  ProjectItem,
  MetricItem,
  ExperienceItem,
  CursorCloudSettings,
} from '../types/portfolio';
import { INITIAL_PORTFOLIO_DATA, STORAGE_KEY } from '../data/mockPortfolio';

interface PortfolioContextValue {
  data: PortfolioData;
  isEditorOpen: boolean;
  activeEditorTab: 'bio' | 'projects' | 'experience' | 'cursor';
  editingProjectId: string | null;
  openEditor: (tab?: 'bio' | 'projects' | 'experience' | 'cursor', projectId?: string | null) => void;
  closeEditor: () => void;
  setActiveEditorTab: (tab: 'bio' | 'projects' | 'experience' | 'cursor') => void;
  setEditingProjectId: (id: string | null) => void;
  updateBio: (newBio: BioProfile) => void;
  updateMetrics: (newMetrics: MetricItem[]) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => ProjectItem;
  updateProject: (id: string, project: Omit<ProjectItem, 'id'>) => void;
  deleteProject: (id: string) => void;
  reorderProject: (id: string, direction: 'up' | 'down') => void;
  addExperience: (experience: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, experience: Omit<ExperienceItem, 'id'>) => void;
  deleteExperience: (id: string) => void;
  updateCursorSettings: (settings: CursorCloudSettings) => void;
  resetToDefaultMock: () => void;
  importPortfolioJson: (jsonString: string) => { success: boolean; error?: string };
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as PortfolioData;
        if (parsed && parsed.bio && Array.isArray(parsed.projects)) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Falha ao ler localStorage, carregando dados iniciais mockados:', err);
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState<'bio' | 'projects' | 'experience' | 'cursor'>('bio');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.warn('Não foi possível persistir no localStorage:', err);
    }
  }, [data]);

  const openEditor = useCallback(
    (tab: 'bio' | 'projects' | 'experience' | 'cursor' = 'bio', projectId: string | null = null) => {
      setActiveEditorTab(tab);
      setEditingProjectId(projectId);
      setIsEditorOpen(true);
    },
    []
  );

  const closeEditor = useCallback(() => {
    setIsEditorOpen(false);
    setEditingProjectId(null);
  }, []);

  const updateBio = useCallback((newBio: BioProfile) => {
    setData((prev) => ({
      ...prev,
      bio: newBio,
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const updateMetrics = useCallback((newMetrics: MetricItem[]) => {
    setData((prev) => ({
      ...prev,
      metrics: newMetrics,
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const addProject = useCallback((projectInput: Omit<ProjectItem, 'id'>): ProjectItem => {
    const newProject: ProjectItem = {
      ...projectInput,
      id: `proj-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
      lastUpdated: new Date().toISOString(),
    }));
    return newProject;
  }, []);

  const updateProject = useCallback((id: string, projectInput: Omit<ProjectItem, 'id'>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...projectInput, id } : p)),
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const reorderProject = useCallback((id: string, direction: 'up' | 'down') => {
    setData((prev) => {
      const idx = prev.projects.findIndex((p) => p.id === id);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.projects.length) return prev;

      const copy = [...prev.projects];
      const [moved] = copy.splice(idx, 1);
      copy.splice(targetIdx, 0, moved);

      return {
        ...prev,
        projects: copy,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, []);

  const addExperience = useCallback((experienceInput: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = {
      ...experienceInput,
      id: `exp-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const updateExperience = useCallback((id: string, experienceInput: Omit<ExperienceItem, 'id'>) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === id ? { ...experienceInput, id } : e)),
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const deleteExperience = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const updateCursorSettings = useCallback((cursorSettings: CursorCloudSettings) => {
    setData((prev) => ({
      ...prev,
      cursorSettings,
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const resetToDefaultMock = useCallback(() => {
    const fresh = {
      ...INITIAL_PORTFOLIO_DATA,
      lastUpdated: new Date().toISOString(),
    };
    setData(fresh);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const importPortfolioJson = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString) as PortfolioData;
      if (!parsed.bio || !Array.isArray(parsed.projects)) {
        return { success: false, error: 'Estrutura JSON inválida: campos "bio" ou "projects" ausentes.' };
      }
      setData({
        ...parsed,
        lastUpdated: new Date().toISOString(),
      });
      return { success: true };
    } catch {
      return { success: false, error: 'Não foi possível interpretar o arquivo JSON.' };
    }
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isEditorOpen,
        activeEditorTab,
        editingProjectId,
        openEditor,
        closeEditor,
        setActiveEditorTab,
        setEditingProjectId,
        updateBio,
        updateMetrics,
        addProject,
        updateProject,
        deleteProject,
        reorderProject,
        addExperience,
        updateExperience,
        deleteExperience,
        updateCursorSettings,
        resetToDefaultMock,
        importPortfolioJson,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio deve ser utilizado dentro de um PortfolioProvider');
  }
  return ctx;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Document, DRHPSection, ComplianceCheck } from '../types';
import { api } from '../services/api';

interface ProjectContextType {
  projects: Project[];
  activeProject: Project | null;
  activeStep: number;
  documents: Document[];
  drhpSections: DRHPSection[];
  complianceScore: number;
  complianceChecks: ComplianceCheck[];
  loading: boolean;
  setActiveProject: (p: Project | null) => void;
  setActiveStep: (step: number) => void;
  refreshProjectData: () => Promise<void>;
  createProject: (data: Partial<Project>) => Promise<Project>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [drhpSections, setDrhpSections] = useState<DRHPSection[]>([]);
  const [complianceScore, setComplianceScore] = useState<number>(88.5);
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshProjectData = async () => {
    try {
      setLoading(true);
      const projList = await api.getProjects();
      setProjects(projList);
      
      const current = activeProject ? projList.find(p => p.id === activeProject.id) || projList[0] : projList[0];
      setActiveProject(current);
      
      if (current) {
        const docs = await api.getDocuments(current.id);
        setDocuments(docs);
        
        const secs = await api.getDRHPSections(current.id);
        setDrhpSections(secs);
        
        const val = await api.runValidation(current.id);
        setComplianceScore(val.overall_compliance_score || 88.5);
        setComplianceChecks(val.checks || []);
      }
    } catch (e) {
      console.error("Failed to load project data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProjectData();
  }, []);

  const createProject = async (data: Partial<Project>): Promise<Project> => {
    const newProj = await api.createProject(data);
    await refreshProjectData();
    setActiveProject(newProj);
    setActiveStep(1);
    return newProj;
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      activeProject,
      activeStep,
      documents,
      drhpSections,
      complianceScore,
      complianceChecks,
      loading,
      setActiveProject,
      setActiveStep,
      refreshProjectData,
      createProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProject must be used within a ProjectProvider');
  return context;
};

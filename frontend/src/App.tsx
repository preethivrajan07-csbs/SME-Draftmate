import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ProjectStepper } from './components/ProjectStepper';
import { CompanyMasterStep } from './components/CompanyMasterStep';
import { DocumentUploadStep } from './components/DocumentUploadStep';
import { OCRViewerStep } from './components/OCRViewerStep';
import { QuestionnaireStep } from './components/QuestionnaireStep';
import { ComplianceDashboardStep } from './components/ComplianceDashboardStep';
import { DRHPEditorStep } from './components/DRHPEditorStep';
import { ReviewerWorkspaceStep } from './components/ReviewerWorkspaceStep';
import { VersionCompareStep } from './components/VersionCompareStep';
import { EvidencePackageStep } from './components/EvidencePackageStep';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { AuditLogsView } from './components/AuditLogsView';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';

const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const { activeStep, setActiveStep } = useProject();

  const handleStartWorkflow = () => {
    setCurrentView('workflow');
  };

  const handleNextStep = () => {
    if (activeStep < 11) {
      setActiveStep(activeStep + 1);
    }
  };

  const renderWorkflowStep = () => {
    switch (activeStep) {
      case 1:
      case 2:
        return <CompanyMasterStep onNext={handleNextStep} />;
      case 3:
        return <DocumentUploadStep onNext={handleNextStep} />;
      case 4:
      case 5:
        return <OCRViewerStep onNext={handleNextStep} />;
      case 6:
        return <QuestionnaireStep onNext={handleNextStep} />;
      case 7:
        return <ComplianceDashboardStep onNext={handleNextStep} />;
      case 8:
        return <DRHPEditorStep onNext={handleNextStep} />;
      case 9:
        return <ReviewerWorkspaceStep onNext={handleNextStep} />;
      case 10:
        return <VersionCompareStep onNext={handleNextStep} />;
      case 11:
        return <EvidencePackageStep />;
      default:
        return <ComplianceDashboardStep onNext={handleNextStep} />;
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onStartWorkflow={handleStartWorkflow} onOpenAuth={() => setAuthModalOpen(true)} />;
      case 'dashboard':
        return (
          <Dashboard
            onSelectWorkflowStep={(step) => {
              setCurrentView('workflow');
              setActiveStep(step);
            }}
            onOpenNewProjectModal={() => {
              setCurrentView('workflow');
              setActiveStep(1);
            }}
          />
        );
      case 'workflow':
        return (
          <div className="flex-1 overflow-y-auto">
            <ProjectStepper />
            {renderWorkflowStep()}
          </div>
        );
      case 'kb':
        return <KnowledgeBaseView />;
      case 'audit':
        return <AuditLogsView />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <LandingPage onStartWorkflow={handleStartWorkflow} onOpenAuth={() => setAuthModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar onOpenAuth={() => setAuthModalOpen(true)} />
      
      <div className="flex flex-1">
        <Sidebar currentView={currentView} onSelectView={setCurrentView} />
        
        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-61px)]">
          {renderContent()}
        </main>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <MainLayout />
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;

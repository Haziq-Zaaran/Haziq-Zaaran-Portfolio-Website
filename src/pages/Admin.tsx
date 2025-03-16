
import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, Home } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ProjectsAdmin from '@/components/admin/ProjectsAdmin';
import AboutAdmin from '@/components/admin/AboutAdmin';
import DashboardsAdmin from '@/components/admin/DashboardsAdmin';
import ContactAdmin from '@/components/admin/ContactAdmin';
import HeroAdmin from '@/components/admin/HeroAdmin';
import ErrorBoundary from '@/components/ErrorBoundary';
import { usePortfolio } from '@/contexts/PortfolioContext';

const Admin: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  const portfolioContext = usePortfolio();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Handle potential portfolio data loading
  const isLoading = !portfolioContext || !portfolioContext.portfolio;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-portfolio-purple mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Portfolio Admin</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home size={16} className="mr-2" />
              View Site
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <ErrorBoundary componentName="Hero Admin Section">
            <TabsContent value="hero" className="space-y-6">
              <Suspense fallback={<div>Loading Hero settings...</div>}>
                <HeroAdmin />
              </Suspense>
            </TabsContent>
          </ErrorBoundary>

          <ErrorBoundary componentName="Projects Admin Section">
            <TabsContent value="projects" className="space-y-6">
              <Suspense fallback={<div>Loading Projects settings...</div>}>
                <ProjectsAdmin />
              </Suspense>
            </TabsContent>
          </ErrorBoundary>

          <ErrorBoundary componentName="About Admin Section">
            <TabsContent value="about" className="space-y-6">
              <Suspense fallback={<div>Loading About settings...</div>}>
                <AboutAdmin />
              </Suspense>
            </TabsContent>
          </ErrorBoundary>

          <ErrorBoundary componentName="Dashboards Admin Section">
            <TabsContent value="dashboards" className="space-y-6">
              <Suspense fallback={<div>Loading Dashboards settings...</div>}>
                <DashboardsAdmin />
              </Suspense>
            </TabsContent>
          </ErrorBoundary>

          <ErrorBoundary componentName="Contact Admin Section">
            <TabsContent value="contact" className="space-y-6">
              <Suspense fallback={<div>Loading Contact settings...</div>}>
                <ContactAdmin />
              </Suspense>
            </TabsContent>
          </ErrorBoundary>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;

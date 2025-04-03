
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminHeader from '@/components/admin/AdminHeader';
import AboutAdmin from '@/components/admin/AboutAdmin';
import ProjectsAdmin from '@/components/admin/ProjectsAdmin';
import DashboardsAdmin from '@/components/admin/DashboardsAdmin';
import ContactAdmin from '@/components/admin/ContactAdmin';
import HeroAdmin from '@/components/admin/HeroAdmin';
import SkillsAdmin from '@/components/admin/SkillsAdmin';
import SafeAdminView from '@/components/admin/SafeAdminView';
import { SkillsProvider } from '@/contexts/SkillsContext';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [isMounted, setIsMounted] = useState(false);
  
  // This ensures that client-side hydration is complete before rendering
  // to avoid inconsistencies across browsers
  useEffect(() => {
    setIsMounted(true);
    
    // Add CSS check for better cross-browser diagnostics
    const supportsGrid = 'CSS' in window && CSS.supports('display', 'grid');
    const supportsFlexbox = 'CSS' in window && CSS.supports('display', 'flex');
    
    console.log('Browser compatibility check:', {
      supportsGrid,
      supportsFlexbox,
      userAgent: navigator.userAgent
    });
    
  }, []);
  
  // Handle tab changes and save to localStorage for persistence across sessions
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    try {
      localStorage.setItem('adminActiveTab', tab);
    } catch (e) {
      console.warn('Unable to save tab state to localStorage:', e);
    }
  };
  
  // Restore the active tab from localStorage
  useEffect(() => {
    try {
      const savedTab = localStorage.getItem('adminActiveTab');
      if (savedTab) {
        setActiveTab(savedTab);
      }
    } catch (e) {
      console.warn('Unable to read from localStorage:', e);
    }
  }, []);
  
  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center">Loading admin panel...</div>;
  }
  
  return (
    <SkillsProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 pb-12">
        <AdminHeader activeTab={activeTab} setActiveTab={handleTabChange} />
        
        <main className="container max-w-6xl mx-auto p-4 md:p-6 pt-20">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Portfolio Admin</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage and customize your portfolio website
            </p>
          </div>
          
          <SafeAdminView>
            {(data) => (
              <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
                <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <TabsTrigger value="hero">Hero</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <TabsContent value="hero">
                    <HeroAdmin />
                  </TabsContent>
                  
                  <TabsContent value="about">
                    <AboutAdmin />
                  </TabsContent>
                  
                  <TabsContent value="projects">
                    <ProjectsAdmin />
                  </TabsContent>
                  
                  <TabsContent value="dashboards">
                    <DashboardsAdmin />
                  </TabsContent>
                  
                  <TabsContent value="skills">
                    <SkillsAdmin />
                  </TabsContent>
                  
                  <TabsContent value="contact">
                    <ContactAdmin />
                  </TabsContent>
                </div>
              </Tabs>
            )}
          </SafeAdminView>
        </main>
      </div>
    </SkillsProvider>
  );
};

export default Admin;

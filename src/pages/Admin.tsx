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
import { toast } from '@/components/ui/use-toast';
import VersionChecker from '@/components/VersionChecker';

const browserSupport = {
  checkGridSupport: () => 'CSS' in window && CSS.supports('display', 'grid'),
  checkFlexboxSupport: () => 'CSS' in window && CSS.supports('display', 'flex'),
  checkLocalStorageSupport: () => {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  },
  checkSessionStorageSupport: () => {
    try {
      const testKey = '__test__';
      sessionStorage.setItem(testKey, testKey);
      sessionStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
};

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [isMounted, setIsMounted] = useState(false);
  const [browserChecksComplete, setBrowserChecksComplete] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    const supportsGrid = browserSupport.checkGridSupport();
    const supportsFlexbox = browserSupport.checkFlexboxSupport();
    const supportsLocalStorage = browserSupport.checkLocalStorageSupport();
    const supportsSessionStorage = browserSupport.checkSessionStorageSupport();
    
    const compatReport = {
      supportsGrid,
      supportsFlexbox,
      supportsLocalStorage,
      supportsSessionStorage,
      userAgent: navigator.userAgent,
      language: navigator.language,
      dpr: window.devicePixelRatio,
      screenWidth: window.innerWidth,
      mediaQueries: {
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
      }
    };
    
    console.log('Browser compatibility report:', compatReport);
    
    if (!supportsGrid || !supportsFlexbox) {
      toast({
        title: "Browser Compatibility Issue",
        description: "Your browser may not support all features of this application. Consider upgrading to the latest version.",
        variant: "destructive",
      });
    }
    
    const script = document.createElement('script');
    script.setAttribute('cache-version', new Date().toISOString().split('T')[0]);
    script.setAttribute('data-testid', 'admin-compatibility-script');
    document.head.appendChild(script);
    
    setBrowserChecksComplete(true);
  }, []);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    try {
      if (browserSupport.checkLocalStorageSupport()) {
        localStorage.setItem('adminActiveTab', tab);
      }
      else if (browserSupport.checkSessionStorageSupport()) {
        sessionStorage.setItem('adminActiveTab', tab);
      }
    } catch (e) {
      console.warn('Unable to save tab state:', e);
    }
  };
  
  useEffect(() => {
    if (!isMounted || !browserChecksComplete) return;
    
    try {
      let savedTab: string | null = null;
      
      if (browserSupport.checkLocalStorageSupport()) {
        savedTab = localStorage.getItem('adminActiveTab');
      }
      
      if (!savedTab && browserSupport.checkSessionStorageSupport()) {
        savedTab = sessionStorage.getItem('adminActiveTab');
      }
      
      if (savedTab) {
        setActiveTab(savedTab);
      }
    } catch (e) {
      console.warn('Unable to read stored tab:', e);
    }
  }, [isMounted, browserChecksComplete]);
  
  if (!isMounted || !browserChecksComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-portfolio-purple mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading admin panel...</p>
        </div>
      </div>
    );
  }
  
  return (
    <SkillsProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 pb-12">
        <AdminHeader activeTab={activeTab} setActiveTab={handleTabChange} />
        <VersionChecker />
        
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
                  <TabsTrigger value="hero" data-testid="admin-tab-trigger-hero">Hero</TabsTrigger>
                  <TabsTrigger value="about" data-testid="admin-tab-trigger-about">About</TabsTrigger>
                  <TabsTrigger value="projects" data-testid="admin-tab-trigger-projects">Projects</TabsTrigger>
                  <TabsTrigger value="dashboards" data-testid="admin-tab-trigger-dashboards">Dashboards</TabsTrigger>
                  <TabsTrigger value="skills" data-testid="admin-tab-trigger-skills">Skills</TabsTrigger>
                  <TabsTrigger value="contact" data-testid="admin-tab-trigger-contact">Contact</TabsTrigger>
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

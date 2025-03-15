
import React, { useState } from 'react';
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

const Admin: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

          <TabsContent value="hero" className="space-y-6">
            <HeroAdmin />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <ProjectsAdmin />
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <AboutAdmin />
          </TabsContent>

          <TabsContent value="dashboards" className="space-y-6">
            <DashboardsAdmin />
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <ContactAdmin />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;

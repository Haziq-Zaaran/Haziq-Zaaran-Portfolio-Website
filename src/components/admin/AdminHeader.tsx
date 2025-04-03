
import React from 'react';
import { Layout, FileText, User, BarChart2, Mail, Home, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface AdminHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const tabs = [
    { id: 'hero', name: 'Hero', icon: Home },
    { id: 'projects', name: 'Projects', icon: Layout },
    { id: 'about', name: 'About', icon: User },
    { id: 'dashboards', name: 'Dashboards', icon: BarChart2 },
    { id: 'contact', name: 'Contact', icon: Mail },
  ];
  
  // Enhanced navigation function that checks history
  const handleBack = () => {
    // If there's history, go back; otherwise navigate to home
    if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="text-gray-600 dark:text-gray-300 hover:text-portfolio-purple focus:outline-none focus:ring-2 focus:ring-portfolio-purple focus:ring-opacity-50 transition-colors"
            aria-label="Back to previous page"
            title="Go back to previous page"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Site
          </Button>
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Portfolio Admin</h2>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "flex items-center px-4 py-2 min-w-[120px] rounded-md text-sm font-medium whitespace-nowrap mr-2 transition-colors focus:outline-none focus:ring-2 focus:ring-portfolio-purple focus:ring-opacity-50",
                activeTab === tab.id
                  ? "bg-portfolio-purple/10 text-portfolio-purple"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
              onClick={() => setActiveTab(tab.id)}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              <tab.icon size={16} className="mr-2" />
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;

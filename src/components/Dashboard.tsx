
import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, AreaChart, Monitor, ExternalLink, Eye, Star, StarOff } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { usePortfolio, Dashboard as DashboardType } from '@/contexts/PortfolioContext';
import { getImageKey, getImageUrl } from '@/utils/imageUtils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const { portfolioData, updateDashboard } = usePortfolio();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [featuredDashboard, setFeaturedDashboard] = useState<DashboardType | null>(null);
  
  // Filter out hidden dashboards
  const visibleDashboards = portfolioData.dashboards.filter(dashboard => !dashboard.isHidden);
  
  // Effect to find a featured dashboard (first one that's not hidden or the first one)
  useEffect(() => {
    const featured = visibleDashboards.find(dashboard => dashboard.featured) || 
                    (visibleDashboards.length > 0 ? visibleDashboards[0] : null);
    setFeaturedDashboard(featured);
  }, [portfolioData.dashboards, refreshTrigger]);
  
  // Map for dashboard icons
  const dashboardIcons: Record<string, any> = {
    'Tableau': BarChart,
    'Power BI': LineChart,
    'Plotly': AreaChart,
    'Grafana': Monitor
  };

  const handlePreview = (title: string, link: string) => {
    // Display a toast when previewing
    toast({
      title: "Preview Mode",
      description: `Previewing "${title}" dashboard.`,
    });
    // Open the dashboard link in a new tab
    window.open(link, '_blank');
  };

  const handleToggleFeatured = (dashboard: DashboardType) => {
    if (isAuthenticated) {
      // Toggle featured status
      updateDashboard(dashboard.id, { featured: !dashboard.featured });
      
      // Show appropriate toast message
      toast({
        title: dashboard.featured ? "Removed Featured Status" : "Set as Featured",
        description: `"${dashboard.title}" has been ${dashboard.featured ? "removed from" : "set as"} the featured dashboard.`,
      });
      
      // Trigger a refresh to update the UI
      setRefreshTrigger(prev => prev + 1);
    }
  };

  return (
    <section id="dashboard" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="section-title">Interactive Dashboards</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Explore my interactive data visualizations that transform complex datasets into clear, actionable insights.
          </p>
        </AnimatedSection>
        
        {/* Featured Dashboard Section - Show if there's a featured dashboard or admin is logged in */}
        {(featuredDashboard || isAuthenticated) && (
          <AnimatedSection className="mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-6 md:p-8 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                    Featured Dashboard
                    {featuredDashboard && (
                      <span className="ml-2 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </h3>
                  {featuredDashboard ? (
                    <div className="mb-4">
                      <h4 className="text-xl font-semibold mb-2">{featuredDashboard.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {featuredDashboard.description}
                      </p>
                      {isAuthenticated && (
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePreview(featuredDashboard.title, featuredDashboard.link)}
                            className="flex items-center gap-1 mr-2"
                          >
                            <Eye size={14} /> Preview
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {isAuthenticated ? "Select a dashboard below to feature it here." : "A featured dashboard will appear here soon."}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="h-[500px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {featuredDashboard ? (
                  <div className="w-full h-full">
                    {/* Get the dashboard image if it exists */}
                    {(() => {
                      const imageUrl = featuredDashboard ? 
                        getImageUrl(getImageKey('dashboard', featuredDashboard.id), '') : '';
                      
                      if (imageUrl) {
                        return (
                          <div className="w-full h-full">
                            <img 
                              src={imageUrl} 
                              alt={featuredDashboard.title}
                              className="w-full h-full object-contain" 
                            />
                          </div>
                        );
                      } else {
                        // No image, show icon
                        const IconComponent = dashboardIcons[featuredDashboard.type] || Monitor;
                        return (
                          <div className="text-center p-8">
                            <IconComponent size={64} className="mx-auto mb-4 text-portfolio-purple opacity-70" />
                            <p className="text-gray-500 dark:text-gray-400">
                              {featuredDashboard.type} Dashboard
                              <br />
                              <a 
                                href={featuredDashboard.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 mt-4 text-portfolio-purple"
                              >
                                View Dashboard <ExternalLink size={16} />
                              </a>
                            </p>
                          </div>
                        );
                      }
                    })()}
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <Monitor size={64} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Your featured dashboard will appear here.
                      <br />
                      <span className="text-sm">
                        {isAuthenticated ? "Select a dashboard below to feature it." : "Check back soon for updates."}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        )}
        
        {/* Dashboard Grid */}
        {visibleDashboards.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {visibleDashboards.map((dashboard, index) => {
              // Determine which icon to use based on dashboard type
              const IconComponent = dashboardIcons[dashboard.type] || Monitor;
              
              // Get image from localStorage if available
              const imageUrl = getImageUrl(getImageKey('dashboard', dashboard.id), '');
              const hasImage = !!imageUrl;
              
              return (
                <AnimatedSection 
                  key={dashboard.id} 
                  className="hover-lift"
                  delay={index * 100}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md h-full border border-gray-100 dark:border-gray-700 flex flex-col">
                    {hasImage ? (
                      <div className="h-56 overflow-hidden">
                        <img 
                          src={imageUrl} 
                          alt={dashboard.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                        />
                      </div>
                    ) : (
                      <div className="h-56 bg-gradient-to-br from-portfolio-purple/10 to-portfolio-green/10 flex items-center justify-center p-8">
                        <IconComponent size={96} className="text-portfolio-purple opacity-70" />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-portfolio-purple/10 text-portfolio-purple text-xs font-medium rounded-full">
                          {dashboard.type}
                        </span>
                        {dashboard.featured && (
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">{dashboard.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1">{dashboard.description}</p>
                      <div className="flex gap-3 items-center">
                        <a 
                          href={dashboard.link} 
                          className="px-4 py-2 bg-portfolio-purple/10 text-portfolio-purple rounded-lg font-medium flex items-center gap-2 hover:bg-portfolio-purple/20 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Dashboard <ExternalLink size={16} />
                        </a>
                        {isAuthenticated && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePreview(dashboard.title, dashboard.link)}
                              className="flex items-center gap-1"
                            >
                              <Eye size={14} /> Preview
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleFeatured(dashboard)}
                              className="flex items-center gap-1"
                              title={dashboard.featured ? "Remove from featured" : "Set as featured"}
                            >
                              {dashboard.featured ? <StarOff size={14} /> : <Star size={14} />}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        ) : (
          <AnimatedSection className="text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {isAuthenticated ? "No dashboards available. Add some from the admin panel!" : "Dashboards will be available soon."}
            </p>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default Dashboard;


import React from 'react';
import { LineChart, BarChart, AreaChart, Monitor, ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { usePortfolio } from '@/contexts/PortfolioContext';

const Dashboard: React.FC = () => {
  const { portfolioData } = usePortfolio();
  
  // Filter out hidden dashboards
  const visibleDashboards = portfolioData.dashboards.filter(dashboard => !dashboard.isHidden);
  
  // Map for dashboard icons
  const dashboardIcons: Record<string, any> = {
    'Tableau': BarChart,
    'Power BI': LineChart,
    'Plotly': AreaChart,
    'Grafana': Monitor
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
        
        <div className="grid md:grid-cols-2 gap-8">
          {visibleDashboards.map((dashboard, index) => {
            // Determine which icon to use based on dashboard type
            const IconComponent = dashboardIcons[dashboard.type] || Monitor;
            
            return (
              <AnimatedSection 
                key={dashboard.id} 
                className="hover-lift"
                delay={index * 100}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md h-full border border-gray-100 dark:border-gray-700 flex flex-col">
                  <div className="h-56 bg-gradient-to-br from-portfolio-purple/10 to-portfolio-green/10 flex items-center justify-center p-8">
                    <IconComponent size={96} className="text-portfolio-purple opacity-70" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="px-3 py-1 bg-portfolio-purple/10 text-portfolio-purple text-xs font-medium rounded-full">
                        {dashboard.type}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">{dashboard.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1">{dashboard.description}</p>
                    <a 
                      href={dashboard.link} 
                      className="self-start px-4 py-2 bg-portfolio-purple/10 text-portfolio-purple rounded-lg font-medium flex items-center gap-2 hover:bg-portfolio-purple/20 transition-colors"
                    >
                      View Dashboard <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
        
        <AnimatedSection className="mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Featured Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This interactive dashboard showcases key performance indicators across multiple business dimensions.
              </p>
            </div>
            <div className="h-[500px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <div className="text-center p-8">
                <Monitor size={64} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  Your embedded dashboard will appear here.
                  <br />
                  <span className="text-sm">
                    (Embed codes for Tableau, Power BI, or other visualization tools)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Dashboard;

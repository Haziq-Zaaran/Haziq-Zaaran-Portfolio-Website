
import React from 'react';
import { Briefcase, GraduationCap, Award, Lightbulb, Quote, CheckCircle, List } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { usePortfolio } from '@/contexts/PortfolioContext';

const About: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { about } = portfolioData;

  // Function to render different section types
  const renderCustomSection = (section: any, index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={section.id || index} className="mb-8">
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">{section.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
          </div>
        );
      case 'quote':
        return (
          <div key={section.id || index} className="mb-8 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <Quote size={24} className="text-portfolio-purple mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-600 dark:text-gray-300 italic">{section.content}</p>
                <h4 className="text-lg font-bold mt-3 text-gray-800 dark:text-gray-100">{section.title}</h4>
              </div>
            </div>
          </div>
        );
      case 'highlight':
        return (
          <div key={section.id || index} className="mb-8 bg-portfolio-purple/10 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-portfolio-purple">{section.title}</h3>
            <p className="text-gray-700 dark:text-gray-200">{section.content}</p>
          </div>
        );
      case 'list':
        const items = section.content.split('\n').filter((item: string) => item.trim());
        return (
          <div key={section.id || index} className="mb-8">
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">{section.title}</h3>
            <ul className="space-y-2">
              {items.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-portfolio-green mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{item.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="section-title">About Me</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            A passionate data analyst with a keen eye for patterns and a love for transforming complex data into clear, actionable insights.
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="fade-in-left">
            <div className="relative">
              <div className="w-full h-[450px] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 relative">
                {about.headshot ? (
                  <img 
                    src={about.headshot} 
                    alt="Professional headshot" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-portfolio-purple/20 to-portfolio-green/20">
                    <span className="text-gray-400 dark:text-gray-500 text-sm">
                      Your professional headshot will go here
                    </span>
                  </div>
                )}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-portfolio-gold/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-portfolio-purple/20 rounded-full blur-2xl"></div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-right">
            <h3 className="text-2xl font-bold mb-4 text-portfolio-purple">My Journey</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {about.journey}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-portfolio-purple/10 flex items-center justify-center text-portfolio-purple flex-shrink-0">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Professional Experience</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {about.yearsOfExperience} years working with data across {about.industries}.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-portfolio-green/10 flex items-center justify-center text-portfolio-green flex-shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Education</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {about.degree} in {about.field} from {about.university}.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-portfolio-gold/10 flex items-center justify-center text-portfolio-gold flex-shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Certifications</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {about.certifications}.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 flex-shrink-0">
                  <Lightbulb size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-lg">My Approach</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    I believe in a data-driven approach that combines analytical rigor with clear communication to deliver insights that matter.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Custom sections - only shown if any exist */}
        {about.sections && about.sections.length > 0 && (
          <AnimatedSection className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">More About Me</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {about.sections.map((section, index) => renderCustomSection(section, index))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default About;

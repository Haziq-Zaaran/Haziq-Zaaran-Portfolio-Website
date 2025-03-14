
import React from 'react';
import { Briefcase, GraduationCap, Award, Lightbulb } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { usePortfolio } from '@/contexts/PortfolioContext';

const About: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { about } = portfolioData;

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
      </div>
    </section>
  );
};

export default About;

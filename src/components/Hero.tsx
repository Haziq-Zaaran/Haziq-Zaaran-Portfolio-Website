
import React from 'react';
import { ArrowDownCircle, Database, LineChart, BarChart4 } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { usePortfolio } from '@/contexts/PortfolioContext';

const Hero: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { hero } = portfolioData;
  
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background decoration elements */}
      <div className="absolute top-1/4 -right-10 w-64 h-64 bg-portfolio-purple/10 rounded-full blur-3xl animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 -left-10 w-72 h-72 bg-portfolio-green/10 rounded-full blur-3xl animate-pulse-soft animation-delay-2000"></div>
      
      <div className="section-container grid md:grid-cols-2 gap-10 items-center">
        <AnimatedSection animation="fade-in-left" className="flex flex-col justify-center">
          <div className="inline-block mb-2 px-3 py-1 bg-portfolio-purple/10 text-portfolio-purple rounded-full text-sm font-medium">
            {hero.subtitle}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {hero.title.split(' ').map((word, index) => {
              if (index === 1) return <span key={index} className="text-portfolio-purple"> {word}</span>;
              if (index === 3) return <span key={index} className="text-portfolio-gold"> {word}</span>;
              return <span key={index}> {word}</span>;
            })}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={scrollToProjects}
              className="btn-primary flex items-center justify-center gap-2"
            >
              View Projects
              <ArrowDownCircle size={18} />
            </button>
            <a href="#contact" className="btn-secondary flex items-center justify-center">
              Get In Touch
            </a>
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-right" className="relative hidden md:block">
          <div className="relative h-[450px] w-full">
            {/* Animated visualization elements */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-portfolio-purple/5 backdrop-blur-sm rounded-2xl border border-portfolio-purple/20 shadow-xl hover-lift animate-float p-6">
              <div className="w-full h-full flex flex-col">
                <div className="text-portfolio-purple font-medium mb-2">Monthly Revenue</div>
                <div className="flex-1 flex items-end gap-3 pb-4">
                  <div className="w-6 bg-portfolio-purple/20 rounded-t-md animate-pulse-soft h-[30%]"></div>
                  <div className="w-6 bg-portfolio-purple/40 rounded-t-md animate-pulse-soft h-[50%]"></div>
                  <div className="w-6 bg-portfolio-purple/60 rounded-t-md animate-pulse-soft h-[70%]"></div>
                  <div className="w-6 bg-portfolio-purple/80 rounded-t-md animate-pulse-soft h-[60%]"></div>
                  <div className="w-6 bg-portfolio-purple rounded-t-md animate-pulse-soft h-[90%]"></div>
                  <div className="w-6 bg-portfolio-purple/80 rounded-t-md animate-pulse-soft h-[75%]"></div>
                  <div className="w-6 bg-portfolio-purple/60 rounded-t-md animate-pulse-soft h-[40%]"></div>
                  <div className="w-6 bg-portfolio-purple/40 rounded-t-md animate-pulse-soft h-[55%]"></div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-[280px] h-[180px] bg-portfolio-green/5 backdrop-blur-sm rounded-2xl border border-portfolio-green/20 shadow-xl hover-lift animate-float animation-delay-1000 p-4 flex items-center justify-center">
              <LineChart className="w-full h-full text-portfolio-green opacity-70" />
            </div>
            
            <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 w-[150px] h-[150px] bg-portfolio-gold/5 backdrop-blur-sm rounded-2xl border border-portfolio-gold/20 shadow-xl hover-lift animate-float animation-delay-2000 p-4 flex items-center justify-center">
              <BarChart4 className="w-full h-full text-portfolio-gold opacity-70" />
            </div>
            
            <div className="absolute bottom-1/3 right-1/4 w-[100px] h-[100px] bg-gray-100 backdrop-blur-sm rounded-full border border-gray-200 shadow-xl hover-lift animate-float animation-delay-1500 flex items-center justify-center">
              <Database className="w-1/2 h-1/2 text-portfolio-purple opacity-70" />
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a 
          href="#about" 
          className="w-10 h-10 flex items-center justify-center text-portfolio-purple hover:text-portfolio-gold transition-colors"
        >
          <ArrowDownCircle size={24} />
          <span className="sr-only">Scroll down</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;


import React, { useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Dashboard from '@/components/Dashboard';
import Skills from '@/components/Skills';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Messages from '@/components/Messages';
import ErrorBoundary from '@/components/ErrorBoundary';
import { SkillsProvider } from '@/contexts/SkillsContext';

// Lazy load the Hero component
const Hero = React.lazy(() => import('@/components/Hero'));

const Index: React.FC = () => {
  useEffect(() => {
    // Initialize intersection observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all elements with the reveal class
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <SkillsProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <ErrorBoundary componentName="Hero Section">
            <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading hero section...</div>}>
              <Hero />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary componentName="About Section">
            <About />
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Messages Section">
            <Messages />
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Projects Section">
            <Projects />
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Dashboard Section">
            <Dashboard />
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Skills Section">
            <Skills />
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Resume Section">
            <Resume />
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Contact Section">
            <Contact />
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </SkillsProvider>
  );
};

export default Index;

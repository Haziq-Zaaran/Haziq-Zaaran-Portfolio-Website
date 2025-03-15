
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

// Lazy load the Hero component which is causing issues
const Hero = React.lazy(() => import('@/components/Hero'));

// Error boundary props interface
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

// Error boundary state interface
interface ErrorBoundaryState {
  hasError: boolean;
}

// Simple error boundary implementation
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error in component:", error, errorInfo);
  }
  
  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    
    return this.props.children;
  }
}

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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading hero section...</div>}>
          {/* Wrap the Hero component in an error boundary */}
          <ErrorBoundary fallback={<div className="section-container text-center">Could not load hero section. Please check the hero content in admin panel.</div>}>
            <Hero />
          </ErrorBoundary>
        </Suspense>
        <About />
        <Messages />
        <Projects />
        <Dashboard />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

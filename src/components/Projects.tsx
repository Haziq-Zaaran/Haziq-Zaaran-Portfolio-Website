
import React from 'react';
import { ArrowRight, ExternalLink, Github, Plus, FileCode, Eye } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import ProjectForm from './ProjectForm';
import { usePortfolio, Project } from '@/contexts/PortfolioContext';
import { getImageKey, getImageUrl } from '@/utils/imageUtils';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ProjectCard: React.FC<{ project: Project; index: number; isAuthenticated: boolean }> = ({ project, index, isAuthenticated }) => {
  const imageUrl = getImageUrl(getImageKey('project', project.id), project.image);
  const { toast } = useToast();

  const handlePreview = () => {
    // Display a toast when previewing
    toast({
      title: "Preview Mode",
      description: `Previewing "${project.title}" project.`,
    });
    // Open the project demo in a new tab
    window.open(project.demoLink, '_blank');
  };

  return (
    <AnimatedSection
      key={project.id}
      className="group h-full"
      delay={index * 100}
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
        <div className="h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-portfolio-purple/10 text-portfolio-purple text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <CardTitle className="text-xl">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-2 flex-grow">
          <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
        </CardContent>
        <CardFooter className="pt-2 flex justify-between items-center">
          <Button
            variant="link"
            className="p-0 text-portfolio-purple font-medium flex items-center gap-1 hover:gap-2 transition-all"
            asChild
          >
            <a href={project.demoLink}>
              View Project <ArrowRight size={16} />
            </a>
          </Button>
          <div className="flex gap-2">
            {isAuthenticated && (
              <Button
                variant="ghost" 
                size="icon"
                onClick={handlePreview}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-portfolio-purple hover:bg-gray-100 transition-colors"
                title="Preview Project"
              >
                <Eye size={16} />
              </Button>
            )}
            <a
              href={project.demoLink}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-portfolio-purple hover:bg-gray-100 transition-colors"
              title="View Demo"
            >
              <ExternalLink size={16} />
            </a>
            <a
              href={project.codeLink}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-portfolio-purple hover:bg-gray-100 transition-colors"
              title="View Code"
            >
              <Github size={16} />
            </a>
          </div>
        </CardFooter>
      </Card>
    </AnimatedSection>
  );
};

const Projects: React.FC = () => {
  const { portfolioData, addProject } = usePortfolio();
  const { isAuthenticated } = useAuth();
  
  // Filter out hidden projects for display
  const visibleProjects = portfolioData.projects.filter(project => !project.isHidden);

  const handleAddProject = (formData: Omit<Project, 'id' | 'isHidden'>) => {
    addProject(formData);
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            Projects
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-6">
            A showcase of my data analysis work, demonstrating my technical skills and business impact.
          </p>
          
          {isAuthenticated && (
            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-portfolio-purple hover:bg-portfolio-purple/90">
                  <Plus size={16} className="mr-2" /> Add New Project
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto w-full sm:max-w-xl">
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <FileCode size={20} /> Add Project to Portfolio
                  </SheetTitle>
                </SheetHeader>
                <ProjectForm 
                  onSubmit={handleAddProject}
                />
              </SheetContent>
            </Sheet>
          )}
        </AnimatedSection>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {visibleProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              isAuthenticated={isAuthenticated} 
            />
          ))}
        </div>
        
        <AnimatedSection className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Want to see more of my projects?
          </p>
          <a 
            href={portfolioData.contactInfo.githubUrl} 
            className="inline-flex items-center gap-2 text-portfolio-purple font-medium hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit my GitHub <Github size={16} />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Projects;

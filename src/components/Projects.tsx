
import React from 'react';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

// Project type definition to enforce consistency
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoLink: string;
  codeLink: string;
}

// This is a placeholder for your future projects
const projectsData: Project[] = [
  {
    id: 1,
    title: "Sales Data Analysis",
    description: "Analyzed 5 years of sales data to identify trends and opportunities for growth, resulting in a 15% increase in revenue.",
    tags: ["Tableau", "SQL", "Excel"],
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 2,
    title: "Customer Segmentation",
    description: "Developed a customer segmentation model that improved marketing campaign efficiency by 23%.",
    tags: ["Python", "Scikit-learn", "Pandas"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 3,
    title: "Predictive Analytics Dashboard",
    description: "Created an interactive dashboard that forecasts future sales with 92% accuracy.",
    tags: ["Power BI", "R", "DAX"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 4,
    title: "Supply Chain Optimization",
    description: "Optimized inventory levels across 12 warehouses, reducing costs by 18% while maintaining service levels.",
    tags: ["Python", "Optimization", "Visualization"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    demoLink: "#",
    codeLink: "#"
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <AnimatedSection
      key={project.id}
      className="group h-full"
      delay={index * 100}
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
        <div className="h-48 overflow-hidden">
          <img
            src={project.image}
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
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            Projects
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            A showcase of my data analysis work, demonstrating my technical skills and business impact.
          </p>
        </AnimatedSection>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <AnimatedSection className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Want to see more of my projects?
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-portfolio-purple font-medium hover:underline"
          >
            Visit my GitHub <Github size={16} />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Projects;

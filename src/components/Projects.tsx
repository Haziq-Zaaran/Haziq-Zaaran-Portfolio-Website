
import React from 'react';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

// This is a placeholder for your future projects
const projectsData = [
  {
    id: 1,
    title: "Sales Data Analysis",
    description: "Analyzed 5 years of sales data to identify trends and opportunities for growth, resulting in a 15% increase in revenue.",
    tags: ["Tableau", "SQL", "Excel"],
    image: "/placeholder.svg",
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 2,
    title: "Customer Segmentation",
    description: "Developed a customer segmentation model that improved marketing campaign efficiency by 23%.",
    tags: ["Python", "Scikit-learn", "Pandas"],
    image: "/placeholder.svg",
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 3,
    title: "Predictive Analytics Dashboard",
    description: "Created an interactive dashboard that forecasts future sales with 92% accuracy.",
    tags: ["Power BI", "R", "DAX"],
    image: "/placeholder.svg",
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 4,
    title: "Supply Chain Optimization",
    description: "Optimized inventory levels across 12 warehouses, reducing costs by 18% while maintaining service levels.",
    tags: ["Python", "Optimization", "Visualization"],
    image: "/placeholder.svg",
    demoLink: "#",
    codeLink: "#"
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="section-title">Projects</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            A showcase of my data analysis work, demonstrating my technical skills and business impact.
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <AnimatedSection 
              key={project.id} 
              className="group"
              delay={index * 100}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full border border-gray-100 dark:border-gray-700">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-portfolio-purple/10 text-portfolio-purple text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <a 
                      href={project.demoLink} 
                      className="text-portfolio-purple font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View Project <ArrowRight size={16} />
                    </a>
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
                  </div>
                </div>
              </div>
            </AnimatedSection>
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

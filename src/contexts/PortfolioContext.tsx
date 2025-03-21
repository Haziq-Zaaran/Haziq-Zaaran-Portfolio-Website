import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for all editable portfolio sections
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoLink: string;
  codeLink: string;
  isHidden: boolean;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'quote' | 'highlight' | 'list';
}

export interface HeadshotSettings {
  url: string;
  position: {
    x: number;
    y: number;
  };
  aspectRatio: number; // 1 for square, 0.75 for 4:3, etc.
  autoFit: boolean;
}

export interface AboutData {
  background: string;
  yearsOfExperience: string;
  industries: string;
  degree: string;
  field: string;
  university: string;
  certifications: string;
  headshot: string;
  headshotSettings?: HeadshotSettings;
  journey: string;
  sections?: CustomSection[];
}

export interface Dashboard {
  id: number;
  title: string;
  description: string;
  type: string;
  link: string;
  isHidden: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  heroImage?: string;
  navigationTitle?: string;
}

export interface PortfolioData {
  about: AboutData;
  projects: Project[];
  dashboards: Dashboard[];
  contactInfo: ContactInfo;
  hero: HeroData;
}

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updateAbout: (data: Partial<AboutData>) => void;
  addProject: (project: Omit<Project, 'id' | 'isHidden'>) => void;
  updateProject: (id: number, data: Partial<Project>) => void;
  hideProject: (id: number) => void;
  showProject: (id: number) => void;
  deleteProject: (id: number) => void;
  updateDashboard: (id: number, data: Partial<Dashboard>) => void;
  hideDashboard: (id: number) => void;
  showDashboard: (id: number) => void;
  deleteDashboard: (id: number) => void;
  updateContactInfo: (data: Partial<ContactInfo>) => void;
  updateHero: (data: Partial<HeroData>) => void;
}

// Initial data (this would normally come from a database)
const initialPortfolioData: PortfolioData = {
  about: {
    background: "Statistics and Data Science",
    yearsOfExperience: "5+",
    industries: "finance, healthcare, and e-commerce",
    degree: "Master's",
    field: "Data Science",
    university: "State University",
    certifications: "Google Data Analytics, Microsoft Power BI, AWS Data Analytics Specialty",
    headshot: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
    headshotSettings: {
      url: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
      position: { x: 50, y: 50 },
      aspectRatio: 1,
      autoFit: true
    },
    journey: "With a background in Statistics and Data Science, I've developed a passion for uncovering the stories hidden within data. My analytical approach combines technical expertise with creative problem-solving to deliver insights that drive business value.",
    sections: [
      {
        id: "1",
        title: "My Data Philosophy",
        content: "I believe that good data analysis is as much about asking the right questions as it is about having the right tools. Every dataset tells a story, and my job is to help you understand what that story means for your business.",
        type: "text"
      },
      {
        id: "2",
        title: "Client Testimonial",
        content: "Working with this data analyst was transformative for our business. The insights provided helped us increase our revenue by 30% in just six months.",
        type: "quote"
      }
    ]
  },
  projects: [
    {
      id: 1,
      title: "Sales Data Analysis",
      description: "Analyzed 5 years of sales data to identify trends and opportunities for growth, resulting in a 15% increase in revenue.",
      tags: ["Tableau", "SQL", "Excel"],
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      demoLink: "#",
      codeLink: "#",
      isHidden: false
    },
    {
      id: 2,
      title: "Customer Segmentation",
      description: "Developed a customer segmentation model that improved marketing campaign efficiency by 23%.",
      tags: ["Python", "Scikit-learn", "Pandas"],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      demoLink: "#",
      codeLink: "#",
      isHidden: false
    },
    {
      id: 3,
      title: "Predictive Analytics Dashboard",
      description: "Created an interactive dashboard that forecasts future sales with 92% accuracy.",
      tags: ["Power BI", "R", "DAX"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      demoLink: "#",
      codeLink: "#",
      isHidden: false
    },
    {
      id: 4,
      title: "Supply Chain Optimization",
      description: "Optimized inventory levels across 12 warehouses, reducing costs by 18% while maintaining service levels.",
      tags: ["Python", "Optimization", "Visualization"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      demoLink: "#",
      codeLink: "#",
      isHidden: false
    }
  ],
  dashboards: [
    {
      id: 1,
      title: "Sales Performance Dashboard",
      description: "Interactive visualization of sales trends across regions and product categories.",
      type: "Tableau",
      link: "#",
      isHidden: false
    },
    {
      id: 2,
      title: "Customer Behavior Analysis",
      description: "Deep dive into customer segmentation and purchasing patterns.",
      type: "Power BI",
      link: "#",
      isHidden: false
    },
    {
      id: 3,
      title: "Market Trend Forecast",
      description: "Predictive model visualizing future market trends based on historical data.",
      type: "Plotly",
      link: "#",
      isHidden: false
    },
    {
      id: 4,
      title: "Real-time Operations Monitor",
      description: "Live monitoring dashboard for key operational metrics.",
      type: "Grafana",
      link: "#",
      isHidden: false
    }
  ],
  contactInfo: {
    email: "haziqzaaran@gmail.com",
    phone: "+1 (123) 456-7890",
    location: "City, State, Country",
    linkedinUrl: "https://linkedin.com/in/yourusername",
    githubUrl: "https://github.com/yourusername"
  },
  hero: {
    title: "Turning Data into Actionable Insights",
    subtitle: "Data Analyst Portfolio",
    description: "I transform complex data into clear, compelling stories that drive strategic decisions. Explore my portfolio to see how I leverage data analysis to solve real-world problems.",
    heroImage: "",
    navigationTitle: "DataAnalyst"
  }
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load data from localStorage or use initial data
  const loadInitialData = (): PortfolioData => {
    try {
      const savedData = localStorage.getItem('portfolioData');
      return savedData ? JSON.parse(savedData) : initialPortfolioData;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return initialPortfolioData;
    }
  };

  const [portfolioData, setPortfolioData] = useState<PortfolioData>(loadInitialData);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [portfolioData]);

  // About section methods
  const updateAbout = (data: Partial<AboutData>) => {
    setPortfolioData(prev => ({
      ...prev,
      about: { ...prev.about, ...data }
    }));
  };

  // Project methods
  const addProject = (project: Omit<Project, 'id' | 'isHidden'>) => {
    const newId = portfolioData.projects.length > 0 
      ? Math.max(...portfolioData.projects.map(p => p.id)) + 1 
      : 1;
    
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: newId, isHidden: false }]
    }));
  };

  const updateProject = (id: number, data: Partial<Project>) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, ...data } : project
      )
    }));
  };

  const hideProject = (id: number) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, isHidden: true } : project
      )
    }));
  };

  const showProject = (id: number) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, isHidden: false } : project
      )
    }));
  };

  const deleteProject = (id: number) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  // Dashboard methods
  const updateDashboard = (id: number, data: Partial<Dashboard>) => {
    setPortfolioData(prev => ({
      ...prev,
      dashboards: prev.dashboards.map(dashboard => 
        dashboard.id === id ? { ...dashboard, ...data } : dashboard
      )
    }));
  };

  const hideDashboard = (id: number) => {
    setPortfolioData(prev => ({
      ...prev,
      dashboards: prev.dashboards.map(dashboard => 
        dashboard.id === id ? { ...dashboard, isHidden: true } : dashboard
      )
    }));
  };

  const showDashboard = (id: number) => {
    setPortfolioData(prev => ({
      ...prev,
      dashboards: prev.dashboards.map(dashboard => 
        dashboard.id === id ? { ...dashboard, isHidden: false } : dashboard
      )
    }));
  };

  const deleteDashboard = (id: number) => {
    setPortfolioData(prev => ({
      ...prev,
      dashboards: prev.dashboards.filter(dashboard => dashboard.id !== id)
    }));
  };

  // Contact info methods
  const updateContactInfo = (data: Partial<ContactInfo>) => {
    setPortfolioData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, ...data }
    }));
  };

  // Hero section methods
  const updateHero = (data: Partial<HeroData>) => {
    setPortfolioData(prev => ({
      ...prev,
      hero: { ...prev.hero, ...data }
    }));
  };

  return (
    <PortfolioContext.Provider 
      value={{ 
        portfolioData,
        updateAbout,
        addProject,
        updateProject,
        hideProject,
        showProject,
        deleteProject,
        updateDashboard,
        hideDashboard,
        showDashboard,
        deleteDashboard,
        updateContactInfo,
        updateHero
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

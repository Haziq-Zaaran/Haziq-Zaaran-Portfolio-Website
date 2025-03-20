
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Database, LineChart, Code, Server, Activity, Layers, FileCode, Table, BarChart4, Cpu, GitBranch, Terminal } from 'lucide-react';
import PythonIcon from '@/components/icons/PythonIcon';

export interface Skill {
  id: string;
  name: string;
  level: number;
  icon: string; // Store icon name as a string
  category: string;
}

interface SkillsContextType {
  skills: Skill[];
  categories: string[];
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, updates: Partial<Omit<Skill, 'id'>>) => void;
  deleteSkill: (id: string) => void;
  reorderSkill: (id: string, direction: 'up' | 'down') => void;
  getIconComponent: (iconName: string) => React.ElementType;
}

// Map string icon names to their components
export const iconMap: Record<string, React.ElementType> = {
  'Database': Database,
  'LineChart': LineChart,
  'Code': Code,
  'Server': Server,
  'Activity': Activity,
  'Layers': Layers,
  'FileCode': FileCode,
  'Table': Table,
  'BarChart4': BarChart4,
  'Cpu': Cpu,
  'GitBranch': GitBranch,
  'Terminal': Terminal,
  'PythonIcon': PythonIcon
};

// Initial skills data
const initialSkillsData: Skill[] = [
  { id: '1', name: "SQL", level: 90, icon: "Database", category: "Data Analysis" },
  { id: '2', name: "Excel", level: 95, icon: "Table", category: "Data Analysis" },
  { id: '3', name: "Statistical Analysis", level: 85, icon: "Activity", category: "Data Analysis" },
  { id: '4', name: "Tableau", level: 88, icon: "BarChart4", category: "Data Visualization" },
  { id: '5', name: "Power BI", level: 82, icon: "LineChart", category: "Data Visualization" },
  { id: '6', name: "Data Storytelling", level: 90, icon: "LineChart", category: "Data Visualization" },
  { id: '7', name: "Python", level: 80, icon: "PythonIcon", category: "Programming" },
  { id: '8', name: "R", level: 75, icon: "Code", category: "Programming" },
  { id: '9', name: "JavaScript", level: 65, icon: "FileCode", category: "Programming" },
  { id: '10', name: "Hadoop", level: 60, icon: "Server", category: "Big Data" },
  { id: '11', name: "Spark", level: 55, icon: "Cpu", category: "Big Data" },
  { id: '12', name: "Pandas", level: 85, icon: "Layers", category: "Tools & Frameworks" },
  { id: '13', name: "Scikit-learn", level: 75, icon: "Layers", category: "Tools & Frameworks" },
  { id: '14', name: "Git", level: 80, icon: "GitBranch", category: "Tools & Frameworks" },
  { id: '15', name: "Terminal", level: 85, icon: "Terminal", category: "Tools & Frameworks" },
];

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export const SkillsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load skills from localStorage or use initial data
  const loadInitialSkills = (): Skill[] => {
    try {
      const savedSkills = localStorage.getItem('portfolioSkills');
      return savedSkills ? JSON.parse(savedSkills) : initialSkillsData;
    } catch (error) {
      console.error('Error loading skills from localStorage:', error);
      return initialSkillsData;
    }
  };

  const [skills, setSkills] = useState<Skill[]>(loadInitialSkills);
  
  // Get unique categories
  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('portfolioSkills', JSON.stringify(skills));
    } catch (error) {
      console.error('Error saving skills to localStorage:', error);
    }
  }, [skills]);

  // Get the proper icon component from a string name
  const getIconComponent = (iconName: string): React.ElementType => {
    return iconMap[iconName] || Database; // Default to Database if icon not found
  };

  // Add a new skill
  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skill,
      id: Date.now().toString()
    };
    
    setSkills(prevSkills => [...prevSkills, newSkill]);
  };

  // Update an existing skill
  const updateSkill = (id: string, updates: Partial<Omit<Skill, 'id'>>) => {
    setSkills(prevSkills => 
      prevSkills.map(skill => 
        skill.id === id ? { ...skill, ...updates } : skill
      )
    );
  };

  // Delete a skill
  const deleteSkill = (id: string) => {
    setSkills(prevSkills => prevSkills.filter(skill => skill.id !== id));
  };

  // Reorder a skill (move up or down in the list)
  const reorderSkill = (id: string, direction: 'up' | 'down') => {
    const skillIndex = skills.findIndex(skill => skill.id === id);
    
    if (skillIndex === -1) return;
    
    const newSkills = [...skills];
    
    if (direction === 'up' && skillIndex > 0) {
      // Move skill up
      [newSkills[skillIndex - 1], newSkills[skillIndex]] = [newSkills[skillIndex], newSkills[skillIndex - 1]];
    } else if (direction === 'down' && skillIndex < skills.length - 1) {
      // Move skill down
      [newSkills[skillIndex], newSkills[skillIndex + 1]] = [newSkills[skillIndex + 1], newSkills[skillIndex]];
    } else {
      // Can't move further in that direction
      return;
    }
    
    setSkills(newSkills);
  };

  return (
    <SkillsContext.Provider 
      value={{ 
        skills,
        categories,
        addSkill,
        updateSkill,
        deleteSkill,
        reorderSkill,
        getIconComponent
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkills = (): SkillsContextType => {
  const context = useContext(SkillsContext);
  if (context === undefined) {
    throw new Error('useSkills must be used within a SkillsProvider');
  }
  return context;
};

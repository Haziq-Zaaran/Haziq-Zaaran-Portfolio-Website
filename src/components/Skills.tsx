
import React, { useEffect, useRef, useState } from 'react';
import { Database, LineChart, Code, Server, Activity, Layers, Python, FileCode, Table, BarChart4, Cpu, GitBranch, Terminal } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface Skill {
  name: string;
  level: number;
  icon: React.ElementType;
  category: string;
}

const skillsData: Skill[] = [
  // Data Analysis
  { name: "SQL", level: 90, icon: Database, category: "Data Analysis" },
  { name: "Excel", level: 95, icon: Table, category: "Data Analysis" },
  { name: "Statistical Analysis", level: 85, icon: Activity, category: "Data Analysis" },
  
  // Data Visualization
  { name: "Tableau", level: 88, icon: BarChart4, category: "Data Visualization" },
  { name: "Power BI", level: 82, icon: LineChart, category: "Data Visualization" },
  { name: "Data Storytelling", level: 90, icon: LineChart, category: "Data Visualization" },
  
  // Programming
  { name: "Python", level: 80, icon: Python, category: "Programming" },
  { name: "R", level: 75, icon: Code, category: "Programming" },
  { name: "JavaScript", level: 65, icon: FileCode, category: "Programming" },
  
  // Big Data
  { name: "Hadoop", level: 60, icon: Server, category: "Big Data" },
  { name: "Spark", level: 55, icon: Cpu, category: "Big Data" },
  
  // Tools & Frameworks
  { name: "Pandas", level: 85, icon: Layers, category: "Tools & Frameworks" },
  { name: "Scikit-learn", level: 75, icon: Layers, category: "Tools & Frameworks" },
  { name: "Git", level: 80, icon: GitBranch, category: "Tools & Frameworks" },
  { name: "Terminal", level: 85, icon: Terminal, category: "Tools & Frameworks" },
];

const categories = Array.from(new Set(skillsData.map(skill => skill.category)));

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [visibleSkills, setVisibleSkills] = useState<Skill[]>([]);
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleSkills(skillsData.filter(skill => skill.category === activeCategory));
    setAnimated(false);
    
    // Reset animation after filter
    setTimeout(() => {
      setAnimated(true);
    }, 100);
  }, [activeCategory]);

  // Animation for skill bars
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="skills" className="py-20" ref={sectionRef}>
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            My technical toolkit and proficiency in various data analysis technologies and methodologies.
          </p>
        </AnimatedSection>
        
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-portfolio-purple text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {visibleSkills.map((skill, index) => (
            <AnimatedSection 
              key={skill.name} 
              className="flex flex-col"
              delay={index * 100}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-portfolio-purple/10 flex items-center justify-center text-portfolio-purple">
                    <skill.icon size={16} />
                  </div>
                  <span className="font-medium">{skill.name}</span>
                </div>
                <span className="text-sm text-gray-500">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ 
                    width: animated ? `${skill.level}%` : '0%',
                    backgroundColor: 
                      skill.level > 85 ? 'rgb(102, 51, 153)' : // portfolio-purple
                      skill.level > 70 ? 'rgb(134, 163, 151)' : // portfolio-green
                      'rgb(212, 180, 131)' // portfolio-gold
                  }}
                ></div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection className="mt-20">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Data Analysis Process</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                A structured approach to extracting insights from data
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-portfolio-purple/10 flex items-center justify-center text-portfolio-purple mx-auto mb-4">
                  <Database size={24} />
                </div>
                <h4 className="font-bold mb-2">Data Collection & Cleaning</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Gathering and preparing data from multiple sources to ensure accuracy and consistency.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-portfolio-green/10 flex items-center justify-center text-portfolio-green mx-auto mb-4">
                  <Activity size={24} />
                </div>
                <h4 className="font-bold mb-2">Analysis & Modeling</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Applying statistical methods and machine learning techniques to uncover patterns and insights.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-portfolio-gold/10 flex items-center justify-center text-portfolio-gold mx-auto mb-4">
                  <LineChart size={24} />
                </div>
                <h4 className="font-bold mb-2">Visualization & Communication</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Creating compelling visualizations and clear narratives to communicate findings effectively.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills;

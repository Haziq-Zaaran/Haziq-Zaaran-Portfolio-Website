
import React from 'react';
import { FileText, Download, Briefcase, Calendar, GraduationCap } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

// Customize your professional experience
const experiences = [
  {
    role: "Senior Data Analyst",
    company: "Tech Corporation",
    period: "2020 - Present",
    description: "Led data analysis initiatives that improved decision-making across multiple departments. Developed interactive dashboards using Tableau and Power BI.",
    achievements: [
      "Implemented automated reporting system that saved 15 hours per week",
      "Developed predictive model that increased sales forecast accuracy by 22%",
      "Mentored junior analysts and conducted internal workshops on data visualization"
    ]
  },
  {
    role: "Data Analyst",
    company: "Analytics Solutions Inc.",
    period: "2017 - 2020",
    description: "Conducted in-depth analysis of customer behavior and market trends. Collaborated with cross-functional teams to implement data-driven strategies.",
    achievements: [
      "Identified key customer segments that led to 18% increase in retention",
      "Optimized marketing campaigns through A/B testing and cohort analysis",
      "Designed interactive dashboard that improved executive decision-making"
    ]
  },
  {
    role: "Data Analytics Intern",
    company: "StartUp Innovations",
    period: "2016 - 2017",
    description: "Assisted in data collection, cleaning, and preliminary analysis for various projects.",
    achievements: [
      "Developed automated ETL processes that improved data quality by 30%",
      "Created weekly reports for management using Excel and SQL",
      "Participated in client presentations and stakeholder meetings"
    ]
  }
];

// Customize your education
const education = [
  {
    degree: "Master of Science in Data Science",
    institution: "University of Data Analytics",
    period: "2015 - 2017",
    description: "Focused on advanced statistical methods, machine learning, and data visualization."
  },
  {
    degree: "Bachelor of Science in Statistics",
    institution: "State University",
    period: "2011 - 2015",
    description: "Core studies in statistical methods, mathematics, and computer science."
  }
];

// Customize your certifications
const certifications = [
  {
    name: "Microsoft Certified: Data Analyst Associate",
    issuer: "Microsoft",
    year: "2021"
  },
  {
    name: "Tableau Desktop Specialist",
    issuer: "Tableau",
    year: "2020"
  },
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    year: "2019"
  }
];

// Customize your resume download link
const resumeDownloadLink = "#"; // Replace with actual link to your resume file

const Resume: React.FC = () => {
  return (
    <section id="resume" className="py-20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="section-title">Resume & Experience</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            My professional journey and educational background in the field of data analysis.
          </p>
          <div className="mt-6">
            <a 
              href={resumeDownloadLink} 
              className="btn-primary inline-flex items-center gap-2"
              role="button"
            >
              <Download size={18} />
              Download Full Resume
            </a>
          </div>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-8">
          <AnimatedSection animation="fade-in-left" className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="text-portfolio-purple" size={24} />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Professional Experience</h3>
              </div>
              
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-2 border-portfolio-purple/30 pl-5 relative">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-portfolio-purple"></div>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">{exp.role}</h4>
                      <div className="inline-flex items-center px-3 py-1 bg-portfolio-purple/10 text-portfolio-purple rounded-full text-sm">
                        <Calendar size={14} className="mr-1" />
                        {exp.period}
                      </div>
                    </div>
                    <h5 className="text-lg font-medium text-portfolio-green mb-2">{exp.company}</h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-right">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-portfolio-purple" size={24} />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Education</h3>
              </div>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-portfolio-green/30 pl-5 relative">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-portfolio-green"></div>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">{edu.degree}</h4>
                      <div className="inline-flex items-center px-3 py-1 bg-portfolio-green/10 text-portfolio-green rounded-full text-sm">
                        {edu.period}
                      </div>
                    </div>
                    <h5 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{edu.institution}</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Certifications</h3>
              <ul className="space-y-3">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-portfolio-gold/10 flex items-center justify-center text-portfolio-gold flex-shrink-0">
                      <FileText size={16} />
                    </div>
                    <div>
                      <h5 className="font-medium">{cert.name}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}, {cert.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Resume;

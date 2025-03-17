import React, { useState, useEffect } from 'react';
import { FileText, Download, Briefcase, Calendar, GraduationCap, Upload, Trash2, Eye, FilePlus } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { getStoredResume, storeResume, removeStoredResume, ResumeFile } from '@/models/ResumeModel';

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

const Resume: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<ResumeFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const storedResume = getStoredResume();
    if (storedResume) {
      setResumeFile(storedResume);
    }
  }, []);

  const handleDownload = () => {
    if (resumeFile?.url) {
      const link = document.createElement('a');
      link.href = resumeFile.url;
      link.download = resumeFile.fileName;
      link.click();
    } else {
      toast({
        title: "Resume not available",
        description: "The resume file is not currently available for download.",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOCX, or TXT file.",
        variant: "destructive",
      });
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const fileUrl = URL.createObjectURL(file);
      
      const newResumeFile: ResumeFile = {
        id: Date.now().toString(),
        fileName: file.name,
        fileType: file.type,
        lastModified: file.lastModified,
        url: fileUrl,
        size: file.size
      };
      
      storeResume(newResumeFile);
      
      setResumeFile(newResumeFile);
      
      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully.",
      });
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resume.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      removeStoredResume();
      
      if (resumeFile?.url && resumeFile.url.startsWith('blob:')) {
        URL.revokeObjectURL(resumeFile.url);
      }
      
      setResumeFile(null);
      
      toast({
        title: "Resume deleted",
        description: "Your resume has been removed successfully.",
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting your resume.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    if (resumeFile) {
      setPreviewOpen(true);
    }
  };

  return (
    <section id="resume" className="py-20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="section-title">Resume & Experience</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            My professional journey and educational background in the field of data analysis.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {resumeFile ? (
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  onClick={handleDownload}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Download size={18} />
                  Download Resume
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handlePreview}
                  className="inline-flex items-center gap-2"
                >
                  <Eye size={18} />
                  Preview Resume
                </Button>
                
                {isAuthenticated && (
                  <Button 
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                    {isLoading ? 'Deleting...' : 'Delete Resume'}
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  disabled
                  variant="outline"
                  className="inline-flex items-center gap-2 opacity-70"
                >
                  <Download size={18} />
                  Resume Not Available
                </Button>
                
                {isAuthenticated && (
                  <Button 
                    variant="outline"
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 relative overflow-hidden"
                  >
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                      onChange={handleUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <FilePlus size={18} />
                    {isLoading ? 'Uploading...' : 'Upload Resume'}
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {resumeFile && (
            <div className="mt-4 text-sm text-gray-500">
              <p>Current resume: {resumeFile.fileName} ({(resumeFile.size / 1024).toFixed(2)} KB)</p>
            </div>
          )}
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
      
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Resume Preview - {resumeFile?.fileName}</DialogTitle>
            <DialogDescription>
              Your uploaded resume document
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 min-h-0 mt-4 overflow-auto">
            {resumeFile?.fileType === 'application/pdf' ? (
              <iframe 
                src={resumeFile.url} 
                className="w-full h-full min-h-[70vh] border rounded"
                title="Resume Preview"
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[50vh] border rounded p-4 bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                  <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium">Preview not available</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    This file type ({resumeFile?.fileType.split('/')[1]}) cannot be previewed directly.
                    <br />Please download the file to view it.
                  </p>
                  <Button onClick={handleDownload} className="mt-4">
                    <Download size={16} className="mr-2" />
                    Download to view
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Resume;

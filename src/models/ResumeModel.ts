
export interface ResumeFile {
  id: string;
  fileName: string;
  fileType: string;
  lastModified: number;
  url: string;
  size: number;
}

export const getStoredResume = (): ResumeFile | null => {
  try {
    const resumeData = localStorage.getItem('portfolioResume');
    return resumeData ? JSON.parse(resumeData) : null;
  } catch (error) {
    console.error('Error retrieving resume from storage:', error);
    return null;
  }
};

export const storeResume = (resume: ResumeFile): void => {
  try {
    localStorage.setItem('portfolioResume', JSON.stringify(resume));
  } catch (error) {
    console.error('Error storing resume:', error);
  }
};

export const removeStoredResume = (): void => {
  try {
    localStorage.removeItem('portfolioResume');
  } catch (error) {
    console.error('Error removing resume from storage:', error);
  }
};

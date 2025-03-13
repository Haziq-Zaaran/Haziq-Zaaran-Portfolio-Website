
import React from 'react';
import { ArrowUp } from 'lucide-react';

// Customize your footer information
const footerInfo = {
  portfolioName: "Data Analyst",
  portfolioHighlight: "Portfolio",
  tagline: "Transforming data into actionable insights",
  copyrightName: "Data Analyst Portfolio"
};

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-xl font-bold text-portfolio-purple">
              {footerInfo.portfolioName}<span className="text-portfolio-gold">{footerInfo.portfolioHighlight}</span>
            </a>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              {footerInfo.tagline}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-portfolio-purple/10 text-portfolio-purple hover:bg-portfolio-purple/20 transition-colors mb-4"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} {footerInfo.copyrightName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';

interface PythonIconProps {
  size?: number;
  className?: string;
}

const PythonIcon: React.FC<PythonIconProps> = ({ size = 24, className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 8.5c1.7 0 3-.8 3-3s-1.3-3-3-3-3 .8-3 3 1.3 3 3 3z" />
      <path d="M19 5H5a2 2 0 0 0-2 2v3.5C3 14 5 16 8.5 16H12" />
      <path d="M12 12.5c-1.7 0-3 .8-3 3s1.3 3 3 3 3-.8 3-3-.8-3-3-3z" />
      <path d="M5 19h14a2 2 0 0 0 2-2v-3.5c0-3.5-2-5.5-5.5-5.5H12" />
    </svg>
  );
};

export default PythonIcon;

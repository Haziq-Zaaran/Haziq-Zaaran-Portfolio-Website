
import React, { useEffect, useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

// Build ID injected by Vite during build
declare const __BUILD_ID__: string;

const VersionChecker: React.FC = () => {
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);
  
  useEffect(() => {
    // Set the initial version from the build
    if (typeof __BUILD_ID__ !== 'undefined') {
      setCurrentVersion(__BUILD_ID__);
      
      // Store the current version in localStorage
      try {
        const storedVersion = localStorage.getItem('portfolio_build_version');
        if (!storedVersion) {
          localStorage.setItem('portfolio_build_version', __BUILD_ID__);
        } else if (storedVersion !== __BUILD_ID__) {
          // If versions don't match, user is on a new version
          localStorage.setItem('portfolio_build_version', __BUILD_ID__);
          
          // Show toast about the new version
          toast({
            title: "Portfolio Updated",
            description: "You're now using the latest version of the portfolio.",
            duration: 5000,
          });
        }
      } catch (e) {
        console.warn('Unable to check version in localStorage:', e);
      }
    }
    
    // Set up a version check every 5 minutes
    const checkForUpdates = async () => {
      try {
        // Fetch a small file with a timestamp query to bypass cache
        const timestamp = new Date().getTime();
        const response = await fetch(`/version.json?t=${timestamp}`);
        
        if (response.ok) {
          const data = await response.json();
          
          // If the fetched version is different from current, notify user
          if (data.buildId && currentVersion && data.buildId !== currentVersion) {
            toast({
              title: "Update Available",
              description: "A new version of the portfolio is available.",
              action: (
                <Button 
                  onClick={() => window.location.reload()} 
                  size="sm"
                  className="gap-1"
                >
                  <RefreshCw size={14} />
                  Refresh
                </Button>
              ),
              duration: 0, // Don't auto-dismiss
            });
          }
        }
      } catch (error) {
        console.warn('Error checking for updates:', error);
      }
    };
    
    // Check for updates periodically
    const interval = setInterval(checkForUpdates, 5 * 60 * 1000); // Every 5 minutes
    
    return () => clearInterval(interval);
  }, [currentVersion]);
  
  return null; // This component doesn't render anything
};

export default VersionChecker;

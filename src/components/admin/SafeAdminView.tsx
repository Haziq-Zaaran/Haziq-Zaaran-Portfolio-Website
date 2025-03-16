
import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface SafeAdminViewProps {
  children: (data: any) => React.ReactNode;
  fallback?: React.ReactNode;
}

const SafeAdminView: React.FC<SafeAdminViewProps> = ({ children, fallback }) => {
  const portfolioContext = usePortfolio();
  
  // Check if data is available
  if (!portfolioContext || !portfolioContext.portfolio) {
    return fallback || (
      <Alert variant="destructive" className="my-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Data not available</AlertTitle>
        <AlertDescription>
          The portfolio data is not available. Please refresh the page or try again later.
        </AlertDescription>
      </Alert>
    );
  }
  
  return <>{children(portfolioContext.portfolio)}</>;
};

export default SafeAdminView;

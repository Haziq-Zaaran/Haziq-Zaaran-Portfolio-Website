
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  componentName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
  errorInfo?: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { 
    hasError: false,
    error: null,
    errorInfo: null
  };
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { 
      hasError: true,
      error 
    };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const componentName = this.props.componentName || 'component';
    console.error(`Error in ${componentName}:`, error);
    console.error("Component stack:", errorInfo.componentStack);
    
    this.setState({
      errorInfo
    });
  }
  
  render(): React.ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-center">
          <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
            {this.props.componentName 
              ? `There was an error loading the ${this.props.componentName}.` 
              : 'There was an error loading this content.'}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {this.state.error?.message}
          </p>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default ErrorBoundary;

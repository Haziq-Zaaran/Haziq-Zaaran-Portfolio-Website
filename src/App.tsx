
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { Suspense, useEffect } from "react";
import { initializeVersionedStorage } from "./utils/storageUtils";
import { toast } from "@/components/ui/use-toast";

// Register service worker for better caching control
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
          
          // Check for updates
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) return;
            
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New content is available; notify the user
                  toast({
                    title: "New version available",
                    description: "Refresh the page to see the latest updates.",
                    action: (
                      <button 
                        onClick={() => window.location.reload()}
                        className="px-3 py-2 bg-primary text-primary-foreground rounded-md"
                      >
                        Refresh
                      </button>
                    ),
                  });
                }
              }
            };
          };
        })
        .catch(error => {
          console.error('ServiceWorker registration failed: ', error);
        });
    });
  }
};

// Configure the query client with error handling and cache invalidation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes - shorter to avoid stale data
    },
    mutations: {},
  },
});

// Global error reset function
const handleGlobalErrorReset = () => {
  // Clear any global error state here
  // Could also reset the query client cache if needed
  queryClient.clear();
  
  // Reload the application to ensure a clean state
  window.location.reload();
};

const App = () => {
  useEffect(() => {
    // Initialize versioned storage
    initializeVersionedStorage();
    
    // Register service worker
    registerServiceWorker();
    
    // Add listener for storage events (for cross-tab updates)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key && event.key.startsWith('portfolio_')) {
        toast({
          title: "Data Updated",
          description: "The portfolio data has been updated in another tab.",
          variant: "default",
        });
        
        // Optionally refresh the data without a full page reload
        queryClient.invalidateQueries();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ErrorBoundary 
      componentName="Application" 
      onReset={handleGlobalErrorReset}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PortfolioProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading application...</div>}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute>
                          <Admin />
                        </ProtectedRoute>
                      } 
                    />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </PortfolioProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;

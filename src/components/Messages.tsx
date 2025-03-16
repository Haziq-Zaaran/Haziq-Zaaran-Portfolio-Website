
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedSection from './AnimatedSection';
import { Mail, Clock, User, Shield, AlertTriangle } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';
import { toast } from '@/components/ui/use-toast';

// Temporary interface for messages until Supabase is integrated
interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  read?: boolean;
}

const Messages: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch messages if user is authenticated
    if (!isAuthenticated) return;
    
    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Mock data for now - will be replaced with Supabase fetch
        const mockMessages = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Job Opportunity',
            message: 'Hi there! I saw your portfolio and I\'m impressed with your data analysis skills. Would you be interested in discussing a potential project?',
            created_at: '2023-06-15T10:30:00',
            read: false
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            subject: 'Collaboration Request',
            message: 'Hello! I\'m working on a data visualization project and would love to collaborate. Let me know if you\'re interested!',
            created_at: '2023-06-10T14:45:00',
            read: true
          },
          {
            id: '3',
            name: 'Alex Johnson',
            email: 'alex@example.com',
            subject: 'Question about your dashboard',
            message: 'I noticed the interactive dashboard on your portfolio. What tools did you use to create it? I\'d love to learn more about your process.',
            created_at: '2023-06-05T09:15:00',
            read: false
          }
        ];

        // Simulate loading from database
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessages(mockMessages);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages. Please try again later.');
        toast({
          title: "Error loading messages",
          description: "Could not retrieve your messages. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }

      // When Supabase is integrated, replace with:
      // const fetchMessages = async () => {
      //   setIsLoading(true);
      //   try {
      //     const { data, error } = await supabase
      //       .from('messages')
      //       .select('*')
      //       .order('created_at', { ascending: false });
      //     
      //     if (error) throw new Error(error.message);
      //     if (data) {
      //       setMessages(data);
      //     }
      //   } catch (err) {
      //     console.error('Error fetching messages:', err);
      //     setError('Failed to load messages');
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };
    };
    
    fetchMessages();
  }, [isAuthenticated]);

  // Don't render this section at all for non-authenticated users
  if (!isAuthenticated) {
    return null;
  }

  const handleResetError = () => {
    setError(null);
    // Could also re-fetch data here
  };

  return (
    <section id="messages" className="py-20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="section-title flex items-center justify-center gap-2">
            Messages 
            <span className="inline-block bg-portfolio-purple text-white text-sm py-1 px-3 rounded-full">
              {messages.length}
            </span>
            <Shield className="h-5 w-5 text-portfolio-purple ml-2" aria-label="Admin only content" />
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Messages received from visitors to your portfolio
          </p>
        </AnimatedSection>

        <ErrorBoundary componentName="Messages Section" onReset={handleResetError}>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-portfolio-purple"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">Error loading messages</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">{error}</p>
              <button 
                onClick={handleResetError}
                className="mt-4 px-4 py-2 bg-portfolio-purple text-white rounded-md hover:bg-portfolio-purple/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {messages.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Mail className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No messages yet</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">You haven't received any messages from visitors.</p>
                </div>
              ) : (
                messages.map((message) => (
                  <AnimatedSection key={message.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                        {message.subject}
                        {!message.read && (
                          <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full" title="Unread message"></span>
                        )}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock size={16} className="mr-1" />
                        {new Date(message.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-3 text-gray-600 dark:text-gray-300">
                      <User size={16} className="mr-1" />
                      <span className="font-medium">{message.name}</span>
                      <span className="mx-2">•</span>
                      <a href={`mailto:${message.email}`} className="text-portfolio-purple hover:underline">
                        {message.email}
                      </a>
                    </div>
                    
                    <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-gray-700 dark:text-gray-200">
                      {message.message}
                    </div>
                  </AnimatedSection>
                ))
              )}
            </div>
          )}
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default Messages;


import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedSection from './AnimatedSection';
import { Mail, Clock, User, Shield, AlertTriangle, Trash2, Eye, RefreshCw } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { getStoredMessages, markMessageAsRead, deleteMessage } from '@/utils/messageUtils';

// Interface for messages
interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  read?: boolean;
}

// Message item component to reduce complexity
const MessageItem: React.FC<{ 
  message: Message; 
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ message, onMarkAsRead, onDelete }) => (
  <AnimatedSection className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
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

    <div className="mt-4 flex justify-end space-x-2">
      {!message.read && (
        <button 
          onClick={() => onMarkAsRead(message.id)}
          className="text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full p-2 transition-colors"
          title="Mark as read"
        >
          <Eye size={16} />
        </button>
      )}
      <button 
        onClick={() => onDelete(message.id)}
        className="text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-full p-2 transition-colors"
        title="Delete message"
      >
        <Trash2 size={16} />
      </button>
    </div>
  </AnimatedSection>
);

// Loading state component
const MessageLoading = () => (
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-portfolio-purple"></div>
  </div>
);

// Error state component
const MessageError: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="text-center py-10 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
    <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">Error loading messages</h3>
    <p className="mt-1 text-gray-500 dark:text-gray-400">{error}</p>
    <button 
      onClick={onRetry}
      className="mt-4 px-4 py-2 bg-portfolio-purple text-white rounded-md hover:bg-portfolio-purple/90 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Empty state component
const NoMessages = () => (
  <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
    <Mail className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No messages yet</h3>
    <p className="mt-1 text-gray-500 dark:text-gray-400">You haven't received any messages from visitors.</p>
  </div>
);

const Messages: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get messages from localStorage
      const storedMessages = getStoredMessages();
      
      // Sort messages by date (newest first)
      const sortedMessages = storedMessages.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
      setMessages(sortedMessages);
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
  };

  useEffect(() => {
    // Only fetch messages if user is authenticated
    if (!isAuthenticated) return;
    
    fetchMessages();
  }, [isAuthenticated]);

  // Handle marking a message as read
  const handleMarkAsRead = (id: string) => {
    try {
      markMessageAsRead(id);
      
      // Update the local state
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === id ? { ...msg, read: true } : msg
        )
      );
      
      toast({
        title: "Message marked as read",
        description: "The message has been marked as read.",
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast({
        title: "Error",
        description: "Could not mark message as read. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle deleting a message
  const handleDeleteMessage = (id: string) => {
    try {
      deleteMessage(id);
      
      // Update the local state
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
      
      toast({
        title: "Message deleted",
        description: "The message has been permanently deleted.",
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "Could not delete message. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle refreshing messages
  const handleRefresh = () => {
    fetchMessages();
    toast({
      title: "Messages refreshed",
      description: "Your message list has been updated.",
    });
  };

  // Don't render this section at all for non-authenticated users
  if (!isAuthenticated) {
    return null;
  }

  const handleResetError = () => {
    setError(null);
    fetchMessages();
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

        <div className="flex justify-end mb-4">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <RefreshCw size={16} />
            Refresh Messages
          </button>
        </div>

        <ErrorBoundary componentName="Messages Section" onReset={handleResetError}>
          {isLoading ? (
            <MessageLoading />
          ) : error ? (
            <MessageError error={error} onRetry={handleResetError} />
          ) : (
            <div className="grid gap-6">
              {messages.length === 0 ? (
                <NoMessages />
              ) : (
                messages.map((message) => (
                  <MessageItem 
                    key={message.id} 
                    message={message} 
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDeleteMessage}
                  />
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

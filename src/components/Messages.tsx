
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedSection from './AnimatedSection';
import { Mail, Clock, User } from 'lucide-react';

// Temporary interface for messages until Supabase is integrated
interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const Messages: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only fetch messages if user is authenticated
    if (!isAuthenticated) return;
    
    // Mock data for now - will be replaced with Supabase fetch
    const mockMessages = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Job Opportunity',
        message: 'Hi there! I saw your portfolio and I\'m impressed with your data analysis skills. Would you be interested in discussing a potential project?',
        created_at: '2023-06-15T10:30:00'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Collaboration Request',
        message: 'Hello! I\'m working on a data visualization project and would love to collaborate. Let me know if you\'re interested!',
        created_at: '2023-06-10T14:45:00'
      },
      {
        id: '3',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        subject: 'Question about your dashboard',
        message: 'I noticed the interactive dashboard on your portfolio. What tools did you use to create it? I\'d love to learn more about your process.',
        created_at: '2023-06-05T09:15:00'
      }
    ];

    // Simulate loading from database
    setTimeout(() => {
      setMessages(mockMessages);
      setIsLoading(false);
    }, 1000);

    // When Supabase is integrated, replace with:
    // const fetchMessages = async () => {
    //   setIsLoading(true);
    //   const { data, error } = await supabase
    //     .from('messages')
    //     .select('*')
    //     .order('created_at', { ascending: false });
    //   
    //   if (data) {
    //     setMessages(data);
    //   } else if (error) {
    //     console.error('Error fetching messages:', error);
    //   }
    //   setIsLoading(false);
    // };
    // 
    // fetchMessages();
  }, [isAuthenticated]);

  // Don't render this section at all for non-authenticated users
  if (!isAuthenticated) {
    return null;
  }

  return (
    <section id="messages" className="py-20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="section-title">
            Messages <span className="inline-block bg-portfolio-purple text-white text-sm py-1 px-3 rounded-full ml-2">
              {messages.length}
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Messages received from visitors to your portfolio
          </p>
        </AnimatedSection>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-portfolio-purple"></div>
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
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{message.subject}</h3>
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
      </div>
    </section>
  );
};

export default Messages;

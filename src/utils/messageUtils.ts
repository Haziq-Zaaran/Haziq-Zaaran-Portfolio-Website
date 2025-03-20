
interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  read?: boolean;
}

// Generate a unique ID for messages
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Retrieve messages from localStorage
export const getStoredMessages = (): Message[] => {
  try {
    const messagesData = localStorage.getItem('portfolioMessages');
    return messagesData ? JSON.parse(messagesData) : [];
  } catch (error) {
    console.error('Error retrieving messages from storage:', error);
    return [];
  }
};

// Store messages in localStorage
export const storeMessages = (messages: Message[]): void => {
  try {
    localStorage.setItem('portfolioMessages', JSON.stringify(messages));
  } catch (error) {
    console.error('Error storing messages:', error);
  }
};

// Add a new message to storage
export const addMessage = (messageData: Omit<Message, 'id' | 'created_at' | 'read'>): Message => {
  const messages = getStoredMessages();
  
  const newMessage: Message = {
    id: generateId(),
    ...messageData,
    created_at: new Date().toISOString(),
    read: false
  };
  
  messages.push(newMessage);
  storeMessages(messages);
  
  return newMessage;
};

// Mark a message as read
export const markMessageAsRead = (id: string): void => {
  const messages = getStoredMessages();
  const updatedMessages = messages.map(message => 
    message.id === id ? { ...message, read: true } : message
  );
  
  storeMessages(updatedMessages);
};

// Delete a message
export const deleteMessage = (id: string): void => {
  const messages = getStoredMessages();
  const updatedMessages = messages.filter(message => message.id !== id);
  
  storeMessages(updatedMessages);
};

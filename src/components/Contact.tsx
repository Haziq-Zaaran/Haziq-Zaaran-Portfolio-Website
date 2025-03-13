
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useToast } from '@/hooks/use-toast';

// Customize your contact information here
const contactInfo = {
  email: "your.email@example.com",
  phone: "+1 (123) 456-7890",
  location: "City, State, Country",
  linkedinUrl: "https://linkedin.com/in/yourusername",
  githubUrl: "https://github.com/yourusername"
};

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="section-title">Get In Touch</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Have a project in mind or want to discuss data analysis opportunities? Feel free to reach out!
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-8">
          <AnimatedSection animation="fade-in-left" className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 h-full">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-portfolio-purple/10 flex items-center justify-center text-portfolio-purple flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Email</h4>
                    <a href={`mailto:${contactInfo.email}`} className="text-portfolio-purple hover:underline">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-portfolio-green/10 flex items-center justify-center text-portfolio-green flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Phone</h4>
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-gray-600 dark:text-gray-400 hover:text-portfolio-green">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-portfolio-gold/10 flex items-center justify-center text-portfolio-gold flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {contactInfo.location}
                    </p>
                  </div>
                </div>
              </div>
              
              <hr className="my-6 border-gray-200 dark:border-gray-700" />
              
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                <a 
                  href={contactInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-portfolio-purple hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href={contactInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-right" className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-portfolio-purple"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-portfolio-purple"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-portfolio-purple"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-portfolio-purple"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className={`btn-primary flex items-center justify-center gap-2 w-full md:w-auto ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;


import React, { useState } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const ContactAdmin: React.FC = () => {
  const { portfolioData, updateContactInfo } = usePortfolio();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: portfolioData.contactInfo.email,
    phone: portfolioData.contactInfo.phone,
    location: portfolioData.contactInfo.location,
    linkedinUrl: portfolioData.contactInfo.linkedinUrl,
    githubUrl: portfolioData.contactInfo.githubUrl
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(formData);
    toast({
      title: 'Contact Information Updated',
      description: 'Your contact details have been updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Contact Information</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="relative">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="relative">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="https://linkedin.com/in/yourusername"
                />
              </div>
            </div>
            <div className="relative">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <div className="relative">
                <Github className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="https://github.com/yourusername"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit">
          <Save size={16} className="mr-2" />
          Save Contact Information
        </Button>
      </form>
    </div>
  );
};

export default ContactAdmin;

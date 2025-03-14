
import React, { useState } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const AboutAdmin: React.FC = () => {
  const { portfolioData, updateAbout } = usePortfolio();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    background: portfolioData.about.background,
    yearsOfExperience: portfolioData.about.yearsOfExperience,
    industries: portfolioData.about.industries,
    degree: portfolioData.about.degree,
    field: portfolioData.about.field,
    university: portfolioData.about.university,
    certifications: portfolioData.about.certifications,
    headshot: portfolioData.about.headshot,
    journey: portfolioData.about.journey
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(formData);
    toast({
      title: 'About Section Updated',
      description: 'Your personal information has been updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit About Section</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="background">Background</Label>
                <Input
                  id="background"
                  name="background"
                  value={formData.background}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="industries">Industries</Label>
                <Input
                  id="industries"
                  name="industries"
                  value={formData.industries}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Education & Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="degree">Degree</Label>
                <Input
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="field">Field of Study</Label>
                <Input
                  id="field"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="certifications">Certifications</Label>
                <Input
                  id="certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Professional Headshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="headshot">Headshot Image URL</Label>
              <Input
                id="headshot"
                name="headshot"
                value={formData.headshot}
                onChange={handleChange}
              />
            </div>
            <div className="aspect-square w-32 h-32 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 mx-auto">
              {formData.headshot ? (
                <img
                  src={formData.headshot}
                  alt="Professional Headshot"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No image
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">My Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="journey">Journey Description</Label>
              <Textarea
                id="journey"
                name="journey"
                value={formData.journey}
                onChange={handleChange}
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full md:w-auto">
          <Save size={16} className="mr-2" />
          Save About Section
        </Button>
      </form>
    </div>
  );
};

export default AboutAdmin;

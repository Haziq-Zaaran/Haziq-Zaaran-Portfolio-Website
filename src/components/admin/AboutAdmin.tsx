
import React, { useState } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeAdminView from './SafeAdminView';

const AboutAdmin: React.FC = () => {
  const { portfolioData, updateAbout } = usePortfolio();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('basic');
  
  const [formData, setFormData] = useState({
    background: portfolioData.about.background,
    yearsOfExperience: portfolioData.about.yearsOfExperience,
    industries: portfolioData.about.industries,
    degree: portfolioData.about.degree,
    field: portfolioData.about.field,
    university: portfolioData.about.university,
    certifications: portfolioData.about.certifications,
    headshot: portfolioData.about.headshot,
    journey: portfolioData.about.journey,
    sections: portfolioData.about.sections || []
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

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: Date.now().toString(),
          title: 'New Section',
          content: 'Add content here...',
          type: 'text'
        }
      ]
    }));
  };

  const updateSection = (id: string, updates: Partial<any>) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === id ? { ...section, ...updates } : section
      )
    }));
  };

  const removeSection = (id: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== id)
    }));
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const sections = [...formData.sections];
    const index = sections.findIndex(section => section.id === id);
    
    if (direction === 'up' && index > 0) {
      const temp = sections[index];
      sections[index] = sections[index - 1];
      sections[index - 1] = temp;
    } else if (direction === 'down' && index < sections.length - 1) {
      const temp = sections[index];
      sections[index] = sections[index + 1];
      sections[index + 1] = temp;
    }
    
    setFormData(prev => ({ ...prev, sections }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit About Section</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="sections">Custom Sections</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="sections" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Custom Content Sections</h3>
            <Button onClick={addSection} variant="outline">
              <Plus size={16} className="mr-2" />
              Add New Section
            </Button>
          </div>

          {formData.sections.length === 0 && (
            <Card>
              <CardContent className="py-6 text-center text-gray-500">
                <p>No custom sections yet. Click "Add New Section" to create one.</p>
              </CardContent>
            </Card>
          )}

          {formData.sections.map((section, index) => (
            <Card key={section.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="w-full">
                    <Input
                      value={section.title}
                      onChange={(e) => updateSection(section.id, { title: e.target.value })}
                      className="font-semibold text-lg border-none focus-visible:ring-0 p-0 h-auto"
                      placeholder="Section Title"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => moveSection(section.id, 'up')} 
                      disabled={index === 0}
                    >
                      <ChevronUp size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => moveSection(section.id, 'down')} 
                      disabled={index === formData.sections.length - 1}
                    >
                      <ChevronDown size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeSection(section.id)}
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`section-${section.id}-content`}>Content</Label>
                    <Textarea
                      id={`section-${section.id}-content`}
                      value={section.content}
                      onChange={(e) => updateSection(section.id, { content: e.target.value })}
                      rows={4}
                      placeholder="Section content goes here..."
                    />
                  </div>
                  <div>
                    <Label htmlFor={`section-${section.id}-type`}>Section Type</Label>
                    <select
                      id={`section-${section.id}-type`}
                      value={section.type}
                      onChange={(e) => updateSection(section.id, { type: e.target.value })}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1 dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="text">Text Block</option>
                      <option value="quote">Quote/Testimonial</option>
                      <option value="highlight">Highlight</option>
                      <option value="list">Bullet List</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {formData.sections.length > 0 && (
            <Button onClick={handleSubmit} className="w-full md:w-auto">
              <Save size={16} className="mr-2" />
              Save All Changes
            </Button>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AboutAdmin;

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, ChevronUp, ChevronDown, RefreshCw, MoveHorizontal, MoveVertical, Square, ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeAdminView from './SafeAdminView';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ImageUploader from '@/components/admin/ImageUploader';
import ImageGallery from '@/components/admin/ImageGallery';

const AboutAdmin: React.FC = () => {
  const { portfolioData, updateAbout } = usePortfolio();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('basic');
  
  const defaultHeadshotSettings = {
    url: portfolioData.about.headshot || '',
    position: { x: 50, y: 50 },
    aspectRatio: 1,
    autoFit: true
  };
  
  const [formData, setFormData] = useState({
    background: portfolioData.about.background,
    yearsOfExperience: portfolioData.about.yearsOfExperience,
    industries: portfolioData.about.industries,
    degree: portfolioData.about.degree,
    field: portfolioData.about.field,
    university: portfolioData.about.university,
    certifications: portfolioData.about.certifications,
    headshot: portfolioData.about.headshot,
    headshotSettings: portfolioData.about.headshotSettings || defaultHeadshotSettings,
    journey: portfolioData.about.journey,
    sections: portfolioData.about.sections || []
  });

  const [showImageDialog, setShowImageDialog] = useState(false);
  const [activeImageTab, setActiveImageTab] = useState('upload');
  
  useEffect(() => {
    if (formData.headshot && !formData.headshotSettings.url) {
      setFormData(prev => ({
        ...prev,
        headshotSettings: {
          ...prev.headshotSettings,
          url: prev.headshot
        }
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'headshot') {
      setFormData(prev => ({
        ...prev,
        headshotSettings: {
          ...prev.headshotSettings,
          url: value
        }
      }));
    }
  };

  const handleHeadshotSettingsChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      headshotSettings: {
        ...prev.headshotSettings,
        [field]: value
      }
    }));
  };

  const handlePositionChange = (axis: 'x' | 'y', value: number[]) => {
    setFormData(prev => ({
      ...prev,
      headshotSettings: {
        ...prev.headshotSettings,
        position: {
          ...prev.headshotSettings.position,
          [axis]: value[0]
        }
      }
    }));
  };

  const handleImageSelect = (dataUrl: string) => {
    setFormData(prev => ({
      ...prev,
      headshot: dataUrl,
      headshotSettings: {
        ...prev.headshotSettings,
        url: dataUrl
      }
    }));
    
    setShowImageDialog(false);
    
    if (dataUrl) {
      toast({
        title: 'Headshot Updated',
        description: 'Your headshot image has been updated successfully.',
      });
    }
  };

  const resetHeadshotSettings = () => {
    setFormData(prev => ({
      ...prev,
      headshotSettings: {
        ...defaultHeadshotSettings,
        url: prev.headshot || prev.headshotSettings.url
      }
    }));
    
    toast({
      title: 'Headshot Settings Reset',
      description: 'The headshot settings have been reset to default.',
    });
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
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="headshot">Headshot Image</TabsTrigger>
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

        <TabsContent value="headshot" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Headshot Image Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Headshot Image</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowImageDialog(true)}
                    >
                      <ImageIcon size={16} className="mr-2" />
                      Change Image
                    </Button>
                  </div>
                  
                  <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Update Headshot Image</DialogTitle>
                        <DialogDescription>
                          Upload a new image or select one from your gallery
                        </DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue={activeImageTab} onValueChange={setActiveImageTab} className="mt-4">
                        <TabsList className="grid grid-cols-2 mb-4">
                          <TabsTrigger value="upload">Upload New</TabsTrigger>
                          <TabsTrigger value="gallery">From Gallery</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="upload" className="py-4">
                          <ImageUploader 
                            onImageSelect={handleImageSelect} 
                            currentImage={formData.headshotSettings.url || formData.headshot}
                            label="Upload Headshot"
                          />
                        </TabsContent>
                        
                        <TabsContent value="gallery" className="py-4">
                          <ImageGallery onSelectImage={handleImageSelect} />
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="border rounded-lg overflow-hidden aspect-square relative">
                    {formData.headshotSettings.url ? (
                      <img 
                        src={formData.headshotSettings.url} 
                        alt="Headshot preview" 
                        className="w-full h-full"
                        style={{
                          objectFit: formData.headshotSettings.autoFit ? 'cover' : 'contain',
                          objectPosition: `${formData.headshotSettings.position.x}% ${formData.headshotSettings.position.y}%`
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                        No image selected
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="horizontal-position" className="flex items-center gap-2">
                        <MoveHorizontal size={16} />
                        Horizontal Position
                      </Label>
                      <span className="text-sm text-gray-500">{formData.headshotSettings.position.x}%</span>
                    </div>
                    <Slider
                      id="horizontal-position"
                      value={[formData.headshotSettings.position.x]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => handlePositionChange('x', value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="vertical-position" className="flex items-center gap-2">
                        <MoveVertical size={16} />
                        Vertical Position
                      </Label>
                      <span className="text-sm text-gray-500">{formData.headshotSettings.position.y}%</span>
                    </div>
                    <Slider
                      id="vertical-position"
                      value={[formData.headshotSettings.position.y]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => handlePositionChange('y', value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="aspect-ratio" className="flex items-center gap-2">
                        <Square size={16} />
                        Aspect Ratio
                      </Label>
                      <span className="text-sm text-gray-500">
                        {formData.headshotSettings.aspectRatio === 1 ? "1:1 (Square)" : 
                         formData.headshotSettings.aspectRatio === 0.75 ? "4:3" : 
                         formData.headshotSettings.aspectRatio === 0.5625 ? "16:9" : 
                         `${formData.headshotSettings.aspectRatio.toFixed(2)}:1`}
                      </span>
                    </div>
                    <Slider
                      id="aspect-ratio"
                      value={[formData.headshotSettings.aspectRatio * 100]}
                      min={56.25}
                      max={200}
                      step={1}
                      onValueChange={(value) => handleHeadshotSettingsChange('aspectRatio', value[0] / 100)}
                    />
                    <div className="flex gap-2 mt-1">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleHeadshotSettingsChange('aspectRatio', 1)}
                        className="text-xs py-1 h-7"
                      >
                        1:1
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleHeadshotSettingsChange('aspectRatio', 0.75)}
                        className="text-xs py-1 h-7"
                      >
                        4:3
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleHeadshotSettingsChange('aspectRatio', 0.5625)}
                        className="text-xs py-1 h-7"
                      >
                        16:9
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="autofit"
                      checked={formData.headshotSettings.autoFit}
                      onChange={(e) => handleHeadshotSettingsChange('autoFit', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="autofit" className="cursor-pointer">Auto-fit image to container</Label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">Preview:</p>
                  <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div style={{ aspectRatio: formData.headshotSettings.aspectRatio }}>
                      {formData.headshotSettings.url ? (
                        <img
                          src={formData.headshotSettings.url}
                          alt="Professional Headshot Preview"
                          className="w-full h-full"
                          style={{
                            objectFit: formData.headshotSettings.autoFit ? 'cover' : 'contain',
                            objectPosition: `${formData.headshotSettings.position.x}% ${formData.headshotSettings.position.y}%`
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400">
                          No image available
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetHeadshotSettings}
                    className="w-full"
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Reset to Default Settings
                  </Button>
                </div>
              </div>
              
              <Button onClick={handleSubmit} className="mt-4">
                <Save size={16} className="mr-2" />
                Save Headshot Settings
              </Button>
            </CardContent>
          </Card>
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

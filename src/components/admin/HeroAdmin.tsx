
import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload, Image } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const HeroAdmin: React.FC = () => {
  const { portfolioData, updateHero } = usePortfolio();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageDialog, setShowImageDialog] = useState(false);

  // Initialize with empty values or from portfolio data when available
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: ''
  });

  // Update form data when portfolio data is available
  useEffect(() => {
    if (portfolioData?.hero) {
      setFormData({
        title: portfolioData.hero.title || '',
        subtitle: portfolioData.hero.subtitle || '',
        description: portfolioData.hero.description || ''
      });
      setIsLoading(false);
    }
  }, [portfolioData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(formData);
    toast({
      title: 'Hero Section Updated',
      description: 'Your hero section has been updated successfully.',
    });
  };

  const handleImageSubmit = () => {
    if (imageUrl.trim()) {
      updateHero({ 
        // Add image property to hero data
        heroImage: imageUrl 
      });
      toast({
        title: 'Hero Image Updated',
        description: 'Your hero image has been updated successfully.',
      });
      setShowImageDialog(false);
    } else {
      toast({
        title: 'Error',
        description: 'Please enter a valid image URL.',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Hero Section</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hero Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Data Analyst Portfolio"
              />
            </div>
            <div>
              <Label htmlFor="title">Main Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Turning Data into Actionable Insights"
              />
              <p className="text-sm text-gray-500 mt-1">
                The first and third words will be highlighted with special colors.
              </p>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Describe what you do..."
              />
            </div>

            {/* Image upload section */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <Label>Hero Background Image</Label>
                <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Image className="h-4 w-4 mr-2" />
                      Change Image
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Hero Image</DialogTitle>
                      <DialogDescription>
                        Enter the URL of the image you want to use for your hero section.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                          id="imageUrl"
                          placeholder="https://example.com/image.jpg"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                        />
                      </div>
                      {imageUrl && (
                        <div className="border rounded-md overflow-hidden h-48 flex items-center justify-center">
                          <img 
                            src={imageUrl} 
                            alt="Preview" 
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL';
                            }} 
                          />
                        </div>
                      )}
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowImageDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleImageSubmit}>
                          Update Image
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="border rounded-md p-4 bg-gray-50 text-center">
                {portfolioData?.hero?.heroImage ? (
                  <div className="relative h-32 overflow-hidden rounded-md">
                    <img 
                      src={portfolioData.hero.heroImage} 
                      alt="Hero background"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Image+Load+Error';
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-gray-500 flex flex-col items-center justify-center h-32">
                    <Upload className="h-8 w-8 mb-2 opacity-30" />
                    <p>No background image set</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full md:w-auto">
          <Save size={16} className="mr-2" />
          Save Hero Section
        </Button>
      </form>
    </div>
  );
};

export default HeroAdmin;

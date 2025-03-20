import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload, Image, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

const HeroAdmin: React.FC = () => {
  const { portfolioData, updateHero } = usePortfolio();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: 'Turning Data into Actionable Insights',
    subtitle: 'Data Analyst Portfolio',
    description: 'I transform complex data into clear, compelling stories that drive strategic decisions. Explore my portfolio to see how I leverage data analysis to solve real-world problems.'
  });

  useEffect(() => {
    try {
      console.log("Portfolio data in HeroAdmin:", portfolioData);

      setError(null);
      
      if (portfolioData?.hero) {
        setFormData({
          title: portfolioData.hero.title || formData.title,
          subtitle: portfolioData.hero.subtitle || formData.subtitle,
          description: portfolioData.hero.description || formData.description
        });
        
        if (portfolioData.hero.heroImage) {
          setImageUrl(portfolioData.hero.heroImage);
        }
      } else {
        console.warn("Hero data is missing in portfolio data");
      }
    } catch (err) {
      console.error("Error loading hero data:", err);
      setError("Failed to load hero data. Please try refreshing the page.");
    } finally {
      setIsLoading(false);
    }
  }, [portfolioData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const updatedHero = {
        ...formData,
        heroImage: portfolioData?.hero?.heroImage || ''
      };
      
      console.log("Updating hero with:", updatedHero);
      updateHero(updatedHero);
      
      toast({
        title: 'Hero Section Updated',
        description: 'Your hero section has been updated successfully.',
      });
    } catch (err) {
      console.error("Error updating hero:", err);
      toast({
        title: 'Update Failed',
        description: 'There was a problem updating your hero section. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleImageSubmit = () => {
    if (imageUrl.trim()) {
      try {
        updateHero({ 
          ...formData,
          heroImage: imageUrl 
        });
        
        toast({
          title: 'Hero Image Updated',
          description: 'Your hero image has been updated successfully.',
        });
        setShowImageDialog(false);
      } catch (err) {
        console.error("Error updating hero image:", err);
        toast({
          title: 'Update Failed',
          description: 'There was a problem updating your hero image. Please try again.',
          variant: 'destructive'
        });
      }
    } else {
      toast({
        title: 'Error',
        description: 'Please enter a valid image URL.',
        variant: 'destructive'
      });
    }
  };

  const handleImageReset = () => {
    try {
      updateHero({ 
        ...formData,
        heroImage: '' 
      });
      
      setImageUrl('');
      toast({
        title: 'Hero Image Removed',
        description: 'Your hero image has been removed successfully.',
      });
    } catch (err) {
      console.error("Error removing hero image:", err);
      toast({
        title: 'Update Failed',
        description: 'There was a problem removing your hero image. Please try again.',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
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

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <Label>Hero Background Image</Label>
                <div className="flex space-x-2">
                  {portfolioData?.hero?.heroImage && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleImageReset}
                      type="button"
                    >
                      Remove Image
                    </Button>
                  )}
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
                          <Button onClick={handleImageSubmit} type="button">
                            Update Image
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
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


import React, { useState } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const HeroAdmin: React.FC = () => {
  const { portfolioData, updateHero } = usePortfolio();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: portfolioData.hero.title,
    subtitle: portfolioData.hero.subtitle,
    description: portfolioData.hero.description
  });

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

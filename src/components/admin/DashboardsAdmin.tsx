
import React, { useState } from 'react';
import { usePortfolio, Dashboard } from '@/contexts/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Trash2, Edit, Plus, Save, Image as ImageIcon, RefreshCw, Star, StarOff } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import ImageUploader from '@/components/ui/image-uploader';
import { getImageKey, getImageUrl } from '@/utils/imageUtils';

// Update the Dashboard type to include an imageUrl field
interface DashboardFormData {
  title: string;
  description: string;
  type: string;
  link: string;
  imageUrl?: string;
  featured?: boolean;
}

const DashboardsAdmin: React.FC = () => {
  const { portfolioData, hideDashboard, showDashboard, deleteDashboard, updateDashboard, addDashboard: contextAddDashboard } = usePortfolio();
  const { toast } = useToast();
  const [editingDashboard, setEditingDashboard] = useState<Dashboard | null>(null);
  const [dashboardImage, setDashboardImage] = useState<string>('');
  const [newDashboard, setNewDashboard] = useState<DashboardFormData>({
    title: '',
    description: '',
    type: '',
    link: '',
    imageUrl: '',
    featured: false
  });
  const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key to force re-render

  // Function to refresh the component
  const refreshDashboards = () => {
    setRefreshKey(prevKey => prevKey + 1);
    toast({
      title: "Refreshed",
      description: "Dashboard list has been refreshed.",
    });
  };

  const handleVisibilityToggle = (dashboard: Dashboard) => {
    if (dashboard.isHidden) {
      showDashboard(dashboard.id);
      toast({
        title: "Dashboard Visible",
        description: `"${dashboard.title}" is now visible on your portfolio.`,
      });
    } else {
      hideDashboard(dashboard.id);
      toast({
        title: "Dashboard Hidden",
        description: `"${dashboard.title}" is now hidden from your portfolio.`,
      });
    }
  };

  const handleToggleFeatured = (dashboard: Dashboard) => {
    const newFeaturedState = !dashboard.featured;

    // If setting as featured, unset any other featured dashboards first
    if (newFeaturedState) {
      portfolioData.dashboards.forEach(d => {
        if (d.id !== dashboard.id && d.featured) {
          updateDashboard(d.id, { featured: false });
        }
      });
    }

    updateDashboard(dashboard.id, { featured: newFeaturedState });
    
    toast({
      title: newFeaturedState ? "Set as Featured" : "Removed Featured Status",
      description: `"${dashboard.title}" has been ${newFeaturedState ? "set as" : "removed from"} the featured dashboard.`,
    });
  };

  const handleDelete = (dashboardId: number, dashboardTitle: string) => {
    // Also remove the dashboard image from localStorage
    const imageKey = getImageKey('dashboard', dashboardId);
    localStorage.removeItem(imageKey);
    
    deleteDashboard(dashboardId);
    toast({
      title: "Dashboard Deleted",
      description: `"${dashboardTitle}" has been deleted from your portfolio.`,
      variant: "destructive",
    });
  };

  const handleAddDashboard = () => {
    // Check if all required fields are filled
    if (!newDashboard.title || !newDashboard.description || !newDashboard.type || !newDashboard.link) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Determine if this should be the featured dashboard (if it's the first one or if none are featured)
    const shouldBeDefaultFeatured = portfolioData.dashboards.length === 0 || 
      !portfolioData.dashboards.some(d => d.featured && !d.isHidden);
    
    // Create the new dashboard
    const newDashboardItem = {
      title: newDashboard.title,
      description: newDashboard.description,
      type: newDashboard.type,
      link: newDashboard.link,
      featured: newDashboard.featured || shouldBeDefaultFeatured
    };
    
    // Add the dashboard using the context method
    contextAddDashboard(newDashboardItem);
    
    // Get the new dashboard ID to save the image
    const newId = portfolioData.dashboards.length > 0 
      ? Math.max(...portfolioData.dashboards.map(d => d.id)) + 1 
      : 1;
    
    // Save the dashboard image to localStorage if it exists
    if (dashboardImage) {
      const imageKey = getImageKey('dashboard', newId);
      localStorage.setItem(imageKey, dashboardImage);
    }
    
    toast({
      title: "Dashboard Added",
      description: `"${newDashboard.title}" has been added to your portfolio.`,
    });
    
    // Reset form
    setNewDashboard({
      title: '',
      description: '',
      type: '',
      link: '',
      imageUrl: '',
      featured: false
    });
    setDashboardImage('');
    
    // Force a refresh to show the new dashboard
    refreshDashboards();
  };

  const handleSaveEdit = () => {
    if (editingDashboard) {
      // Update the dashboard
      updateDashboard(editingDashboard.id, editingDashboard);
      
      toast({
        title: "Dashboard Updated",
        description: `"${editingDashboard.title}" has been updated.`,
      });
      
      // Force a refresh to show the updated dashboard
      refreshDashboards();
      setEditingDashboard(null);
    }
  };

  const handleImageSelect = (dataUrl: string, dashboardId?: number) => {
    if (dashboardId) {
      // Save to localStorage for existing dashboard
      const imageKey = getImageKey('dashboard', dashboardId);
      localStorage.setItem(imageKey, dataUrl);
      toast({
        title: "Image Saved",
        description: "Dashboard image has been saved.",
      });
    } else {
      // For new dashboard
      setDashboardImage(dataUrl);
      setNewDashboard({...newDashboard, imageUrl: dataUrl});
    }
  };

  return (
    <div className="space-y-6" key={refreshKey}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Manage Dashboards</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshDashboards}
            title="Refresh Dashboards"
          >
            <RefreshCw size={16} />
          </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-2" /> Add Dashboard
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Dashboard</DialogTitle>
              <DialogDescription>
                Add details about your interactive dashboard.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newDashboard.title}
                  onChange={(e) => setNewDashboard({...newDashboard, title: e.target.value})}
                  placeholder="Dashboard Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newDashboard.description}
                  onChange={(e) => setNewDashboard({...newDashboard, description: e.target.value})}
                  placeholder="Describe what this dashboard shows"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  value={newDashboard.type}
                  onChange={(e) => setNewDashboard({...newDashboard, type: e.target.value})}
                  placeholder="Tableau, Power BI, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Dashboard Link</Label>
                <Input
                  id="link"
                  value={newDashboard.link}
                  onChange={(e) => setNewDashboard({...newDashboard, link: e.target.value})}
                  placeholder="https://"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={newDashboard.featured}
                  onCheckedChange={(checked) => setNewDashboard({...newDashboard, featured: checked})}
                />
                <Label htmlFor="featured">Set as featured dashboard</Label>
              </div>
              <div className="space-y-2">
                <Label>Dashboard Image</Label>
                <ImageUploader
                  onImageSelect={(dataUrl) => handleImageSelect(dataUrl)}
                  currentImage={dashboardImage}
                  aspectRatio="video"
                  label="Dashboard Screenshot or Preview"
                />
              </div>
            </div>
            <DialogFooter className="sticky bottom-0 pt-4 bg-white dark:bg-gray-800 mt-auto">
              <Button onClick={handleAddDashboard}>Add Dashboard</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {portfolioData.dashboards.map((dashboard) => {
          // Get image from localStorage or fall back to the one in dashboard data
          const imageUrl = getImageUrl(getImageKey('dashboard', dashboard.id), '');
          
          return (
            <Card 
              key={dashboard.id} 
              className={dashboard.isHidden ? "opacity-70" : ""}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{dashboard.title}</CardTitle>
                    {dashboard.featured && (
                      <span className="inline-block mt-1 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVisibilityToggle(dashboard)}
                      title={dashboard.isHidden ? "Show Dashboard" : "Hide Dashboard"}
                    >
                      {dashboard.isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleFeatured(dashboard)}
                      title={dashboard.featured ? "Remove from featured" : "Set as featured"}
                    >
                      {dashboard.featured ? <StarOff size={16} /> : <Star size={16} />}
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingDashboard(dashboard)}
                          title="Edit Dashboard"
                        >
                          <Edit size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Dashboard</DialogTitle>
                        </DialogHeader>
                        {editingDashboard && editingDashboard.id === dashboard.id && (
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-title">Title</Label>
                              <Input
                                id="edit-title"
                                value={editingDashboard.title}
                                onChange={(e) => setEditingDashboard({...editingDashboard, title: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea
                                id="edit-description"
                                value={editingDashboard.description}
                                onChange={(e) => setEditingDashboard({...editingDashboard, description: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-type">Type</Label>
                              <Input
                                id="edit-type"
                                value={editingDashboard.type}
                                onChange={(e) => setEditingDashboard({...editingDashboard, type: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-link">Dashboard Link</Label>
                              <Input
                                id="edit-link"
                                value={editingDashboard.link}
                                onChange={(e) => setEditingDashboard({...editingDashboard, link: e.target.value})}
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="edit-featured"
                                checked={!!editingDashboard.featured}
                                onCheckedChange={(checked) => setEditingDashboard({...editingDashboard, featured: checked})}
                              />
                              <Label htmlFor="edit-featured">Set as featured dashboard</Label>
                            </div>
                            <div className="space-y-2">
                              <Label>Dashboard Image</Label>
                              <ImageUploader
                                onImageSelect={(dataUrl) => handleImageSelect(dataUrl, dashboard.id)}
                                currentImage={imageUrl}
                                aspectRatio="video"
                                section="dashboard"
                                itemId={dashboard.id}
                                label="Dashboard Screenshot or Preview"
                              />
                            </div>
                          </div>
                        )}
                        <DialogFooter className="sticky bottom-0 pt-4 bg-white dark:bg-gray-800 mt-auto">
                          <Button onClick={handleSaveEdit}>
                            <Save size={16} className="mr-2" />
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          title="Delete Dashboard"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Dashboard</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{dashboard.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground"
                            onClick={() => handleDelete(dashboard.id, dashboard.title)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {imageUrl && (
                  <div className="mb-4 aspect-video rounded-md overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt={dashboard.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 text-xs bg-portfolio-purple/10 text-portfolio-purple rounded-full">
                    {dashboard.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {dashboard.description}
                </p>
                {dashboard.link && (
                  <div className="mt-4">
                    <a
                      href={dashboard.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline"
                    >
                      View Dashboard →
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardsAdmin;

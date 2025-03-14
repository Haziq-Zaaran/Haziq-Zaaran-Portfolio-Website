
import React, { useState } from 'react';
import { usePortfolio, Dashboard } from '@/contexts/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Trash2, Edit, Plus, Save } from 'lucide-react';
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

const DashboardsAdmin: React.FC = () => {
  const { portfolioData, hideDashboard, showDashboard, deleteDashboard, updateDashboard } = usePortfolio();
  const { toast } = useToast();
  const [editingDashboard, setEditingDashboard] = useState<Dashboard | null>(null);
  const [newDashboard, setNewDashboard] = useState({
    title: '',
    description: '',
    type: '',
    link: ''
  });

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

  const handleDelete = (dashboardId: number, dashboardTitle: string) => {
    deleteDashboard(dashboardId);
    toast({
      title: "Dashboard Deleted",
      description: `"${dashboardTitle}" has been deleted from your portfolio.`,
      variant: "destructive",
    });
  };

  const handleAddDashboard = () => {
    // Simulate adding to the dashboards array
    console.log('Adding dashboard:', newDashboard);
    // Reset form
    setNewDashboard({
      title: '',
      description: '',
      type: '',
      link: ''
    });
    toast({
      title: "Dashboard Added",
      description: `"${newDashboard.title}" has been added to your portfolio.`,
    });
  };

  const handleSaveEdit = () => {
    if (editingDashboard) {
      updateDashboard(editingDashboard.id, editingDashboard);
      toast({
        title: "Dashboard Updated",
        description: `"${editingDashboard.title}" has been updated.`,
      });
      setEditingDashboard(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Dashboards</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-2" /> Add Dashboard
            </Button>
          </DialogTrigger>
          <DialogContent>
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newDashboard.description}
                  onChange={(e) => setNewDashboard({...newDashboard, description: e.target.value})}
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
            </div>
            <DialogFooter>
              <Button onClick={handleAddDashboard}>Add Dashboard</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {portfolioData.dashboards.map((dashboard) => (
          <Card 
            key={dashboard.id} 
            className={dashboard.isHidden ? "opacity-70" : ""}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{dashboard.title}</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVisibilityToggle(dashboard)}
                    title={dashboard.isHidden ? "Show Dashboard" : "Hide Dashboard"}
                  >
                    {dashboard.isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
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
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Dashboard</DialogTitle>
                      </DialogHeader>
                      {editingDashboard && (
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
                        </div>
                      )}
                      <DialogFooter>
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
        ))}
      </div>
    </div>
  );
};

export default DashboardsAdmin;

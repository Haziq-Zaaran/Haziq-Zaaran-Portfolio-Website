
import React, { useState } from 'react';
import { usePortfolio, Project } from '@/contexts/PortfolioContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Eye, EyeOff, Trash2, Edit, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
import ProjectForm from '@/components/ProjectForm';

const ProjectsAdmin: React.FC = () => {
  const { portfolioData, hideProject, showProject, deleteProject, updateProject } = usePortfolio();
  const { toast } = useToast();
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleVisibilityToggle = (project: Project) => {
    if (project.isHidden) {
      showProject(project.id);
      toast({
        title: "Project Visible",
        description: `"${project.title}" is now visible on your portfolio.`,
      });
    } else {
      hideProject(project.id);
      toast({
        title: "Project Hidden",
        description: `"${project.title}" is now hidden from your portfolio.`,
      });
    }
  };

  const handleDelete = (projectId: number, projectTitle: string) => {
    deleteProject(projectId);
    toast({
      title: "Project Deleted",
      description: `"${projectTitle}" has been deleted from your portfolio.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus size={16} className="mr-2" /> Add Project
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto w-full sm:max-w-xl">
            <SheetHeader className="mb-6">
              <SheetTitle>Add Project</SheetTitle>
            </SheetHeader>
            <ProjectForm 
              onSubmit={(projectData) => {
                toast({
                  title: "Project Added",
                  description: `"${projectData.title}" has been added to your portfolio.`,
                });
              }}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {portfolioData.projects.map((project) => (
          <Card key={project.id} className={project.isHidden ? "opacity-70" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVisibilityToggle(project)}
                    title={project.isHidden ? "Show Project" : "Hide Project"}
                  >
                    {project.isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                  </Button>
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingProject(project)}
                        title="Edit Project"
                      >
                        <Edit size={16} />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto w-full sm:max-w-xl">
                      <SheetHeader className="mb-6">
                        <SheetTitle>Edit Project</SheetTitle>
                      </SheetHeader>
                      {editingProject && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                              id="edit-title"
                              value={editingProject.title}
                              onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={editingProject.description}
                              onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                            <Input
                              id="edit-tags"
                              value={editingProject.tags.join(', ')}
                              onChange={(e) => setEditingProject({
                                ...editingProject, 
                                tags: e.target.value.split(',').map(tag => tag.trim())
                              })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-image">Image URL</Label>
                            <Input
                              id="edit-image"
                              value={editingProject.image}
                              onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-demo">Demo Link</Label>
                            <Input
                              id="edit-demo"
                              value={editingProject.demoLink}
                              onChange={(e) => setEditingProject({...editingProject, demoLink: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-code">Code Link</Label>
                            <Input
                              id="edit-code"
                              value={editingProject.codeLink}
                              onChange={(e) => setEditingProject({...editingProject, codeLink: e.target.value})}
                            />
                          </div>
                          <Button
                            onClick={() => {
                              if (editingProject) {
                                updateProject(editingProject.id, editingProject);
                                toast({
                                  title: "Project Updated",
                                  description: `"${editingProject.title}" has been updated.`,
                                });
                                setEditingProject(null);
                              }
                            }}
                          >
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </SheetContent>
                  </Sheet>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        title="Delete Project"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{project.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground"
                          onClick={() => handleDelete(project.id, project.title)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <CardDescription className="flex flex-wrap gap-1 mt-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="aspect-video relative overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No image available
                  </div>
                )}
                {project.isHidden && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold px-3 py-1 rounded-full bg-gray-800 bg-opacity-75">
                      Hidden
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {project.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="text-xs text-gray-500">
                ID: {project.id}
              </div>
              <div className="flex gap-2">
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline"
                >
                  Demo
                </a>
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline"
                >
                  Code
                </a>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsAdmin;

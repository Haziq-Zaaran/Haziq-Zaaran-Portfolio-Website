
import React, { useState } from 'react';
import { usePortfolio, Project } from '@/contexts/PortfolioContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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
import { getImageKey, getImageUrl } from '@/utils/imageUtils';

const ProjectsAdmin: React.FC = () => {
  const { portfolioData, hideProject, showProject, deleteProject, updateProject, addProject } = usePortfolio();
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
    // Also remove the project image from localStorage
    const imageKey = getImageKey('project', projectId);
    localStorage.removeItem(imageKey);
    
    deleteProject(projectId);
    toast({
      title: "Project Deleted",
      description: `"${projectTitle}" has been deleted from your portfolio.`,
      variant: "destructive",
    });
  };

  const handleUpdateProject = (projectId: number, projectData: any) => {
    // Fix type compatibility issue with tags
    const processedData: Partial<Project> = {
      ...projectData,
      tags: Array.isArray(projectData.tags) ? projectData.tags : 
            typeof projectData.tags === 'string' ? projectData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []
    };
    
    updateProject(projectId, processedData);
    setEditingProject(null);
    toast({
      title: "Project Updated",
      description: `"${projectData.title}" has been updated.`,
    });
  };

  const handleAddNewProject = (projectData: Omit<Project, 'id' | 'isHidden'>) => {
    addProject(projectData);
    toast({
      title: "Project Added",
      description: `"${projectData.title}" has been added to your portfolio.`,
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
            <ProjectForm onSubmit={handleAddNewProject} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {portfolioData.projects.map((project) => {
          // Get image from localStorage or fall back to the one in project data
          const imageUrl = getImageUrl(getImageKey('project', project.id), project.image);
          
          return (
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
                        {editingProject && editingProject.id === project.id && (
                          <ProjectForm 
                            initialData={editingProject}
                            projectId={editingProject.id}
                            onSubmit={(data) => handleUpdateProject(editingProject.id, data)}
                          />
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
                  {imageUrl ? (
                    <img
                      src={imageUrl}
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
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsAdmin;


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Check, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import ImageUploader from './ui/image-uploader';
import { getImageKey, getImageUrl } from '@/utils/imageUtils';

// Define the schema with proper type handling for tags
const projectSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  tags: z.union([
    z.string(),
    z.array(z.string())
  ]),
  image: z.string().optional(),
  demoLink: z.string().url({ message: 'Please enter a valid demo URL' }),
  codeLink: z.string().url({ message: 'Please enter a valid code repository URL' }),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  onSubmit: (data: ProjectFormValues) => void;
  initialData?: Partial<ProjectFormValues>;
  projectId?: number;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, initialData, projectId }) => {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState<string>(
    initialData?.image || (projectId ? getImageUrl(getImageKey('project', projectId), '') : '')
  );
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      tags: initialData?.tags || [] as string[],
      image: initialData?.image || imageUrl,
      demoLink: initialData?.demoLink || '',
      codeLink: initialData?.codeLink || '',
    },
  });

  const handleSubmit = (data: ProjectFormValues) => {
    // Process tags to always ensure they're an array
    const processedTags: string[] = 
      typeof data.tags === 'string' 
        ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) 
        : Array.isArray(data.tags) ? data.tags : [];
    
    // Create the formatted data with the properly processed tags and the current image URL
    const formattedData = {
      ...data,
      tags: processedTags,
      image: imageUrl // Use the state value
    };
    
    onSubmit(formattedData);
    toast({
      title: projectId ? "Project Updated" : "Project Added",
      description: `${data.title} has been ${projectId ? "updated" : "added"} to your portfolio`,
    });
    
    if (!projectId) {
      // Only reset the form for new projects, not when editing
      form.reset();
      setImageUrl('');
    }
  };

  const handleImageSelect = (dataUrl: string) => {
    setImageUrl(dataUrl);
    form.setValue('image', dataUrl);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Plus size={18} /> {projectId ? 'Edit' : 'Add New'} Project
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My Amazing Project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A short description of your project and its impact..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies/Tags</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="React, TypeScript, Tailwind CSS" 
                      value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <Alert variant="default" className="mt-2 bg-muted/50">
                    <AlertDescription className="text-xs">
                      Enter comma-separated tags (e.g., "React, TypeScript, Tailwind")
                    </AlertDescription>
                  </Alert>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Project Image</FormLabel>
              <ImageUploader 
                onImageSelect={handleImageSelect}
                currentImage={imageUrl}
                aspectRatio="video"
                section="project"
                itemId={projectId || `new-${Date.now()}`}
              />
            </FormItem>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="demoLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demo Link</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://myproject.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code Repository Link</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://github.com/username/repo" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pb-0 pt-4">
              <Button type="submit" className="w-full">
                {projectId ? 'Save Changes' : 'Add Project'} {projectId ? <Check size={16} className="ml-2" /> : <Plus size={16} className="ml-2" />}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;


import React from 'react';
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

const projectSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  tags: z.string().transform(val => val.split(',').map(tag => tag.trim())).or(z.array(z.string())),
  image: z.string().url({ message: 'Please enter a valid image URL' }),
  demoLink: z.string().url({ message: 'Please enter a valid demo URL' }),
  codeLink: z.string().url({ message: 'Please enter a valid code repository URL' }),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  onSubmit: (data: ProjectFormValues) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: '',
      image: '',
      demoLink: '',
      codeLink: '',
    },
  });

  const handleSubmit = (data: ProjectFormValues) => {
    // Ensure tags is an array when submitting
    const formattedData = {
      ...data,
      tags: typeof data.tags === 'string' ? data.tags.split(',').map(tag => tag.trim()) : data.tags
    };
    
    onSubmit(formattedData);
    toast({
      title: "Project Added",
      description: `${data.title} has been added to your portfolio`,
    });
    form.reset();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Plus size={18} /> Add New Project
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
                      {...field} 
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

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Image URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/project-image.jpg" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                Add Project <Plus size={16} className="ml-2" />
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;

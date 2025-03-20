
import React, { useState } from 'react';
import { useSkills, iconMap } from '@/contexts/SkillsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  MoveUp,
  MoveDown,
  Layers,
  Database
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface SkillFormData {
  name: string;
  level: number;
  icon: string;
  category: string;
}

const SkillsAdmin: React.FC = () => {
  const { skills, categories, addSkill, updateSkill, deleteSkill, reorderSkill, getIconComponent } = useSkills();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    level: 75,
    icon: 'Database',
    category: categories[0] || ''
  });

  // Reset form data
  const resetFormData = () => {
    setFormData({
      name: '',
      level: 75,
      icon: 'Database',
      category: categories[0] || ''
    });
    setNewCategory('');
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, level: value[0] }));
  };

  // Handle adding a new skill
  const handleAddSkill = () => {
    try {
      // Use new category if provided
      const category = newCategory.trim() ? newCategory.trim() : formData.category;
      
      // Validate form
      if (!formData.name.trim()) {
        toast({
          title: "Error",
          description: "Skill name is required",
          variant: "destructive",
        });
        return;
      }
      
      if (!category) {
        toast({
          title: "Error",
          description: "Category is required",
          variant: "destructive",
        });
        return;
      }
      
      // Add new skill
      addSkill({
        name: formData.name.trim(),
        level: formData.level,
        icon: formData.icon,
        category: category
      });
      
      // Success message
      toast({
        title: "Success",
        description: `Skill "${formData.name}" has been added`,
      });
      
      // Reset and close dialog
      resetFormData();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Error",
        description: "Could not add skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle editing a skill
  const handleEditSkill = () => {
    try {
      if (!editingSkillId) return;
      
      // Use new category if provided
      const category = newCategory.trim() ? newCategory.trim() : formData.category;
      
      // Validate form
      if (!formData.name.trim()) {
        toast({
          title: "Error",
          description: "Skill name is required",
          variant: "destructive",
        });
        return;
      }
      
      if (!category) {
        toast({
          title: "Error",
          description: "Category is required",
          variant: "destructive",
        });
        return;
      }
      
      // Update skill
      updateSkill(editingSkillId, {
        name: formData.name.trim(),
        level: formData.level,
        icon: formData.icon,
        category: category
      });
      
      // Success message
      toast({
        title: "Success",
        description: `Skill "${formData.name}" has been updated`,
      });
      
      // Reset and close dialog
      resetFormData();
      setIsEditDialogOpen(false);
      setEditingSkillId(null);
    } catch (error) {
      console.error('Error updating skill:', error);
      toast({
        title: "Error",
        description: "Could not update skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle deleting a skill
  const handleDeleteSkill = (id: string, name: string) => {
    try {
      deleteSkill(id);
      
      toast({
        title: "Success",
        description: `Skill "${name}" has been deleted`,
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: "Error",
        description: "Could not delete skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle skill reordering
  const handleReorderSkill = (id: string, direction: 'up' | 'down') => {
    try {
      reorderSkill(id, direction);
      
      toast({
        title: "Success",
        description: `Skill has been ${direction === 'up' ? 'moved up' : 'moved down'}`,
      });
    } catch (error) {
      console.error('Error reordering skill:', error);
      toast({
        title: "Error",
        description: "Could not reorder skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Open the edit dialog and populate form data
  const openEditDialog = (skill: any) => {
    setFormData({
      name: skill.name,
      level: skill.level,
      icon: skill.icon,
      category: skill.category
    });
    setEditingSkillId(skill.id);
    setIsEditDialogOpen(true);
  };

  // Group skills by category for display
  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category] = skills.filter(skill => skill.category === category);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Skills & Expertise</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Add New Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription>
                Add a new skill or expertise to your portfolio
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Python, SQL, Data Visualization"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="level">Proficiency Level ({formData.level}%)</Label>
                <Slider
                  defaultValue={[formData.level]}
                  max={100}
                  step={5}
                  onValueChange={handleSliderChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) => handleSelectChange('icon', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(iconMap).map((iconName) => (
                      <SelectItem key={iconName} value={iconName}>
                        <div className="flex items-center gap-2">
                          {React.createElement(iconMap[iconName], { size: 16 })}
                          <span>{iconName}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <div className="flex gap-2">
                  {categories.length > 0 ? (
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange('category', value)}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="Enter a category"
                      className="flex-1"
                    />
                  )}
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="newCategory">Or Add a New Category</Label>
                <Input
                  id="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g., Cloud Services, Leadership"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSkill}>
                Add Skill
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
            <DialogDescription>
              Update the details of this skill
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Skill Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-level">Proficiency Level ({formData.level}%)</Label>
              <Slider
                defaultValue={[formData.level]}
                value={[formData.level]}
                max={100}
                step={5}
                onValueChange={handleSliderChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-icon">Icon</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) => handleSelectChange('icon', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(iconMap).map((iconName) => (
                    <SelectItem key={iconName} value={iconName}>
                      <div className="flex items-center gap-2">
                        {React.createElement(iconMap[iconName], { size: 16 })}
                        <span>{iconName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-newCategory">Or Move to a New Category</Label>
              <Input
                id="edit-newCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g., Cloud Services, Leadership"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setEditingSkillId(null);
              resetFormData();
            }}>
              Cancel
            </Button>
            <Button onClick={handleEditSkill}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Skills List by Category */}
      <div className="space-y-6">
        {categories.map((category) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsByCategory[category]?.map((skill, index) => {
                  const IconComponent = getIconComponent(skill.icon);
                  const isFirst = index === 0;
                  const isLast = index === skillsByCategory[category].length - 1;
                  
                  return (
                    <div key={skill.id} className="flex items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-portfolio-purple/10 flex items-center justify-center text-portfolio-purple">
                          <IconComponent size={16} />
                        </div>
                        <div>
                          <div className="font-medium">{skill.name}</div>
                          <div className="text-sm text-gray-500">{skill.level}%</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isFirst}
                          onClick={() => handleReorderSkill(skill.id, 'up')}
                          className="h-8 w-8"
                        >
                          <MoveUp size={16} />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isLast}
                          onClick={() => handleReorderSkill(skill.id, 'down')}
                          className="h-8 w-8"
                        >
                          <MoveDown size={16} />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(skill)}
                          className="h-8 w-8"
                        >
                          <Pencil size={16} />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSkill(skill.id, skill.name)}
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                
                {(!skillsByCategory[category] || skillsByCategory[category].length === 0) && (
                  <div className="text-center py-6 text-gray-500">
                    No skills in this category yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillsAdmin;

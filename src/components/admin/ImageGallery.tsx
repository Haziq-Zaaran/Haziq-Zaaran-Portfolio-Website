
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Images, Image as ImageIcon, Copy, Trash2, Plus } from 'lucide-react';
import { getSavedImages, deleteImageFromStorage, generateImageId, saveImageToLocalStorage } from '@/utils/imageUtils';
import ImageUploader from './ImageUploader';

interface ImageGalleryProps {
  onSelectImage?: (url: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ onSelectImage }) => {
  const [images, setImages] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load saved images on component mount
  useEffect(() => {
    const savedImages = getSavedImages();
    setImages(savedImages);
  }, []);

  const handleImageUpload = (dataUrl: string) => {
    if (!dataUrl) return;
    
    try {
      const imageId = generateImageId();
      saveImageToLocalStorage(imageId, dataUrl);
      
      // Update state with new image
      setImages(prev => ({ ...prev, [imageId]: dataUrl }));
      
      toast({
        title: 'Image Saved',
        description: 'Your image has been saved to the gallery',
      });
      
      setIsUploadDialogOpen(false);
    } catch (error) {
      console.error('Error saving image:', error);
      toast({
        title: 'Error',
        description: 'Failed to save image. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteImage = (key: string) => {
    try {
      deleteImageFromStorage(key);
      
      // Update state
      setImages(prev => {
        const newImages = { ...prev };
        delete newImages[key];
        return newImages;
      });
      
      // If the deleted image was selected, clear selection
      if (selectedImage === key) {
        setSelectedImage(null);
      }
      
      toast({
        title: 'Image Deleted',
        description: 'The image has been removed from the gallery',
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete image. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCopyImageToClipboard = (imageUrl: string) => {
    navigator.clipboard.writeText(imageUrl).then(() => {
      toast({
        title: 'Copied',
        description: 'Image URL copied to clipboard',
      });
    }).catch(err => {
      console.error('Failed to copy:', err);
      toast({
        title: 'Error',
        description: 'Failed to copy URL. Please try again.',
        variant: 'destructive',
      });
    });
  };

  const handleSelectImage = (key: string) => {
    if (onSelectImage) {
      onSelectImage(images[key]);
      toast({
        title: 'Image Selected',
        description: 'The image has been selected',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Image Gallery</h3>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus size={16} className="mr-2" />
              Add New Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Image</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <ImageUploader onImageSelect={handleImageUpload} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {Object.keys(images).length === 0 ? (
        <div className="border border-dashed rounded-md p-8 text-center">
          <Images className="h-10 w-10 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500 dark:text-gray-400">No images in your gallery yet</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={() => setIsUploadDialogOpen(true)}
          >
            Upload Your First Image
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.entries(images).map(([key, imageUrl]) => (
            <Card key={key} className="overflow-hidden group hover:shadow-md transition-shadow">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt="Gallery image" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity">
                  {onSelectImage && (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleSelectImage(key)}
                    >
                      Select
                    </Button>
                  )}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleCopyImageToClipboard(imageUrl)}
                    >
                      <Copy size={16} />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => handleDeleteImage(key)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;


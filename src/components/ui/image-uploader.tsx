
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  fileToDataUrl, 
  validateImage, 
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  formatFileSize,
  saveImageToLocalStorage,
  getImageKey
} from '@/utils/imageUtils';

interface ImageUploaderProps {
  onImageSelect: (dataUrl: string) => void;
  currentImage?: string;
  imageKey?: string;
  className?: string;
  label?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  section?: string;
  itemId?: string | number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  currentImage,
  imageKey,
  className = '',
  label = 'Upload Image',
  aspectRatio = 'auto',
  section,
  itemId
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    // Validate file
    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.message || 'Invalid file');
      setIsUploading(false);
      return;
    }
    
    try {
      // Convert file to data URL
      const dataUrl = await fileToDataUrl(file);
      
      // Save to localStorage if section and itemId are provided
      if (section && itemId) {
        const storageKey = getImageKey(section, itemId);
        saveImageToLocalStorage(storageKey, dataUrl);
      } else if (imageKey) {
        saveImageToLocalStorage(imageKey, dataUrl);
      }
      
      // Set preview and pass to parent
      setPreview(dataUrl);
      onImageSelect(dataUrl);
      
      toast({
        title: 'Image Uploaded',
        description: `${file.name} has been uploaded successfully.`,
      });
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const clearImage = () => {
    setPreview(null);
    onImageSelect('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Remove from localStorage if section and itemId are provided
    if (section && itemId) {
      const storageKey = getImageKey(section, itemId);
      localStorage.removeItem(storageKey);
    } else if (imageKey) {
      localStorage.removeItem(imageKey);
    }
  };
  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'video':
        return 'aspect-video';
      case 'portrait':
        return 'aspect-[3/4]';
      default:
        return '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <Label htmlFor="image-upload">{label}</Label>
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Accepted formats: {ACCEPTED_IMAGE_TYPES.map(type => type.replace('image/', '.')).join(', ')} | 
          Max size: {formatFileSize(MAX_FILE_SIZE)}
        </div>
      </div>
      
      <Input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
      />
      
      <div className="flex flex-col gap-4">
        {preview ? (
          <div className="relative">
            <div className={`relative border rounded-md overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${getAspectRatioClass()}`}>
              <img 
                src={preview} 
                alt="Image preview" 
                className="max-w-full max-h-full object-contain"
              />
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-80"
                onClick={clearImage}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        ) : (
          <div 
            className={`border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gray-400 transition-colors ${getAspectRatioClass()}`}
            onClick={handleButtonClick}
          >
            <ImageIcon className="h-10 w-10 text-gray-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Click to select an image or drag and drop
            </p>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleButtonClick}
            disabled={isUploading}
            className="flex-1"
          >
            {preview ? (
              <>
                <RefreshCw size={16} className="mr-2" />
                Change Image
              </>
            ) : (
              <>
                <Upload size={16} className="mr-2" />
                Select Image
              </>
            )}
          </Button>
          
          {preview && (
            <Button 
              type="button" 
              variant="destructive" 
              onClick={clearImage}
              className="flex-1"
            >
              Remove Image
            </Button>
          )}
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {isUploading && (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
          <span className="text-sm">Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

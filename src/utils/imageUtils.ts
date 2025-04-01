
/**
 * Utility functions for handling image uploads and storage
 */

// Define the supported image types
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg', 
  'image/png', 
  'image/gif', 
  'image/webp', 
  'image/svg+xml',
  'image/bmp',
  'image/tiff'
];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Convert a File object to a data URL
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to data URL'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Validate if the file is an accepted image type and within size limits
 */
export const validateImage = (file: File): { valid: boolean; message?: string } => {
  if (!file) {
    return { valid: false, message: 'No file selected' };
  }
  
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return { 
      valid: false, 
      message: `File type not supported. Please upload ${ACCEPTED_IMAGE_TYPES.map(type => type.replace('image/', '.')).join(', ')} files` 
    };
  }
  
  if (file.size > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      message: `File size too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
    };
  }
  
  return { valid: true };
};

/**
 * Save image to local storage (for non-production use)
 */
export const saveImageToLocalStorage = (key: string, imageDataUrl: string): void => {
  try {
    // Check if the image data URL is valid
    if (!imageDataUrl || !imageDataUrl.startsWith('data:image/')) {
      console.warn('Invalid image data URL');
      return;
    }
    
    localStorage.setItem(key, imageDataUrl);
    console.log(`Image saved to localStorage with key: ${key}`);
  } catch (error) {
    console.error('Error saving image to localStorage:', error);
    // Handle localStorage quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      throw new Error('Storage quota exceeded. Try using a smaller image or clearing some saved images.');
    } else {
      throw new Error('Failed to save image. The image might be too large for browser storage.');
    }
  }
};

/**
 * Get all saved images from local storage
 */
export const getSavedImages = (): Record<string, string> => {
  const images: Record<string, string> = {};
  
  try {
    // Filter localStorage for items that start with 'portfolio-'
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('portfolio-')) {
        const value = localStorage.getItem(key);
        if (value && value.startsWith('data:image/')) {
          images[key] = value;
        }
      }
    }
  } catch (error) {
    console.error('Error getting saved images:', error);
  }
  
  return images;
};

/**
 * Delete an image from local storage
 */
export const deleteImageFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
    console.log(`Image with key "${key}" deleted from localStorage`);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

// Generate a unique image ID
export const generateImageId = (): string => {
  return `portfolio-image-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Convert a file size in bytes to a human-readable string
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} bytes`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
};

/**
 * Get a unique image key based on section and identifier 
 */
export const getImageKey = (section: string, id: string | number): string => {
  return `portfolio-${section}-${id}`;
};

/**
 * Get image URL from localStorage or fallback to default URL
 */
export const getImageUrl = (key: string, fallbackUrl: string = ''): string => {
  try {
    const savedImage = localStorage.getItem(key);
    if (savedImage && savedImage.startsWith('data:image/')) {
      return savedImage;
    }
    return fallbackUrl;
  } catch (error) {
    console.error('Error retrieving image:', error);
    return fallbackUrl;
  }
};

/**
 * Check if browser supports localStorage
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = 'test-storage';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Optimize image before saving (reduces size to improve storage efficiency)
 * This is a simple version - for production, consider more sophisticated image optimization
 */
export const optimizeImage = async (file: File, maxWidth = 1200): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Only resize if the image is larger than maxWidth
        if (img.width <= maxWidth) {
          resolve(event.target?.result as string);
          return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Calculate new dimensions maintaining aspect ratio
        const ratio = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * ratio;
        
        // Draw resized image to canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert to data URL (jpeg has better compression than PNG)
        const quality = 0.8; // Adjust as needed (0.7-0.85 is a good balance)
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(optimizedDataUrl);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image for optimization'));
      };
      
      img.src = event.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file for optimization'));
    };
    
    reader.readAsDataURL(file);
  });
};

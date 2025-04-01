
/**
 * Utility functions for handling image uploads and storage
 */

// Define the supported image types
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

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
    localStorage.setItem(key, imageDataUrl);
  } catch (error) {
    console.error('Error saving image to localStorage:', error);
    throw new Error('Failed to save image. The image might be too large for browser storage.');
  }
};

/**
 * Get all saved images from local storage
 */
export const getSavedImages = (): Record<string, string> => {
  const images: Record<string, string> = {};
  
  try {
    // Filter localStorage for items that start with 'portfolio-image-'
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('portfolio-image-')) {
        const value = localStorage.getItem(key);
        if (value) {
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
    return savedImage || fallbackUrl;
  } catch (error) {
    console.error('Error retrieving image:', error);
    return fallbackUrl;
  }
};


/**
 * Versioned storage utility to prevent stale data issues
 */

// Current version of local storage data structure
const STORAGE_VERSION = '1.0.0';
const VERSION_KEY = 'portfolio_data_version';

/**
 * Clear all localStorage if the version doesn't match
 */
export const initializeVersionedStorage = (): void => {
  try {
    const currentVersion = localStorage.getItem(VERSION_KEY);
    
    // If version mismatch or no version, clear storage and set new version
    if (!currentVersion || currentVersion !== STORAGE_VERSION) {
      console.log(`Storage version mismatch (${currentVersion} vs ${STORAGE_VERSION}). Clearing localStorage.`);
      localStorage.clear();
      localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
    }
  } catch (error) {
    console.error('Error checking storage version:', error);
  }
};

/**
 * Set an item with the current timestamp to enable cache busting
 */
export const setVersionedItem = (key: string, value: any): void => {
  try {
    const timestampedValue = {
      data: value,
      timestamp: new Date().getTime(),
      version: STORAGE_VERSION
    };
    localStorage.setItem(key, JSON.stringify(timestampedValue));
  } catch (error) {
    console.error(`Error setting versioned item ${key}:`, error);
  }
};

/**
 * Get an item with version checking
 */
export const getVersionedItem = (key: string, maxAge?: number): any => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    const { data, timestamp, version } = JSON.parse(item);
    
    // Check if version matches
    if (version !== STORAGE_VERSION) {
      localStorage.removeItem(key);
      return null;
    }
    
    // Check if data is too old (if maxAge is provided in milliseconds)
    if (maxAge) {
      const now = new Date().getTime();
      if (now - timestamp > maxAge) {
        localStorage.removeItem(key);
        return null;
      }
    }
    
    return data;
  } catch (error) {
    console.error(`Error getting versioned item ${key}:`, error);
    localStorage.removeItem(key);
    return null;
  }
};

/**
 * Remove a versioned item
 */
export const removeVersionedItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
  }
};

/**
 * Force refresh the page with cache busting
 */
export const forceRefresh = (): void => {
  // Add a timestamp to the URL to force a refresh
  window.location.href = window.location.pathname + 
    '?refresh=' + new Date().getTime();
};

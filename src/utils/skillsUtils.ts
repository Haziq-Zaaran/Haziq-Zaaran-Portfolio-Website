
import React from 'react';

export interface Skill {
  name: string;
  level: number;
  icon: React.ElementType;
  category: string;
}

const STORAGE_KEY = 'portfolioSkills';

// Retrieve skills from localStorage
export const getStoredSkills = (): Skill[] => {
  try {
    const skillsData = localStorage.getItem(STORAGE_KEY);
    
    // If no skills in storage, return an empty array
    if (!skillsData) return [];
    
    // We need to handle the React.ElementType when parsing from JSON
    const parsedData = JSON.parse(skillsData);
    
    // For now, return empty array - we'll properly load from context instead
    return [];
  } catch (error) {
    console.error('Error retrieving skills from storage:', error);
    return [];
  }
};

// Store skills in localStorage
export const storeSkills = (skills: any[]): void => {
  try {
    // We can't directly stringify the React.ElementType, so we need a different approach
    // We'll handle this in the SkillsContext
    localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
  } catch (error) {
    console.error('Error storing skills:', error);
  }
};

// Helper to validate localStorage data
export const validateLocalStorage = (): boolean => {
  try {
    // Test if localStorage works
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (error) {
    console.error('LocalStorage is not available:', error);
    return false;
  }
};

// Helper to clear cached data and reset to default
export const resetLocalStorageData = (key: string): void => {
  try {
    localStorage.removeItem(key);
    console.log(`Reset ${key} data in localStorage`);
  } catch (error) {
    console.error(`Error resetting ${key} in localStorage:`, error);
  }
};

import { useContext } from 'react';
import { AccessibilityContext } from '../context/AccessibilityContext';
import { LoggerService } from '../services/LoggerService';
import type { AccessibilityContextState } from '../types';

/**
 * Hook to access the current accessibility state and configuration.
 * Must be used within an AccessibilityProvider.
 * 
 * @returns {AccessibilityContextState} The current system state and configuration.
 * @throws {Error} If used outside of an AccessibilityProvider.
 * @example
 * const { system, config } = useAccessibility();
 * if (system.isScreenReaderEnabled) { ... }
 */
export const useAccessibility = (): AccessibilityContextState => {
  const context = useContext(AccessibilityContext);
  
  if (context === undefined) {
    const error = new Error('useAccessibility must be used within an AccessibilityProvider');
    LoggerService.error(error.message);
    throw error;
  }
  
  return context;
};

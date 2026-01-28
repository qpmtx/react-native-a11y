import { useContext } from 'react';
import { QPA11YAccessibilityContext } from '../context/AccessibilityContext';
import { QPA11YLoggerService } from '../services/LoggerService';
import type { QPA11YAccessibilityContextState } from '../types';

/**
 * Hook to access the current accessibility state and configuration.
 * Must be used within an AccessibilityProvider.
 * 
 * @returns {QPA11YAccessibilityContextState} The current system state and configuration.
 * @throws {Error} If used outside of an AccessibilityProvider.
 * @example
 * const { system, config } = useAccessibility();
 * if (system.isScreenReaderEnabled) { ... }
 */
export const QPA11YUseAccessibility = (): QPA11YAccessibilityContextState => {
  const context = useContext(QPA11YAccessibilityContext);
  
  if (context === undefined) {
    const error = new Error('useAccessibility must be used within an AccessibilityProvider');
    QPA11YLoggerService.error(error.message);
    throw error;
  }
  
  return context;
};

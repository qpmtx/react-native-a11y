import { renderHook } from '@testing-library/react-native';
import { useAccessibility } from '../../hooks/useAccessibility';
import { AccessibilityProvider } from '../../context/AccessibilityContext';
import React from 'react';
import { LoggerService } from '../../services/LoggerService';

// Quiet logs for test
jest.spyOn(LoggerService, 'error').mockImplementation(() => {});

describe('useAccessibility', () => {
  it('should throw an error if used outside of AccessibilityProvider', () => {
    // Suppress console.error for expected error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => renderHook(() => useAccessibility())).toThrow(
      'useAccessibility must be used within an AccessibilityProvider'
    );
    
    consoleSpy.mockRestore();
  });

  it('should return context when used within AccessibilityProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AccessibilityProvider>{children}</AccessibilityProvider>
    );

    const { result } = renderHook(() => useAccessibility(), { wrapper });
    
    expect(result.current).toBeDefined();
    expect(result.current.system).toBeDefined();
    expect(result.current.config).toBeDefined();
    expect(result.current.config.level).toBe('AA'); // Default
  });
});

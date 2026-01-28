import { renderHook, waitFor } from '@testing-library/react-native';
import { useAccessibility } from '../../hooks/useAccessibility';
import { AccessibilityProvider } from '../../context/AccessibilityContext';
import React from 'react';
import { LoggerService } from '../../services/LoggerService';
import { AccessibilityInfo, PixelRatio } from 'react-native';

// Quiet logs for test
jest.spyOn(LoggerService, 'error').mockImplementation(() => {});
jest.spyOn(LoggerService, 'info').mockImplementation(() => {});

// Mock AccessibilityInfo
jest.spyOn(AccessibilityInfo, 'isScreenReaderEnabled').mockResolvedValue(true);
jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
jest.spyOn(AccessibilityInfo, 'isReduceTransparencyEnabled').mockResolvedValue(false);
jest.spyOn(AccessibilityInfo, 'isBoldTextEnabled').mockResolvedValue(false);
jest.spyOn(AccessibilityInfo, 'isGrayscaleEnabled').mockResolvedValue(false);
jest.spyOn(AccessibilityInfo, 'isInvertColorsEnabled').mockResolvedValue(false);
jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() } as any);
jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(1);

describe('useAccessibility', () => {
  it('should throw an error if used outside of AccessibilityProvider', () => {
    // Suppress console.error for expected error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => renderHook(() => useAccessibility())).toThrow(
      'useAccessibility must be used within an AccessibilityProvider'
    );
    
    consoleSpy.mockRestore();
  });

  it('should return context when used within AccessibilityProvider', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AccessibilityProvider>{children}</AccessibilityProvider>
    );

    const { result } = renderHook(() => useAccessibility(), { wrapper });
    
    // Wait for the async initialization to complete
    await waitFor(() => {
        expect(result.current.system.isScreenReaderEnabled).toBe(true);
    });

    expect(result.current).toBeDefined();
    expect(result.current.system).toBeDefined();
    expect(result.current.config).toBeDefined();
    expect(result.current.config.level).toBe('AA'); // Default
  });
});

import { renderHook, waitFor } from '@testing-library/react-native';
import { QPA11YUseAccessibilitySystem } from '../../hooks/useAccessibilitySystem';
import { QPA11YAccessibilityProvider } from '../../context/AccessibilityContext';
import React from 'react';
import { AccessibilityInfo, PixelRatio } from 'react-native';
import { QPA11YLoggerService } from '../../services/LoggerService';

// Quiet logs
jest.spyOn(QPA11YLoggerService, 'info').mockImplementation(() => {});
jest.spyOn(QPA11YLoggerService, 'error').mockImplementation(() => {});

// Mock AccessibilityInfo
const mockAddEventListener = jest.fn().mockReturnValue({ remove: jest.fn() });
jest.spyOn(AccessibilityInfo, 'addEventListener').mockImplementation(mockAddEventListener as any);

// Helpers to mock specific states for different tests
const mockSystemState = (overrides: Partial<{
  isScreenReaderEnabled: boolean;
  isReduceMotionEnabled: boolean;
  isReduceTransparencyEnabled: boolean;
  isBoldTextEnabled: boolean;
  isGrayscaleEnabled: boolean;
  isInvertColorsEnabled: boolean;
  fontScale: number;
}>) => {
  jest.spyOn(AccessibilityInfo, 'isScreenReaderEnabled').mockResolvedValue(overrides.isScreenReaderEnabled ?? false);
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(overrides.isReduceMotionEnabled ?? false);
  jest.spyOn(AccessibilityInfo, 'isReduceTransparencyEnabled').mockResolvedValue(overrides.isReduceTransparencyEnabled ?? false);
  jest.spyOn(AccessibilityInfo, 'isBoldTextEnabled').mockResolvedValue(overrides.isBoldTextEnabled ?? false);
  jest.spyOn(AccessibilityInfo, 'isGrayscaleEnabled').mockResolvedValue(overrides.isGrayscaleEnabled ?? false);
  jest.spyOn(AccessibilityInfo, 'isInvertColorsEnabled').mockResolvedValue(overrides.isInvertColorsEnabled ?? false);
  jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(overrides.fontScale ?? 1);
};

describe('QPA11YUseAccessibilitySystem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if used outside provider', () => {
    // Suppress expected error log
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => QPA11YUseAccessibilitySystem())).toThrow();
    jest.spyOn(console, 'error').mockRestore();
  });

  it('should return default system state and helper', async () => {
    mockSystemState({ isReduceMotionEnabled: false });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QPA11YAccessibilityProvider>{children}</QPA11YAccessibilityProvider>
    );

    const { result } = renderHook(() => QPA11YUseAccessibilitySystem(), { wrapper });

    await waitFor(() => {
      expect(result.current.isReduceMotionEnabled).toBe(false);
    });

    expect(result.current.shouldReduceMotion).toBe(false);
  });

  it('should return true for shouldReduceMotion when enabled', async () => {
    mockSystemState({ isReduceMotionEnabled: true });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QPA11YAccessibilityProvider>{children}</QPA11YAccessibilityProvider>
    );

    const { result } = renderHook(() => QPA11YUseAccessibilitySystem(), { wrapper });

    await waitFor(() => {
      expect(result.current.isReduceMotionEnabled).toBe(true);
    });

    expect(result.current.shouldReduceMotion).toBe(true);
  });

  it('should reflect all system flags correctly', async () => {
    mockSystemState({
      isScreenReaderEnabled: true,
      isReduceMotionEnabled: true,
      isReduceTransparencyEnabled: true,
      isBoldTextEnabled: true,
      isGrayscaleEnabled: true,
      isInvertColorsEnabled: true,
      fontScale: 2.0,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QPA11YAccessibilityProvider>{children}</QPA11YAccessibilityProvider>
    );

    const { result } = renderHook(() => QPA11YUseAccessibilitySystem(), { wrapper });

    await waitFor(() => {
      expect(result.current.isScreenReaderEnabled).toBe(true);
    });

    expect(result.current.isReduceMotionEnabled).toBe(true);
    expect(result.current.isReduceTransparencyEnabled).toBe(true);
    expect(result.current.isBoldTextEnabled).toBe(true);
    expect(result.current.isGrayscaleEnabled).toBe(true);
    expect(result.current.isInvertColorsEnabled).toBe(true);
    expect(result.current.fontScale).toBe(2.0);
    expect(result.current.shouldReduceMotion).toBe(true);
  });
});

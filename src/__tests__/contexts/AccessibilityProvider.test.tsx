import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { AccessibilityProvider, AccessibilityContext } from '../../context/AccessibilityContext';
import { AccessibilityInfo, PixelRatio } from 'react-native';

// Mock AccessibilityInfo methods
jest.spyOn(AccessibilityInfo, 'isScreenReaderEnabled').mockResolvedValue(true);
jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
jest.spyOn(AccessibilityInfo, 'isReduceTransparencyEnabled').mockResolvedValue(false);
jest.spyOn(AccessibilityInfo, 'isBoldTextEnabled').mockResolvedValue(false);
jest.spyOn(AccessibilityInfo, 'isGrayscaleEnabled').mockResolvedValue(false);
jest.spyOn(AccessibilityInfo, 'isInvertColorsEnabled').mockResolvedValue(false);
jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() } as any);
// Mock PixelRatio
jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(1.5);

describe('AccessibilityProvider', () => {
  it('should initialize system state from AccessibilityInfo', async () => {
    let contextValue: any;

    const Consumer = () => {
      contextValue = React.useContext(AccessibilityContext);
      return null;
    };

    render(
      <AccessibilityProvider>
        <Consumer />
      </AccessibilityProvider>
    );

    // Initial state might be default
    // We wait for update
    await waitFor(() => {
      expect(contextValue?.system.isScreenReaderEnabled).toBe(true);
    });

    expect(contextValue?.system.isReduceMotionEnabled).toBe(true);
    expect(contextValue?.system.fontScale).toBe(1.5);
  });

  it('should apply custom configuration', () => {
    let contextValue: any;

    const Consumer = () => {
      contextValue = React.useContext(AccessibilityContext);
      return null;
    };

    render(
      <AccessibilityProvider config={{ level: 'AAA', featureFlags: { enforceHighContrast: true } }}>
        <Consumer />
      </AccessibilityProvider>
    );

    expect(contextValue?.config.level).toBe('AAA');
    expect(contextValue?.config.featureFlags.enforceHighContrast).toBe(true);
  });
});

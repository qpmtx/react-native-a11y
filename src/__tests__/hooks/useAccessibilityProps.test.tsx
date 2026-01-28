import { renderHook } from '@testing-library/react-native';
import { QPA11YUseAccessibilityProps } from '../../hooks/useAccessibilityProps';
import { QPA11YAccessibilityProvider } from '../../context/AccessibilityContext';
import { QPA11YLoggerService } from '../../services/LoggerService';
import React from 'react';

// Mock Logger
const warnSpy = jest.spyOn(QPA11YLoggerService, 'warn').mockImplementation(() => {});

describe('QPA11YUseAccessibilityProps', () => {
  beforeEach(() => {
    warnSpy.mockClear();
  });

  it('should return correct simple mappings', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QPA11YAccessibilityProvider>{children}</QPA11YAccessibilityProvider>
    );

    const props = {
      role: 'button' as const,
      label: 'Click Me',
      hint: 'Submits form'
    };

    const { result } = renderHook(() => QPA11YUseAccessibilityProps(props), { wrapper });

    expect(result.current.accessible).toBe(true);
    expect(result.current.accessibilityRole).toBe('button');
    expect(result.current.accessibilityLabel).toBe('Click Me');
    expect(result.current.accessibilityHint).toBe('Submits form');
  });

  it('should construct accessibilityState correctly', () => {
     const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QPA11YAccessibilityProvider>{children}</QPA11YAccessibilityProvider>
    );

    const props = {
      state: {
        disabled: true,
        busy: true,
        expanded: false,
        checked: 'mixed' as const
      }
    };

    const { result } = renderHook(() => QPA11YUseAccessibilityProps(props), { wrapper });

    expect(result.current.accessibilityState).toEqual({
      disabled: true,
      busy: true,
      expanded: false,
      checked: 'mixed',
      selected: undefined
    });
  });

  it('should handle hidden prop correctly', () => {
     const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QPA11YAccessibilityProvider>{children}</QPA11YAccessibilityProvider>
    );

    const { result } = renderHook(() => QPA11YUseAccessibilityProps({ hidden: true }), { wrapper });

    expect(result.current.accessible).toBe(false);
    expect(result.current.accessibilityElementsHidden).toBe(true);
    expect(result.current.importantForAccessibility).toBe('no-hide-descendants');
  });

  it('should warn if AAA level and button has no label', () => {
     const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QPA11YAccessibilityProvider config={{ level: 'AAA', featureFlags: {} }}>
        {children}
      </QPA11YAccessibilityProvider>
    );

    renderHook(() => QPA11YUseAccessibilityProps({ role: 'button' }), { wrapper });

    expect(warnSpy).toHaveBeenCalledWith('WCAG AAA: Elements with role "button" must have an accessible label.');
  });

  it('should NOT warn if AA level and button has no label', () => {
     const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QPA11YAccessibilityProvider config={{ level: 'AA', featureFlags: {} }}>
        {children}
      </QPA11YAccessibilityProvider>
    );

    renderHook(() => QPA11YUseAccessibilityProps({ role: 'button' }), { wrapper });

    expect(warnSpy).not.toHaveBeenCalled();
  });
});

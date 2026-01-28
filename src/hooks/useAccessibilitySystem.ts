import { QPA11YUseAccessibility } from './useAccessibility';
import type { QPA11YAccessibilitySystemState } from '../types';

/**
 * Return type for the useAccessibilitySystem hook.
 * Extends the system state with convenience helpers.
 */
export type QPA11YAccessibilitySystemHookResult = QPA11YAccessibilitySystemState & {
  /**
   * Helper to determine if motion should be reduced.
   * Useful for conditional rendering of animations.
   */
  shouldReduceMotion: boolean;
};

/**
 * Hook to access the device's system accessibility state.
 * 
 * @returns {QPA11YAccessibilitySystemHookResult} The current system accessibility state with helpers.
 * @throws {Error} If used outside of AccessibilityProvider.
 * 
 * @example
 * const { isScreenReaderEnabled, shouldReduceMotion } = useAccessibilitySystem();
 * 
 * if (shouldReduceMotion) {
 *   // Render static content
 * }
 */
export const QPA11YUseAccessibilitySystem = (): QPA11YAccessibilitySystemHookResult => {
  const { system } = QPA11YUseAccessibility();

  return {
    ...system,
    shouldReduceMotion: system.isReduceMotionEnabled,
  };
};

import { useAccessibility } from './useAccessibility';
import type { AccessibilitySystemState } from '../types';

/**
 * Return type for the useAccessibilitySystem hook.
 * Extends the system state with convenience helpers.
 */
export type AccessibilitySystemHookResult = AccessibilitySystemState & {
  /**
   * Helper to determine if motion should be reduced.
   * Useful for conditional rendering of animations.
   */
  shouldReduceMotion: boolean;
};

/**
 * Hook to access the device's system accessibility state.
 * 
 * @returns {AccessibilitySystemHookResult} The current system accessibility state with helpers.
 * @throws {Error} If used outside of AccessibilityProvider.
 * 
 * @example
 * const { isScreenReaderEnabled, shouldReduceMotion } = useAccessibilitySystem();
 * 
 * if (shouldReduceMotion) {
 *   // Render static content
 * }
 */
export const useAccessibilitySystem = (): AccessibilitySystemHookResult => {
  const { system } = useAccessibility();

  return {
    ...system,
    shouldReduceMotion: system.isReduceMotionEnabled,
  };
};

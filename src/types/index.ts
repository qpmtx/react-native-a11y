/**
 * Shared Type Definitions
 * @module Types
 */

/**
 * The strictness level for accessibility enforcement.
 * - 'AA': Standard legal requirement (default).
 * - 'AAA': Enhanced strictness (higher contrast, larger touch targets).
 */
export type WCAGLevel = 'AA' | 'AAA';

/**
 * Represents the complete snapshot of the device's accessibility settings.
 * This covers WCAG requirements for Motion, Vision, and Text scaling.
 */
export type AccessibilitySystemState = {
  /** Is VoiceOver (iOS) or TalkBack (Android) active? */
  isScreenReaderEnabled: boolean;
  
  /** Is the user requesting reduced animation? (Critical for WCAG 2.1 Animation) */
  isReduceMotionEnabled: boolean;
  
  /** (iOS) Has the user requested reduced transparency/blur? */
  isReduceTransparencyEnabled: boolean;
  
  /** (iOS) Is the system bold text setting enabled? */
  isBoldTextEnabled: boolean;
  
  /** (iOS) Is the display set to Grayscale? */
  isGrayscaleEnabled: boolean;
  
  /** (iOS/Android) Are colors inverted? */
  isInvertColorsEnabled: boolean;
  
  /** The current font scaling factor (e.g., 1.0, 2.0). Critical for Text Resizing. */
  fontScale: number; 
};

/**
 * Feature flags to toggle specific accessibility behaviors.
 */
export type AccessibilityFeatureFlags = {
  /** If true, warns or styles components that do not meet the minimum touch target size. */
  enforceMinimumTouchTarget?: boolean;
  /** If true, enforces stricter contrast checks for text and icons. */
  enforceHighContrast?: boolean;
  /** If true, forces the app to respect the user's "Reduce Motion" setting. */
  disableAnimations?: boolean;
  /** If true, logs warnings to the console during development. */
  debugMode?: boolean;
};

/**
 * Configuration options for the Accessibility Provider.
 */
export type AccessibilityConfig = {
  /** The WCAG compliance level to enforce. Defaults to 'AA'. */
  level: WCAGLevel;
  
  /** Feature flags to toggle specific accessibility behaviors. */
  featureFlags: AccessibilityFeatureFlags;
};

/**
 * The shape of the context data provided to the app.
 */
export type AccessibilityContextState = {
  /** The real-time state of the device system settings. */
  system: AccessibilitySystemState;
  /** The active configuration object. */
  config: AccessibilityConfig;
};

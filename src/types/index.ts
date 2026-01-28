/**
 * Shared Type Definitions
 * @module Types
 */

/**
 * The strictness level for accessibility enforcement.
 * - 'AA': Standard legal requirement (default).
 * - 'AAA': Enhanced strictness (higher contrast, larger touch targets).
 */
export type QPA11YWCAGLevel = 'AA' | 'AAA';

/**
 * Represents the complete snapshot of the device's accessibility settings.
 * This covers WCAG requirements for Motion, Vision, and Text scaling.
 */
export type QPA11YAccessibilitySystemState = {
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
export type QPA11YAccessibilityFeatureFlags = {
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
export type QPA11YAccessibilityConfig = {
  /** The WCAG compliance level to enforce. Defaults to 'AA'. */
  level: QPA11YWCAGLevel;
  
  /** Feature flags to toggle specific accessibility behaviors. */
  featureFlags: QPA11YAccessibilityFeatureFlags;
};

/**
 * The shape of the context data provided to the app.
 */
export type QPA11YAccessibilityContextState = {
  /** The real-time state of the device system settings. */
  system: QPA11YAccessibilitySystemState;
  /** The active configuration object. */
  /** The active configuration object. */
  config: QPA11YAccessibilityConfig;
};

/**
 * Represents the state of an accessible component.
 * Maps to React Native's accessibilityState.
 */
export type QPA11YAccessibilityComponentState = {
  /** Is the component currently selected or checked? */
  checked?: boolean | 'mixed';
  /** Is the component disabled? */
  disabled?: boolean;
  /** Is the component currently processing an action? */
  busy?: boolean;
  /** Is the component expanded? (e.g., accordion, menu) */
  expanded?: boolean;
};

/**
 * Input props for the useAccessibilityProps hook.
 * Defines the semantic requirements for an accessible component.
 */
export type QPA11YAccessibilityComponentProps = {
  /** The semantic role of the component. */
  role?: 'button' | 'link' | 'image' | 'text' | 'header' | 'search' | 'imagebutton' | 'keyboardkey' | 'adjustable' | 'summary' | 'alert' | 'checkbox' | 'combobox' | 'menu' | 'menubar' | 'menuitem' | 'progressbar' | 'radio' | 'radiogroup' | 'scrollbar' | 'spinbutton' | 'switch' | 'tab' | 'tablist' | 'timer' | 'toolbar';
  
  /** 
   * Descriptive role description (iOS only). 
   * Use with caution, standard roles are preferred.
   */
  roleDescription?: string;

  /**
   * The text read by the screen reader.
   * REQUIRED for interactive elements like buttons if strict mode is enabled.
   */
  label?: string;

  /** Additional context or instructions (e.g., "Double tap to open"). */
  hint?: string;

  /** The current state of the component. */
  state?: QPA11YAccessibilityComponentState;

  /** 
   * Is the component hidden from accessibility services? 
   * If true, sets importantForAccessibility to 'no-hide-descendants'.
   */
  hidden?: boolean;

  /**
   * Defines the semantic value of the component (e.g. for sliders).
   */
  value?: {
    min?: number;
    max?: number;
    now?: number;
    text?: string;
  };
};

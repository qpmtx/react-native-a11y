import type { AccessibilitySystemState } from '../types';

/**
 * The initial default state.
 * We assume everything is "standard" until we read the device values.
 */
export const initialState: AccessibilitySystemState = {
  isScreenReaderEnabled: false,
  isReduceMotionEnabled: false,
  isReduceTransparencyEnabled: false,
  isBoldTextEnabled: false,
  isGrayscaleEnabled: false,
  isInvertColorsEnabled: false,
  fontScale: 1,
};

/**
 * Action types for the reducer.
 * using a discriminated union for strict type safety.
 */
export type AccessibilityAction =
  | { type: 'SET_SCREEN_READER'; payload: boolean }
  | { type: 'SET_REDUCE_MOTION'; payload: boolean }
  | { type: 'SET_REDUCE_TRANSPARENCY'; payload: boolean }
  | { type: 'SET_BOLD_TEXT'; payload: boolean }
  | { type: 'SET_GRAYSCALE'; payload: boolean }
  | { type: 'SET_INVERT_COLORS'; payload: boolean }
  | { type: 'SET_FONT_SCALE'; payload: number }
  | { type: 'UPDATE_ALL'; payload: Partial<AccessibilitySystemState> };

/**
 * The Reducer function.
 * Handles state transitions based on system events.
 * 
 * @param {AccessibilitySystemState} state - The current state.
 * @param {AccessibilityAction} action - The action dispatched.
 * @returns {AccessibilitySystemState} The new state.
 */
export const accessibilityReducer = (
  state: AccessibilitySystemState,
  action: AccessibilityAction
): AccessibilitySystemState => {
  switch (action.type) {
    case 'SET_SCREEN_READER':
      return { ...state, isScreenReaderEnabled: action.payload };
    case 'SET_REDUCE_MOTION':
      return { ...state, isReduceMotionEnabled: action.payload };
    case 'SET_REDUCE_TRANSPARENCY':
      return { ...state, isReduceTransparencyEnabled: action.payload };
    case 'SET_BOLD_TEXT':
      return { ...state, isBoldTextEnabled: action.payload };
    case 'SET_GRAYSCALE':
      return { ...state, isGrayscaleEnabled: action.payload };
    case 'SET_INVERT_COLORS':
      return { ...state, isInvertColorsEnabled: action.payload };
    case 'SET_FONT_SCALE':
      return { ...state, fontScale: action.payload };
    case 'UPDATE_ALL':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
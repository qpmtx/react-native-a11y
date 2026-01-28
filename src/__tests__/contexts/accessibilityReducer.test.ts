import { accessibilityReducer, initialState, type AccessibilityAction } from '../../context/accessibilityReducer';

describe('accessibilityReducer', () => {
  it('should return initial state by default', () => {
    // @ts-expect-error Testing invalid action
    expect(accessibilityReducer(initialState, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  it('should handle SET_SCREEN_READER', () => {
    const action: AccessibilityAction = { type: 'SET_SCREEN_READER', payload: true };
    const state = accessibilityReducer(initialState, action);
    expect(state.isScreenReaderEnabled).toBe(true);
  });

  it('should handle SET_REDUCE_MOTION', () => {
    const action: AccessibilityAction = { type: 'SET_REDUCE_MOTION', payload: true };
    const state = accessibilityReducer(initialState, action);
    expect(state.isReduceMotionEnabled).toBe(true);
  });

  it('should handle SET_REDUCE_TRANSPARENCY', () => {
    const action: AccessibilityAction = { type: 'SET_REDUCE_TRANSPARENCY', payload: true };
    const state = accessibilityReducer(initialState, action);
    expect(state.isReduceTransparencyEnabled).toBe(true);
  });

  it('should handle SET_BOLD_TEXT', () => {
    const action: AccessibilityAction = { type: 'SET_BOLD_TEXT', payload: true };
    const state = accessibilityReducer(initialState, action);
    expect(state.isBoldTextEnabled).toBe(true);
  });

  it('should handle SET_GRAYSCALE', () => {
    const action: AccessibilityAction = { type: 'SET_GRAYSCALE', payload: true };
    const state = accessibilityReducer(initialState, action);
    expect(state.isGrayscaleEnabled).toBe(true);
  });

  it('should handle SET_INVERT_COLORS', () => {
    const action: AccessibilityAction = { type: 'SET_INVERT_COLORS', payload: true };
    const state = accessibilityReducer(initialState, action);
    expect(state.isInvertColorsEnabled).toBe(true);
  });

  it('should handle SET_FONT_SCALE', () => {
    const action: AccessibilityAction = { type: 'SET_FONT_SCALE', payload: 2.0 };
    const state = accessibilityReducer(initialState, action);
    expect(state.fontScale).toBe(2.0);
  });

  it('should handle UPDATE_ALL', () => {
    const payload = {
      isScreenReaderEnabled: true,
      fontScale: 1.5,
    };
    const action: AccessibilityAction = { type: 'UPDATE_ALL', payload };
    const state = accessibilityReducer(initialState, action);
    
    expect(state.isScreenReaderEnabled).toBe(true);
    expect(state.fontScale).toBe(1.5);
    // Should preserve other values
    expect(state.isReduceMotionEnabled).toBe(false);
  });
});

import React, { createContext, useEffect, useReducer, type ReactNode } from 'react';
import { AccessibilityInfo, PixelRatio, type EventSubscription } from 'react-native';
import { 
  accessibilityReducer, 
  initialState,
} from './accessibilityReducer';
import { QPA11YLoggerService } from '../services/LoggerService';
import type { 
  QPA11YAccessibilityConfig, 
  QPA11YAccessibilityContextState 
} from '../types';

export const QPA11YAccessibilityContext = createContext<QPA11YAccessibilityContextState | undefined>(undefined);

export type QPA11YAccessibilityProviderProps = {
  children: ReactNode;
  config?: Partial<QPA11YAccessibilityConfig>;
};

/**
 * The main Provider component. 
 * This must wrap your application root to enable the accessibility hooks.
 */
export const QPA11YAccessibilityProvider: React.FC<QPA11YAccessibilityProviderProps> = ({ 
  children, 
  config 
}) => {
  // 1. Initialize Reducer
  const [systemState, dispatch] = useReducer(accessibilityReducer, initialState);

  // 2. Merge user config with defaults
  const activeConfig: QPA11YAccessibilityConfig = {
    level: config?.level || 'AA',
    featureFlags: {
      enforceMinimumTouchTarget: true,
      debugMode: __DEV__,
      ...config?.featureFlags,
    }
  };

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    const initSystemState = async () => {
      try {
        // Fetch all initial values in parallel
        const [
          screenReader,
          reduceMotion,
          reduceTransparency,
          boldText,
          grayscale,
          invertColors
        ] = await Promise.all([
          AccessibilityInfo.isScreenReaderEnabled(),
          AccessibilityInfo.isReduceMotionEnabled(),
          AccessibilityInfo.isReduceTransparencyEnabled(),
          AccessibilityInfo.isBoldTextEnabled(),
          AccessibilityInfo.isGrayscaleEnabled(),
          AccessibilityInfo.isInvertColorsEnabled(),
        ]);

        const currentFontScale = PixelRatio.getFontScale();

        dispatch({
          type: 'UPDATE_ALL',
          payload: {
            isScreenReaderEnabled: screenReader,
            isReduceMotionEnabled: reduceMotion,
            isReduceTransparencyEnabled: reduceTransparency,
            isBoldTextEnabled: boldText,
            isGrayscaleEnabled: grayscale,
            isInvertColorsEnabled: invertColors,
            fontScale: currentFontScale
          }
        });

        if (activeConfig.featureFlags.debugMode) {
          QPA11YLoggerService.info('System State Initialized', { 
            level: activeConfig.level,
            system: { screenReader, reduceMotion, fontScale: currentFontScale }
          });
        }
      } catch (error) {
        QPA11YLoggerService.error('Failed to initialize accessibility state', error);
      }
    };

    // 3. Register Listeners
    const register = () => {
      subscriptions.push(
        AccessibilityInfo.addEventListener('screenReaderChanged', 
          (val) => dispatch({ type: 'SET_SCREEN_READER', payload: val })),
        
        AccessibilityInfo.addEventListener('reduceMotionChanged', 
          (val) => dispatch({ type: 'SET_REDUCE_MOTION', payload: val })),
        
        AccessibilityInfo.addEventListener('reduceTransparencyChanged', 
          (val) => dispatch({ type: 'SET_REDUCE_TRANSPARENCY', payload: val })),
          
        AccessibilityInfo.addEventListener('boldTextChanged', 
          (val) => dispatch({ type: 'SET_BOLD_TEXT', payload: val })),
          
        AccessibilityInfo.addEventListener('grayscaleChanged', 
          (val) => dispatch({ type: 'SET_GRAYSCALE', payload: val })),
          
        AccessibilityInfo.addEventListener('invertColorsChanged', 
          (val) => dispatch({ type: 'SET_INVERT_COLORS', payload: val }))
      );
    };

    initSystemState();
    register();

    return () => {
      subscriptions.forEach(sub => sub.remove());
    };
  }, []);

  return (
    <QPA11YAccessibilityContext.Provider value={{ system: systemState, config: activeConfig }}>
      {children}
    </QPA11YAccessibilityContext.Provider>
  );
};
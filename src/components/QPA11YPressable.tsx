import React from 'react';
import { Pressable, type PressableProps, type ViewStyle } from 'react-native';
import { QPA11YUseAccessibilityProps } from '../hooks/useAccessibilityProps';
import type { QPA11YAccessibilityComponentProps } from '../types';

export type QPA11YPressableProps = Omit<PressableProps, keyof QPA11YAccessibilityComponentProps> &
  QPA11YAccessibilityComponentProps & {
    style?: ViewStyle | ((state: { pressed: boolean }) => ViewStyle);
  };

/**
 * A wrapper around React Native's Pressable component that enforces accessibility best practices.
 * It automatically generates accessibility props based on the semantic configuration provided.
 *
 * @example
 * <QPA11YPressable
 *   role="button"
 *   label="Submit Form"
 *   onPress={handleSubmit}
 * >
 *   <Text>Submit</Text>
 * </QPA11YPressable>
 */
export const QPA11YPressable: React.FC<QPA11YPressableProps> = ({
  role = 'button', // Default to button for pressables
  label,
  hint,
  state,
  hidden,
  value,
  roleDescription,
  componentName = 'QPA11YPressable',
  style,
  children,
  ...pressableProps
}) => {
  const a11yProps = QPA11YUseAccessibilityProps({
    role,
    label,
    hint,
    state,
    hidden,
    value,
    roleDescription,
    componentName,
    children, // Pass children for heuristic checks
  });

  return (
    <Pressable style={style} {...a11yProps} {...pressableProps}>
      {children}
    </Pressable>
  );
};

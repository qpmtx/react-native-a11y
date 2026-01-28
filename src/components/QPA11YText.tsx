import React from 'react';
import { Text, type TextProps } from 'react-native';
import { QPA11YUseAccessibilityProps } from '../hooks/useAccessibilityProps';
import type { QPA11YAccessibilityComponentProps } from '../types';

export type QPA11YTextProps = Omit<TextProps, keyof QPA11YAccessibilityComponentProps> &
  QPA11YAccessibilityComponentProps;

/**
 * A wrapper around React Native's Text component that enforces accessibility best practices.
 * By default, text has the 'text' role.
 */
export const QPA11YText: React.FC<QPA11YTextProps> = ({
  role = 'text',
  label,
  hint,
  state,
  hidden,
  value,
  roleDescription,
  componentName = 'QPA11YText',
  children,
  ...textProps
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
    children
  });

  return (
    <Text {...a11yProps} {...textProps}>
      {children}
    </Text>
  );
};

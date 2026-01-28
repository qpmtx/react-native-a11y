import React from 'react';
import { View, type ViewProps } from 'react-native';
import { QPA11YUseAccessibilityProps } from '../hooks/useAccessibilityProps';
import type { QPA11YAccessibilityComponentProps } from '../types';

export type QPA11YViewProps = Omit<ViewProps, keyof QPA11YAccessibilityComponentProps> &
  QPA11YAccessibilityComponentProps;

/**
 * A wrapper around React Native's View component that includes accessibility validation.
 * Use this for container views that have semantic meaning or need to be accessible.
 */
export const QPA11YView: React.FC<QPA11YViewProps> = ({
  role,
  label,
  hint,
  state,
  hidden,
  value,
  roleDescription,
  componentName = 'QPA11YView',
  children,
  ...viewProps
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
    <View {...a11yProps} {...viewProps}>
      {children}
    </View>
  );
};

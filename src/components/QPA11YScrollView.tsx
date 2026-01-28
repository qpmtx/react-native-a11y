import React from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';
import { QPA11YUseAccessibilityProps } from '../hooks/useAccessibilityProps';
import type { QPA11YAccessibilityComponentProps } from '../types';

export type QPA11YScrollViewProps = Omit<ScrollViewProps, keyof QPA11YAccessibilityComponentProps> &
  QPA11YAccessibilityComponentProps;

/**
 * A wrapper around React Native's ScrollView component.
 * Ensures that any accessibility props passed to the ScrollView are validated.
 */
export const QPA11YScrollView: React.FC<QPA11YScrollViewProps> = ({
  role,
  label,
  hint,
  state,
  hidden,
  value,
  roleDescription,
  componentName = 'QPA11YScrollView',
  children,
  ...scrollViewProps
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
    <ScrollView {...a11yProps} {...scrollViewProps}>
      {children}
    </ScrollView>
  );
};

import React from 'react';
import { Switch, type SwitchProps } from 'react-native';
import { QPA11YUseAccessibilityProps } from '../hooks/useAccessibilityProps';
import type { QPA11YAccessibilityComponentProps } from '../types';

export type QPA11YSwitchProps = Omit<SwitchProps, Exclude<keyof QPA11YAccessibilityComponentProps, 'value'>> &
  Omit<QPA11YAccessibilityComponentProps, 'value'>;

/**
 * A wrapper around React Native's Switch component.
 * Switches function as specific interactive controls and should have labels.
 * Default role is 'switch'.
 */
export const QPA11YSwitch: React.FC<QPA11YSwitchProps> = ({
  role = 'switch',
  label,
  hint,
  state,
  hidden,
  value,
  roleDescription,
  componentName = 'QPA11YSwitch',
  ...switchProps
}) => {
  const a11yProps = QPA11YUseAccessibilityProps({
    role,
    label,
    hint,
    state,
    hidden,
    value: undefined, // Switch value (boolean) is not the same as a11y value (object)
    roleDescription,
    componentName,
  });

  return <Switch {...a11yProps} value={value} {...switchProps} />;
};

import React from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { QPA11YUseAccessibilityProps } from '../hooks/useAccessibilityProps';
import type { QPA11YAccessibilityComponentProps } from '../types';

export type QPA11YTextInputProps = Omit<TextInputProps, Exclude<keyof QPA11YAccessibilityComponentProps, 'value'>> &
  Omit<QPA11YAccessibilityComponentProps, 'value'>;

/**
 * A wrapper around React Native's TextInput component that enforces accessibility labels.
 * Inputs must have a label or hint describing their purpose.
 */
export const QPA11YTextInput: React.FC<QPA11YTextInputProps> = ({
  role, // TextInput often doesn't need an explicit role, but can be 'search' etc.
  label,
  hint,
  state,
  hidden,
  value,
  roleDescription,
  componentName = 'QPA11YTextInput',
  children,
  ...textInputProps
}) => {
  const a11yProps = QPA11YUseAccessibilityProps({
    role,
    label,
    hint,
    state,
    hidden,
    value: undefined, // TextInput value (string) is not the same as a11y value (object)
    roleDescription,
    componentName,
    children
  });

  return (
    <TextInput {...a11yProps} value={value} {...textInputProps}>
      {children}
    </TextInput>
  );
};

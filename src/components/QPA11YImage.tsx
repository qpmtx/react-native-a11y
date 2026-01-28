import React from 'react';
import { Image, type ImageProps } from 'react-native';
import { QPA11YUseAccessibilityProps } from '../hooks/useAccessibilityProps';
import type { QPA11YAccessibilityComponentProps } from '../types';

export type QPA11YImageProps = Omit<ImageProps, keyof QPA11YAccessibilityComponentProps> &
  QPA11YAccessibilityComponentProps;

/**
 * A wrapper around React Native's Image component that checks for accessibility labels.
 * Images should generally have a label unless they are decorative.
 */
export const QPA11YImage: React.FC<QPA11YImageProps> = ({
  role = 'image',
  label,
  hint,
  state,
  hidden,
  value,
  roleDescription,
  componentName = 'QPA11YImage',
  ...imageProps
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
  });

  return <Image {...a11yProps} {...imageProps} />;
};

import type { AccessibilityRole, AccessibilityState, AccessibilityValue } from 'react-native';
import { QPA11YUseAccessibility } from './useAccessibility';
import { QPA11YLoggerService } from '../services/LoggerService';
import type { QPA11YAccessibilityComponentProps } from '../types';

/**
 * Return type for useAccessibilityProps.
 * Contains the standard React Native accessibility props.
 */
export type QPA11YAccessibilityPropsResult = {
  accessible: boolean;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityState?: AccessibilityState;
  accessibilityValue?: AccessibilityValue;
  accessibilityRoleDescription?: string;
  accessibilityElementsHidden?: boolean;
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants';
};

/**
 * A hook that generates standard React Native accessibility props from a semantic configuration.
 * It also enforces accessibility rules based on the active configuration (e.g., WCAG AAA checks).
 * 
 * @param {QPA11YAccessibilityComponentProps & { children?: unknown }} props - The semantic accessibility properties.
 * @returns {QPA11YAccessibilityPropsResult} The React Native accessibility props to spread onto your component.
 * 
 * @example
 * const a11yProps = useAccessibilityProps({
 *   role: 'button',
 *   label: 'Submit Form',
 *   state: { disabled: isLoading }
 * });
 * 
 * return <TouchableOpacity {...a11yProps} />;
 */
export const QPA11YUseAccessibilityProps = (props: QPA11YAccessibilityComponentProps & { children?: unknown }): QPA11YAccessibilityPropsResult => {
  const { config } = QPA11YUseAccessibility();
  const { role, label, hint, state, hidden, value, roleDescription, componentName } = props;

  // Rule: Requirement for Label on interactive elements (AAA)
  if (config.level === 'AAA') {
    if (role === 'button' && !label) {
       // Specifically checking explicit label requirement for 'button' role in strict mode
       QPA11YLoggerService.warn(`WCAG AAA: Buttons must have an accessible label.${componentName ? ` (Component: ${componentName})` : ''}`);
    }
  }

  // Construct accessibilityState
  const accessibilityState: AccessibilityState = {
    disabled: state?.disabled,
    selected: undefined, // RN uses 'selected' for tabs/selectable, 'checked' for checkboxes.
    checked: state?.checked,
    busy: state?.busy,
    expanded: state?.expanded,
  };

  // Map hidden to platform specific props
  let importantForAccessibility: 'auto' | 'yes' | 'no' | 'no-hide-descendants' = 'auto';
  if (hidden) {
    importantForAccessibility = 'no-hide-descendants';
  }

  return {
    accessible: !hidden,
    accessibilityRole: role as AccessibilityRole,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityState,
    accessibilityValue: value,
    accessibilityRoleDescription: roleDescription,
    accessibilityElementsHidden: hidden,
    importantForAccessibility,
  };
};

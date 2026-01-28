import { render } from '@testing-library/react-native';
import { QPA11YPressable } from '../../components/QPA11YPressable';
import { QPA11YView } from '../../components/QPA11YView';
import { QPA11YText } from '../../components/QPA11YText';
import { QPA11YAccessibilityProvider } from '../../context/AccessibilityContext';
import { QPA11YLoggerService } from '../../services/LoggerService';
import { Text } from 'react-native';

// Mock Logger
const warnSpy = jest.spyOn(QPA11YLoggerService, 'warn').mockImplementation(() => {});

describe('Runtime Validation Components', () => {
  beforeEach(() => {
    warnSpy.mockClear();
  });

  describe('QPA11YPressable', () => {
    it('should warn when role is button but no label is provided (AAA)', () => {
      render(
        <QPA11YAccessibilityProvider config={{ level: 'AAA', featureFlags: {} }}>
          <QPA11YPressable onPress={() => {}}>
            <Text>Click Me</Text>
          </QPA11YPressable>
        </QPA11YAccessibilityProvider>
      );

      expect(warnSpy).toHaveBeenCalledWith(
        'WCAG AAA: Buttons must have an accessible label. (Component: QPA11YPressable)'
      );
    });

    it('should NOT warn when label is provided', () => {
      render(
        <QPA11YAccessibilityProvider config={{ level: 'AAA', featureFlags: {} }}>
          <QPA11YPressable onPress={() => {}} label="Submit">
            <Text>Click Me</Text>
          </QPA11YPressable>
        </QPA11YAccessibilityProvider>
      );

      expect(warnSpy).not.toHaveBeenCalled();
    });
  });

  describe('QPA11YView', () => {
    it('should render children correctly', () => {
      const { getByText } = render(
        <QPA11YAccessibilityProvider>
          <QPA11YView>
            <Text>Content</Text>
          </QPA11YView>
        </QPA11YAccessibilityProvider>
      );

      expect(getByText('Content')).toBeTruthy();
    });
  });

    describe('QPA11YText', () => {
    it('should default to role="text"', () => {
      const { getByText } = render(
        <QPA11YAccessibilityProvider>
          <QPA11YText>Hello</QPA11YText>
        </QPA11YAccessibilityProvider>
      );

      const text = getByText('Hello');
      expect(text.props.accessibilityRole).toBe('text');
    });
  });
});

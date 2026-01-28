import { render, act } from '@testing-library/react-native';
import { QPA11YPressable } from '../../components/QPA11YPressable';
import { QPA11YView } from '../../components/QPA11YView';
import { QPA11YText } from '../../components/QPA11YText';
import { QPA11YImage } from '../../components/QPA11YImage';
import { QPA11YTextInput } from '../../components/QPA11YTextInput';
import { QPA11YSwitch } from '../../components/QPA11YSwitch';
import { QPA11YScrollView } from '../../components/QPA11YScrollView';
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
        'WCAG AAA: Elements with role "button" must have an accessible label. (Component: QPA11YPressable)'
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
    it('should default to role="text"', async () => {
      const { getByText } = render(
        <QPA11YAccessibilityProvider>
          <QPA11YText>Hello</QPA11YText>
        </QPA11YAccessibilityProvider>
      );
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      const text = getByText('Hello');
      expect(text.props.accessibilityRole).toBe('text');
    });
  });

  describe('QPA11YImage', () => {
    it('should warn when role is image but no label is provided (AAA)', () => {
      render(
        <QPA11YAccessibilityProvider config={{ level: 'AAA', featureFlags: {} }}>
          <QPA11YImage source={{ uri: 'http://example.com/image.png' }} />
        </QPA11YAccessibilityProvider>
      );
      expect(warnSpy).toHaveBeenCalledWith(
        'WCAG AAA: Elements with role "image" must have an accessible label. (Component: QPA11YImage)'
      );
    });
  });

  describe('QPA11YTextInput', () => {
    it('should pass accessibility props', () => {
      const { getByLabelText } = render(
        <QPA11YAccessibilityProvider>
          <QPA11YTextInput label="Username" />
        </QPA11YAccessibilityProvider>
      );
      expect(getByLabelText('Username')).toBeTruthy();
    });
  });

  describe('QPA11YSwitch', () => {
    it('should warn when role is switch but no label is provided (AAA)', () => {
      render(
        <QPA11YAccessibilityProvider config={{ level: 'AAA', featureFlags: {} }}>
          <QPA11YSwitch value={true} onValueChange={() => {}} />
        </QPA11YAccessibilityProvider>
      );
      expect(warnSpy).toHaveBeenCalledWith(
        'WCAG AAA: Elements with role "switch" must have an accessible label. (Component: QPA11YSwitch)'
      );
    });
  });

  describe('QPA11YScrollView', () => {
    it('should render children correctly', async () => {
      const { getByText } = render(
        <QPA11YAccessibilityProvider>
          <QPA11YScrollView>
            <QPA11YText>Scroll Content</QPA11YText>
          </QPA11YScrollView>
        </QPA11YAccessibilityProvider>
      );
       await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });
      expect(getByText('Scroll Content')).toBeTruthy();
    });
  });
});

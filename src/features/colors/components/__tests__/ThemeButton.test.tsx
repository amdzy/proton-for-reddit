import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';
import { useThemeStore } from '@/stores';
import { ThemeButton } from '../..';

describe('ThemeButton component', () => {
  it('renders', () => {
    const { getByTestId } = render(<ThemeButton theme="dark" active={false} />);
    expect(getByTestId('ThemeButton')).not.toBe(null);
  });

  it('renders with correct background color', () => {
    const { getByTestId } = render(<ThemeButton theme="dark" active={false} />);
    const theme = useThemeStore.getState().colors.dark;
    expect(getByTestId('boxes')).toHaveStyle({
      backgroundColor: theme.background,
    });
  });

  it('Have border when active', () => {
    const { getByTestId } = render(<ThemeButton theme="dark" active />);
    const theme = useThemeStore.getState().colors.dark;
    expect(getByTestId('boxes')).toHaveStyle({
      borderColor: theme.primary,
    });
  });

  it('Change theme on press', () => {
    const { getByTestId } = render(<ThemeButton theme="light" active />);
    fireEvent.press(getByTestId('ThemeButton'));
    const { theme } = useThemeStore.getState();
    expect(theme).toBe('light');
  });
});

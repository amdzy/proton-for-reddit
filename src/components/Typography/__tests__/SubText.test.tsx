import React from 'react';
import { render } from '@testing-library/react-native';
import { SubText } from '../SubText';
import { useThemeStore } from '@/stores';

describe('SubText component', () => {
  it('renders', () => {
    const { getByText } = render(<SubText>SubText</SubText>);
    expect(getByText('SubText')).not.toBe(null);
  });

  it('renders with the correct style', () => {
    const { getByText } = render(<SubText>Header</SubText>);
    const chosenTheme = useThemeStore.getState().theme;
    const theme = useThemeStore.getState().colors[chosenTheme];
    expect(getByText('Header')).toHaveStyle({
      fontSize: 14,
      color: theme.placeholder,
    });
  });
});

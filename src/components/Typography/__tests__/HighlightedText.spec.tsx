import React from 'react';
import { render } from '@testing-library/react-native';
import { HighlightedText } from '../HighlightedText';
import { useThemeStore } from '@/stores';

describe('HighlightedText component', () => {
  it('renders', () => {
    const { getByText } = render(<HighlightedText>Text</HighlightedText>);
    expect(getByText('Text')).not.toBe(null);
  });

  it('renders with the correct style', () => {
    const { getByText } = render(<HighlightedText>Text</HighlightedText>);
    const chosenTheme = useThemeStore.getState().theme;
    const theme = useThemeStore.getState().colors[chosenTheme];
    expect(getByText('Text')).toHaveStyle({
      fontSize: 14,
      color: theme.highlight,
    });
  });
});

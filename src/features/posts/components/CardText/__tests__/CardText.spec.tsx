import { render } from '@testing-library/react-native';
import React from 'react';
import { CardText } from '../CardText';
import { useThemeStore } from '@/stores';

describe('CardText component', () => {
  it('renders', () => {
    const { getByText } = render(<CardText text="cardtext" />);

    expect(getByText('cardtext')).not.toBe(null);
  });

  it('Have correct style', () => {
    const { getByText } = render(<CardText text="cardtext" />);
    const { fonts } = useThemeStore.getState();
    expect(getByText('cardtext')).toHaveStyle({
      padding: 8,
      borderRadius: 10,
      lineHeight: 20,
      fontSize: fonts.fontSize.content,
    });
  });
});

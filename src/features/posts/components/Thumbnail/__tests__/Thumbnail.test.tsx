import React from 'react';
import { render } from '@testing-library/react-native';
import { Thumbnail } from '../Thumbnail';

describe('Thumbnail component', () => {
  it('renders', () => {
    const { getByTestId } = render(<Thumbnail url="" />);
    expect(getByTestId('Thumbnail')).not.toBe(null);
  });
});

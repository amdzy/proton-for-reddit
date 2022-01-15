import React from 'react';
import { render } from '@testing-library/react-native';
import { Divider } from '../Divider';

describe('Divider component', () => {
  it('renders', () => {
    const { getByTestId } = render(<Divider />);
    expect(getByTestId('divider')).not.toBe(null);
  });

  it('renders horizontally', () => {
    const { getByTestId } = render(<Divider size={1} />);
    expect(getByTestId('divider')).toHaveStyle({ width: '100%', height: 1 });
  });

  it('renders vertically', () => {
    const { getByTestId } = render(<Divider size={1} vertical />);
    expect(getByTestId('divider')).toHaveStyle({ width: 1, height: '100%' });
  });
});

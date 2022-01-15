import React from 'react';
import { render } from '@testing-library/react-native';
import { Spacer } from '../Spacer';

describe('Spacer component', () => {
  it('renders', () => {
    const { getByTestId } = render(<Spacer size={1} />);
    expect(getByTestId('spacer')).not.toBe(null);
  });

  it('renders horizontally', () => {
    const { getByTestId } = render(<Spacer size={1} horizontal />);
    expect(getByTestId('spacer')).toHaveStyle({ width: 1, height: 'auto' });
  });

  it('renders vertically', () => {
    const { getByTestId } = render(<Spacer size={1} />);
    expect(getByTestId('spacer')).toHaveStyle({ width: 'auto', height: 1 });
  });

  it('return null if size is 0', () => {
    const { queryByTestId } = render(<Spacer size={0} />);
    expect(queryByTestId('spacer')).toBe(null);
  });
});

import { render } from '@testing-library/react-native';
import React from 'react';
import { Awards } from '../Awards';

const awards = [
  {
    id: '1',
    resized_static_icons: [{ url: 'sd' }, { url: 'dsf' }],
    count: 1,
  },
  {
    id: '2',
    resized_static_icons: [{ url: 'sd' }, { url: 'dsf' }],
    count: 4,
  },
] as any;

describe('Awards component', () => {
  it('return null if no awards', () => {
    const { queryByTestId } = render(<Awards awards={[]} />);

    expect(queryByTestId('Awards')).toBe(null);
  });

  it('renders awards', () => {
    const { queryByTestId, getByText } = render(<Awards awards={awards} />);

    expect(queryByTestId('Awards')).not.toBe(null);
  });

  it('show awards num', () => {
    const { getByText } = render(<Awards awards={awards} />);

    expect(getByText('x4')).not.toBe(null);
  });
});

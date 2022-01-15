import React from 'react';
import { render } from '@testing-library/react-native';
import { Icon } from '../Icon';

describe('Icon component', () => {
  it('renders', async () => {
    const { findByTestId } = render(
      <Icon icon="test-tube" color="black" size={24} />
    );
    expect(await findByTestId('icon')).not.toBe(null);
  });
});

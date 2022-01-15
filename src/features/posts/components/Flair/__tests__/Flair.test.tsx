import React from 'react';
import { render } from '@testing-library/react-native';
import { Flair } from '../Flair';

describe('Flair Component', () => {
  it('renders', () => {
    const { getByText } = render(
      <Flair tag="flair" color="light" bgColor="#FFFFFF" />
    );
    expect(getByText('flair')).not.toBe(null);
  });

  it('renders with the correct style', () => {
    const { getByText } = render(
      <Flair tag="flair" color="dark" bgColor="#FFFFFF" />
    );
    expect(getByText('flair')).toHaveStyle({
      backgroundColor: '#FFFFFF',
      color: '#000000',
    });
  });

  it('renders if no background color', () => {
    const { getByText } = render(
      <Flair tag="flair" color="light" bgColor={undefined} />
    );
    expect(getByText('flair')).toHaveStyle({
      backgroundColor: '#000000',
      color: '#FFFFFF',
    });
  });

  it('renders if no background color with correct color', () => {
    const { getByText } = render(
      <Flair tag="flair" color="dark" bgColor={undefined} />
    );
    expect(getByText('flair')).toHaveStyle({
      backgroundColor: '#FFFFFF',
      color: '#000000',
    });
  });
});

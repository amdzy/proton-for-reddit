import React from 'react';
import { render } from '@testing-library/react-native';
import { PostImage } from '../PostImage';

describe('PostImage Component', () => {
  it('renders', () => {
    const image = {
      url: '',
      width: 1024,
      height: 728,
    };
    const { getByTestId } = render(
      <PostImage url={image.url} width={image.width} height={image.height} />
    );
    expect(getByTestId('PostImage')).not.toBe(null);
  });

  it('renders with correct aspect ratio', () => {
    const image = {
      url: '',
      width: 1024,
      height: 728,
    };
    const { getByTestId } = render(
      <PostImage url={image.url} width={image.width} height={image.height} />
    );
    expect(getByTestId('PostImage')).toHaveStyle({
      aspectRatio: image.width / image.height,
    });
  });
});

import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { YoutubeImage } from '../YoutubeImage';

describe('YoutubeImage component', () => {
  let handlePress: jest.Mock;
  let getByText: any;
  let getByTestId: any;

  beforeEach(() => {
    handlePress = jest.fn();
    ({ getByText, getByTestId } = render(
      <YoutubeImage url="url" width={200} height={100} onPress={handlePress} />
    ));
  });

  it('renders', () => {
    expect(getByTestId('YoutubeImage')).not.toBe(null);
  });

  it('renders youtube tag', () => {
    expect(getByText('Youtube')).not.toBe(null);
  });

  it('handle press', () => {
    fireEvent.press(getByTestId('PostImage'));
    expect(handlePress).toBeCalled();
  });
});

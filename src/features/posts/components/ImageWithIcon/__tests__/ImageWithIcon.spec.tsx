import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ImageWithIcon } from '../ImageWithIcon';

describe('ImageWithIcon component', () => {
  let handlePress: jest.Mock;
  let getByTestId: any;

  beforeEach(() => {
    handlePress = jest.fn();
    ({ getByTestId } = render(
      <ImageWithIcon url="" width={100} height={200} onPress={handlePress} />
    ));
  });

  it('renders', () => {
    expect(getByTestId('ImageWithIcon')).not.toBe(null);
  });

  it('handle press', () => {
    fireEvent.press(getByTestId('PostImage'));
    expect(handlePress).toBeCalled();
  });
});

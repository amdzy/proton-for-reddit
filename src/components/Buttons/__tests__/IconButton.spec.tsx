import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { IconButton } from '../IconButton';

describe('IconButton component', () => {
  let handleClick: () => void;
  let getByTestId: any;

  beforeEach(() => {
    handleClick = jest.fn();
    ({ getByTestId } = render(
      <IconButton icon="test-tube" onPress={handleClick} />
    ));
  });

  it('renders', () => {
    expect(getByTestId('iconButton')).not.toBe(null);
  });

  it('calls the onpress handler', () => {
    fireEvent.press(getByTestId('iconButton'));
    expect(handleClick).toBeCalled();
  });
});

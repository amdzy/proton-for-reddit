import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button component', () => {
  let handleClick: () => void;
  let getByText: any;

  beforeEach(() => {
    handleClick = jest.fn();
    ({ getByText } = render(<Button text="button" onPress={handleClick} />));
  });

  it('renders', () => {
    expect(getByText('button')).not.toBe(null);
  });

  it('calls the onpress handler', () => {
    fireEvent.press(getByText('button'));
    expect(handleClick).toBeCalled();
  });
});

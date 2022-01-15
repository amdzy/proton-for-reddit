import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { RadioButton } from '../RadioButton';

describe('RadioButton component', () => {
  it('renders', () => {
    const { getByTestId } = render(<RadioButton />);
    expect(getByTestId('radiobutton')).not.toBe(null);
  });

  it('renders correctly unchecked', () => {
    const { getByTestId } = render(<RadioButton checked={false} />);
    expect(getByTestId('radiobutton')).toHaveStyle({
      backgroundColor: 'transparent',
    });
  });

  it('renders correctly checked', () => {
    const { getByTestId } = render(<RadioButton checked />);
    expect(getByTestId('radiobutton')).not.toHaveStyle({
      backgroundColor: 'transparent',
    });
  });

  it('it respond to click', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <RadioButton checked onValueChange={handleClick} />,
    );
    fireEvent.press(getByTestId('radiobutton'));
    expect(handleClick).toBeCalled();
  });

  it('it ignore click when passthrough', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <RadioButton
        checked
        onValueChange={handleClick}
        passThrough
      />,
    );
    fireEvent.press(getByTestId('radiobutton'));
    expect(handleClick).not.toBeCalled();
  });
});

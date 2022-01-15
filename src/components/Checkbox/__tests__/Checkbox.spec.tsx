import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Checkbox } from '../Checkbox';

describe('Checkbox Component', () => {
  it('renders', () => {
    const { getByTestId } = render(<Checkbox />);
    expect(getByTestId('checkbox')).not.toBe(null);
  });

  it('renders correctly unchecked', () => {
    const { getByTestId } = render(<Checkbox checked={false} />);
    expect(getByTestId('checkbox')).toHaveStyle({
      backgroundColor: 'transparent',
    });
  });

  it('renders correctly checked', () => {
    const { getByTestId } = render(<Checkbox checked />);
    expect(getByTestId('checkbox')).not.toHaveStyle({
      backgroundColor: 'transparent',
    });
  });

  it('it respond to click', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Checkbox checked onValueChange={handleClick} />,
    );
    fireEvent.press(getByTestId('checkbox'));
    expect(handleClick).toBeCalled();
  });

  it('it ignore click when passthrough', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Checkbox checked onValueChange={handleClick} passThrough />,
    );
    fireEvent.press(getByTestId('checkbox'));
    expect(handleClick).not.toBeCalled();
  });
});

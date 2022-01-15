import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ColorPicker } from '../ColorPicker';

describe('ColorPicker component', () => {
  let handleSubmit: jest.Mock;
  let handleClose: jest.Mock;
  let getByTestId: any;
  let getByText: any;
  const color = '#000000';

  beforeEach(() => {
    handleSubmit = jest.fn();
    handleClose = jest.fn()(
      ({ getByTestId, getByText } = render(
        <ColorPicker
          onClose={handleClose}
          onSubmit={handleSubmit}
          color={color}
          isOpen
        />
      ))
    );
  });

  it('renders', () => {
    expect(getByTestId('modal')).not.toBe(null);
  });

  it('close', () => {
    fireEvent.press(getByText('Cancel'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('preview the right color', () => {
    expect(getByTestId('previewBox')).toHaveStyle({ backgroundColor: color });
    fireEvent.changeText(getByTestId('colorInput'), '@23456');
    expect(getByTestId('previewBox')).toHaveStyle({ backgroundColor: color });
    fireEvent.changeText(getByTestId('colorInput'), '123456');
    expect(getByTestId('previewBox')).toHaveStyle({
      backgroundColor: '#123456',
    });
  });

  it('submit the right color', () => {
    fireEvent.press(getByText('Done'));
    expect(handleSubmit).toHaveBeenCalledWith(color);
    fireEvent.changeText(getByTestId('colorInput'), '123456');
    fireEvent.press(getByText('Done'));
    expect(handleSubmit).toHaveBeenCalledWith('#123456');
  });
});

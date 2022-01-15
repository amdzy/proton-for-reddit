import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { useFilterStore } from '@/stores';
import { FilterModal } from '..';

describe('FilterModal component', () => {
  let handleClose: () => void;
  let getByTestId: any;
  let getByText: any;

  beforeEach(() => {
    handleClose = () => {};
    ({ getByTestId, getByText } = render(
      <FilterModal type="flairs" onClose={handleClose} visible />
    ));
  });

  it('renders', () => {
    expect(getByTestId('modal')).not.toBe(null);
  });

  it('close correctly', () => {
    fireEvent.press(getByText('Cancel'));
    expect(handleClose).toBeCalled();
  });

  it('submit nothing if input is empty', () => {
    fireEvent.changeText(getByTestId('input'), '');
    fireEvent.press(getByText('Done'));
    const { flairs } = useFilterStore.getState();
    expect(flairs).toEqual([]);
  });

  it('submit input to the store', () => {
    fireEvent.changeText(getByTestId('input'), 'newFilter');
    fireEvent.press(getByText('Done'));
    const { flairs } = useFilterStore.getState();
    expect(flairs).toContain('newFilter');
  });

  it('submit nothing if input is already in store', () => {
    fireEvent.changeText(getByTestId('input'), 'newFilter');
    fireEvent.press(getByText('Done'));
    fireEvent.changeText(getByTestId('input'), 'newFilter');
    fireEvent.press(getByText('Done'));
    const { flairs } = useFilterStore.getState();
    expect(flairs).toHaveLength(1);
  });
});

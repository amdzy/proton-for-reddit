import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Stack } from '../Stack';

describe('Stack component', () => {
  let Component = (
    <Stack space={1}>
      <Text>Children</Text>
      <Text>Children</Text>
    </Stack>
  );

  it('renders', () => {
    const { getByTestId } = render(Component);
    expect(getByTestId('stack')).not.toBe(null);
  });

  it('renders children & spacers', () => {
    const { getAllByTestId, getAllByText } = render(Component);
    expect(getAllByTestId('spacer')).toHaveLength(2);
    expect(getAllByText('Children')).toHaveLength(2);
  });

  it('renders Childrens Vertically', () => {
    Component = (
      <Stack space={1} direction="row">
        <Text>Children</Text>
        <Text>Children</Text>
      </Stack>
    );
    const { getByTestId } = render(Component);
    expect(getByTestId('stack')).toHaveStyle({ flexDirection: 'row' });
  });

  it('renders without spacer when space is 0', () => {
    Component = (
      <Stack>
        <Text>Children</Text>
        <Text>Children</Text>
      </Stack>
    );
    const { queryAllByTestId } = render(Component);
    expect(queryAllByTestId('spacer')).toHaveLength(0);
  });
});

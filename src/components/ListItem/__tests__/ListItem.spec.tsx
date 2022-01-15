import React from 'react';
import { render } from '@testing-library/react-native';
import { ListItem } from '../ListItem';
import { Checkbox } from '@/components';

describe('ListItem component', () => {
  it('renders', () => {
    const { getByText } = render(<ListItem text="item" />);
    expect(getByText('item')).not.toBe(null);
  });

  it('renders subtext', () => {
    const { getByText } = render(<ListItem text="item" subText="subtext" />);
    expect(getByText('subtext')).not.toBe(null);
  });

  it('renders an icon', async () => {
    const { findByTestId } = render(
      <ListItem text="item" subText="subtext" icon="test-tube" />,
    );
    expect(await findByTestId('icon')).not.toBe(null);
  });

  it('renders spacer with correct size with no icon', () => {
    const { getByTestId } = render(<ListItem text="item" />);
    expect(getByTestId('spacer')).toHaveStyle({ width: 58 });
  });

  it('renders spacer with correct size with icon', () => {
    const { getByTestId } = render(<ListItem text="item" icon="test-tube" />);
    expect(getByTestId('spacer')).toHaveStyle({ width: 35 });
  });

  it('renders left item', () => {
    const { getByTestId } = render(
      <ListItem text="item" left={<Checkbox />} />,
    );
    expect(getByTestId('checkbox')).not.toBe(null);
  });

  it('renders right item', () => {
    const { getByTestId } = render(
      <ListItem text="item" right={<Checkbox />} />,
    );
    expect(getByTestId('checkbox')).not.toBe(null);
  });
});

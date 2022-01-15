import React from 'react';
import { render } from '@testing-library/react-native';
import { FlairList } from '../FlairList';

describe('FlairList Component', () => {
  it('renders', () => {
    const { getByText } = render(
      <FlairList
        tag="flair"
        color="light"
        bgColor="#FFFFFF"
        hint={undefined}
        isNsfw={false}
      />
    );
    expect(getByText('flair')).not.toBe(null);
  });

  it('renders link flair', () => {
    const { getByText } = render(
      <FlairList
        tag="flair"
        color="light"
        bgColor="#FFFFFF"
        hint="link"
        isNsfw={false}
      />
    );
    expect(getByText('LINK')).not.toBe(null);
  });

  it('renders link flair & passed tag', () => {
    const { getByText } = render(
      <FlairList
        tag="flair"
        color="light"
        bgColor="#FFFFFF"
        hint="link"
        isNsfw={false}
      />
    );
    expect(getByText('flair')).not.toBe(null);
    expect(getByText('LINK')).not.toBe(null);
  });

  it('renders nothing', () => {
    const { queryByText } = render(
      <FlairList
        tag={undefined}
        color="light"
        bgColor="#FFFFFF"
        hint={undefined}
        isNsfw={false}
      />
    );
    expect(queryByText('flair')).toBe(null);
    expect(queryByText('LINK')).toBe(null);
  });

  it('renders nsfw flair', () => {
    const { getByText } = render(
      <FlairList
        tag="flair"
        color="light"
        bgColor="#FFFFFF"
        hint="link"
        isNsfw
      />
    );
    expect(getByText('NSFW')).not.toBe(null);
  });
});

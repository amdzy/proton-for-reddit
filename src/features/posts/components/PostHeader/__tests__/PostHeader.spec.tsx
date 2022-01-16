import React from 'react';
import { render } from '@testing-library/react-native';
import { formatDistanceToNowStrict } from 'date-fns';
import { PostHeader } from '../PostHeader';

describe('PostHeader component', () => {
  let getByText: any;

  beforeEach(() => {
    ({ getByText } = render(
      <PostHeader
        subName="Subname"
        author="Author"
        createdAt={1642257113}
        sub="Sub"
      />
    ));
  });

  it('renders subname', () => {
    expect(getByText('Subname')).not.toBe(null);
  });

  it('showtime correctly', () => {
    const time = formatDistanceToNowStrict(1642257113 * 1000);
    expect(getByText(`${time} ago`)).not.toBe(null);
  });
});

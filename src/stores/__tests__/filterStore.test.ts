import { useFilterStore } from '..';

describe('Filter store', () => {
  it('Change post filters correctly', () => {
    const postFilters = useFilterStore.getState().posts;
    const { setPostsFilter } = useFilterStore.getState();

    setPostsFilter('nsfw');
    expect(useFilterStore.getState().posts.nsfw).toBe(!postFilters.nsfw);

    setPostsFilter('nsfw');
    expect(useFilterStore.getState().posts.nsfw).toBe(postFilters.nsfw);

    setPostsFilter('album');
    expect(useFilterStore.getState().posts.album).toBe(!postFilters.album);

    setPostsFilter('text');
    expect(useFilterStore.getState().posts.text).toBe(!postFilters.text);
  });

  it('Add filters', () => {
    const flairs = () => useFilterStore.getState().flairs;
    const keywords = () => useFilterStore.getState().keywords;
    const { addFilter } = useFilterStore.getState();

    addFilter('flairs', 'test');
    expect(flairs()).toHaveLength(1);
    expect(keywords()).toHaveLength(0);

    addFilter('keywords', 'test1');
    addFilter('keywords', 'test2');
    expect(flairs()).toHaveLength(1);
    expect(keywords()).toHaveLength(2);
    expect(keywords()).toContain('test1');
  });

  it('Remove filters', () => {
    const users = () => useFilterStore.getState().users;
    const { addFilter } = useFilterStore.getState();
    const { removeFilter } = useFilterStore.getState();

    addFilter('users', 'test');
    removeFilter('users', 'test');
    expect(users()).toHaveLength(0);

    addFilter('users', 'test1');
    addFilter('users', 'test2');
    removeFilter('users', 'test1');
    expect(users()).toHaveLength(1);
  });
});

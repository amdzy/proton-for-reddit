import { useSubStore } from '..';

describe('SubStore store', () => {
  it('add icon', () => {
    const { addIcon } = useSubStore.getState();
    const icon = 'icon';
    const sub = 'sub';
    addIcon(sub, icon);
    const { icons } = useSubStore.getState();
    expect(icons.has(sub)).toBe(true);
    expect(icons.get(sub)).toBe(icon);
  });
});

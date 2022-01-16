import { useSubIconStore } from '..';

describe('Subicon store', () => {
  it('add icon', () => {
    const { addIcon } = useSubIconStore.getState();
    const icon = 'icon';
    const sub = 'sub';
    addIcon(sub, icon);
    const { icons } = useSubIconStore.getState();
    expect(icons.has(sub)).toBe(true);
    expect(icons.get(sub)).toBe(icon);
  });
});

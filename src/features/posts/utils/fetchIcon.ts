import { useSubStore } from '@/stores';

export const fetchIcon = async (sub: string) => {
  try {
    const res = await fetch(
      `https://www.reddit.com/r/${sub}/about.json?raw_json=1`
    );
    const data = await res.json();
    const icon = data.data.icon_img || data.data.community_icon;
    const { addIcon } = useSubStore.getState();
    addIcon(sub, icon);
    return icon;
  } catch {
    return '';
  }
};

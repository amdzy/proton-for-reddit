export const appearance = [
  {
    text: 'Show user avatar',
    type: 'avatar',
  },
  {
    text: 'Buttons always visible',
    type: 'buttonsVisible',
  },
  {
    text: 'Highlight my username',
    type: 'highlightName',
  },
] as const;

export const awards = [
  {
    text: 'Show awards',
    type: 'awards',
  },
  {
    text: 'Clickable awards',
    type: 'tapAwards',
  },
] as const;

export const flairs = [
  {
    text: 'Show post flairs',
    type: 'flairs',
  },
] as const;

export const postInfo = [
  {
    text: "Show subreddit icon",
    type: "subIcon",
  },
  {
    text: "Show author",
    type: "author",
  },
  {
    text: "Tap subreddit to visit",
    type: "tapSub",
  },
  {
    text: "Tap username to view profile",
    type: "tapUser",
  },
] as const;

export const awards = [
  {
    text: "Show awards",
    type: "awards",
  },
] as const;

export const flairs = [
  {
    text: "Show post flairs",
    type: "flairs",
  },
] as const;

export const markRead = [
  {
    text: "Mark as read",
    subText: "Clicking on a post will mark as read",
    type: "markRead",
  },
  {
    text: "Hide read",
    subText: "hide posts you have read before",
    type: "hideRead",
  },
] as const;

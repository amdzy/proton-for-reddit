export const postInfo = [
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
  {
    text: "Clickable awards",
    type: "tapAwards",
  },
] as const;

export const flairs = [
  {
    text: "Show post flairs",
    type: "flairs",
  },
  {
    text: "Show flair colors",
    type: "flairsColor",
  },
] as const;

export const visibleButtons = [
  {
    text: "Mark as read",
    type: "read",
    icon: "check",
  },
  {
    text: "Share",
    type: "share",
    icon: "share-variant",
  },
  {
    text: "Comments",
    type: "comments",
    icon: "comment-outline",
  },
  {
    text: "Favourite",
    type: "favourite",
    icon: "star",
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
    subText: 'Pressing "Hide read" will hide posts',
    type: "hideRead",
  },
  {
    text: "Dim images in read posts",
    subText: "Post images will be dimmed when marked as read",
    type: "dimImage",
  },
] as const;

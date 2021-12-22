import create from "zustand";
import produce from "immer";

interface StoreProps {
  posts: {
    images: boolean;
    album: boolean;
    gif: boolean;
    video: boolean;
    link: boolean;
    text: boolean;
    nsfw: boolean;
    blurNsfw: boolean;
  };
  flairs: string[];
  keywords: string[];
  users: string[];
  subreddit: string[];
  setPostsFilter: (type: string) => void;
}

export const useFilterStore = create<StoreProps>((set, get) => ({
  posts: {
    images: true,
    album: true,
    gif: true,
    video: true,
    link: true,
    text: true,
    nsfw: true,
    blurNsfw: true,
  },
  flairs: [],
  keywords: [],
  users: [],
  subreddit: [],
  setPostsFilter: (type) =>
    set(
      produce((state) => {
        state.posts[type] = !state.posts[type];
      })
    ),
}));

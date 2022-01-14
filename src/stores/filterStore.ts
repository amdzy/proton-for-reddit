import create from "zustand";
import produce from "immer";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  subs: string[];
  setPostsFilter: (type: string) => void;
  addFilter: (type: string, value: string) => void;
  removeFilter: (type: string, value: string) => void;
}

export const useFilterStore = create<StoreProps>(
  persist(
    (set, get) => ({
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
      subs: [],
      setPostsFilter: (type) =>
        set(
          produce((state) => {
            state.posts[type] = !state.posts[type];
          })
        ),
      addFilter: (type, value) =>
        set(
          produce((state) => {
            state[type].push(value);
          })
        ),
      removeFilter: (type, value) =>
        set(
          produce((state) => {
            state[type] = state[type].filter((x: string) => x !== value);
          })
        ),
    }),
    {
      name: "filterStore",
      getStorage: () => AsyncStorage,
    }
  )
);

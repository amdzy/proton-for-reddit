import create from "zustand";
import produce from "immer";

interface StoreProps {
  notifications: {
    enabled: boolean;
    interval: {
      value: number;
      text: string;
    };
  };
  dataSaver: boolean;
  videos: {
    mute: boolean;
    loop: boolean;
  };
  posts: {
    sort: string;
    author: boolean;
    tapSub: boolean;
    tapUser: boolean;
    awards: boolean;
    tapAwards: boolean;
    flairs: boolean;
    flairsColor: boolean;
    buttons: {
      read: boolean;
      share: boolean;
      comments: boolean;
      favourite: boolean;
    };
    markRead: boolean;
    hideRead: boolean;
    dimImage: boolean;
  };
  comments: {
    sort: string;
    avatar: boolean;
    buttonsVisible: boolean;
    highlightName: boolean;
    awards: boolean;
    tapAwards: boolean;
    flairs: boolean;
    flairsColor: boolean;
  };
  card: {
    fullHeight: boolean;
    subIcon: boolean;
    carousel: boolean;
    previewText: boolean;
  };
  setNotifications: () => void;
  setNotificationsInterval: (text: string, value: number) => void;
  setDataSaver: () => void;
  setVideoSettings: (type: string) => void;
  setPostSort: (val: string) => void;
  setPostSettings: (type: string) => void;
  setCommentSort: (val: string) => void;
  setCommentSettings: (type: string) => void;
  setCardSettings: (type: string) => void;
}

export const useSettingsStore = create<StoreProps>((set) => ({
  notifications: {
    enabled: true,
    interval: {
      value: 10000,
      text: "1 Sec",
    },
  },
  setNotifications: () =>
    set(
      produce((state) => {
        state.notifications.enabled = !state.notifications.enabled;
      })
    ),
  setNotificationsInterval: (text, value) =>
    set(
      produce((state) => {
        state.notifications.interval.text = text;
        state.notifications.interval.value = value;
      })
    ),

  dataSaver: true,
  setDataSaver: () => set((state) => ({ dataSaver: !state.dataSaver })),

  videos: {
    mute: false,
    loop: false,
  },
  setVideoSettings: (type) =>
    set(
      produce((state) => {
        state.videos[type] = !state.videos[type];
      })
    ),

  posts: {
    sort: "hot",
    author: true,
    tapSub: true,
    tapUser: true,
    awards: true,
    tapAwards: true,
    flairs: true,
    flairsColor: true,
    buttons: {
      read: false,
      share: true,
      comments: true,
      favourite: true,
    },
    markRead: true,
    hideRead: false,
    dimImage: false,
  },
  setPostSort: (value) =>
    set(
      produce((state) => {
        state.posts.sort = value;
      })
    ),
  setPostSettings: (type) =>
    set(
      produce((state) => {
        if (state.posts.buttons[type] !== undefined) {
          state.posts.buttons[type] = !state.posts.buttons[type];
        }
        state.posts[type] = !state.posts[type];
      })
    ),

  comments: {
    sort: "hot",
    avatar: false,
    buttonsVisible: false,
    highlightName: true,
    awards: true,
    tapAwards: true,
    flairs: true,
    flairsColor: true,
  },
  setCommentSort: (value) =>
    set(
      produce((state) => {
        state.comments.sort = value;
      })
    ),
  setCommentSettings: (type) =>
    set(
      produce((state) => {
        state.comments[type] = !state.comments[type];
      })
    ),

  card: {
    fullHeight: true,
    subIcon: true,
    carousel: true,
    previewText: true,
  },
  setCardSettings: (type) =>
    set(
      produce((state) => {
        state.card[type] = !state.card[type];
      })
    ),
}));

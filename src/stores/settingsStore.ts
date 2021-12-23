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
  setNotifications: () => void;
  setNotificationsInterval: (text: string, value: number) => void;
}

export const useSettingsStore = create<StoreProps>((set, get) => ({
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
}));

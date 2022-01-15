import { nanoid } from 'nanoid/non-secure';
import create from 'zustand';

export type Toast = {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  text: string;
};

interface StoreState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}

export const useToastStore = create<StoreState>((set) => ({
  toasts: [],
  addToast: (toast) => set((state) => ({
    toasts: [...state.toasts, { id: nanoid(), ...toast }],
  })),
  dismissToast: (id) => set((state) => ({
    toasts: state.toasts.filter((toast) => toast.id !== id),
  })),
}));

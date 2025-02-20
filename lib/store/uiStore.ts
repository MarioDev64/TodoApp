import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info';

interface UIState {
  toast: {
    message: string;
    type: ToastType;
    visible: boolean;
  };
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
  deleteConfirmation: {
    visible: boolean;
    onConfirm: () => void;
    title?: string;
    message?: string;
  };
  showDeleteConfirmation: (params: {
    onConfirm: () => void;
    title?: string;
    message?: string;
  }) => void;
  hideDeleteConfirmation: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  toast: {
    message: '',
    type: 'info',
    visible: false,
  },
  showToast: (message, type) =>
    set({
      toast: {
        message,
        type,
        visible: true,
      },
    }),
  hideToast: () =>
    set((state) => ({
      toast: {
        ...state.toast,
        visible: false,
      },
    })),
  deleteConfirmation: {
    visible: false,
    onConfirm: () => {},
    title: undefined,
    message: undefined,
  },
  showDeleteConfirmation: ({ onConfirm, title, message }) =>
    set({
      deleteConfirmation: {
        visible: true,
        onConfirm,
        title,
        message,
      },
    }),
  hideDeleteConfirmation: () =>
    set({
      deleteConfirmation: {
        visible: false,
        onConfirm: () => {},
        title: undefined,
        message: undefined,
      },
    }),
}));
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleNotifications: () => void;
  clearAllData: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      notificationsEnabled: true,
      setTheme: (theme) => set({ theme }),
      toggleNotifications: () => 
        set((state) => ({ 
          notificationsEnabled: !state.notificationsEnabled 
        })),
      clearAllData: () => set({ theme: 'light', notificationsEnabled: true }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
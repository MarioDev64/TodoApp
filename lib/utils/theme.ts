import { useColorScheme } from 'react-native';
import { useSettingsStore } from '@/lib/store/settingsStore';

export function useAppTheme() {
  const systemTheme = useColorScheme();
  const { theme } = useSettingsStore();
  
  return {
    isDarkMode: theme === 'system' ? systemTheme === 'dark' : theme === 'dark',
    colors: {
      background: theme === 'dark' ? '#1a1a1a' : '#f9fafb',
      card: theme === 'dark' ? '#2d2d2d' : '#ffffff',
      text: theme === 'dark' ? '#ffffff' : '#000000',
      border: theme === 'dark' ? '#404040' : '#e5e7eb',
      primary: '#3b82f6',
      error: '#ef4444',
      success: '#10b981',
    },
  };
}
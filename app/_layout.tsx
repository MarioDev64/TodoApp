import { Stack } from 'expo-router';
import { useColorScheme, useInitialAndroidBarSync } from '@/theme/useColorScheme';
import { screenAnimations } from '@/lib/utils/animations';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { NAV_THEME } from '@/theme';
import { StatusBar } from 'expo-status-bar';
import { ThemeToggle } from '@/components/nativewindui/ThemeToggle';
import { Toast } from '@/components/Toast';
import { DeleteConfirmation } from '@/components/DeleteConfirmation';
import { useUIStore } from '@/lib/store/uiStore';
import '@/global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme } = useColorScheme();
  const toast = useUIStore((state) => state.toast);
  const hideToast = useUIStore((state) => state.hideToast);
  const deleteConfirmation = useUIStore((state) => state.deleteConfirmation);
  const hideDeleteConfirmation = useUIStore((state) => state.hideDeleteConfirmation);

  return (
    <>
      <StatusBar
        key={`root-status-bar-${colorScheme ? 'light' : 'dark'}`}
        style={colorScheme ? 'light' : 'dark'}
      />
      
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavThemeProvider value={NAV_THEME[colorScheme]}>
          <Stack
            screenOptions={{
              headerRight: () => <ThemeToggle />,
              ...screenAnimations,
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: '',
              }}
            />
            <Stack.Screen
              name="settings"
              options={{
                title: 'Settings',
              }}
            />
            <Stack.Screen
              name="modals/create-task"
              options={{
                presentation: 'modal',
                title: 'Create Task',
              }}
            />
            <Stack.Screen
              name="modals/edit-task/[id]"
              options={{
                presentation: 'modal',
                title: 'Edit Task',
              }}
            />
          </Stack>

          {toast.visible && (
            <Toast
              message={toast.message}
              type={toast.type}
              onDismiss={hideToast}
            />
          )}

          {deleteConfirmation.visible && (
            <DeleteConfirmation
              onConfirm={() => {
                deleteConfirmation.onConfirm();
                hideDeleteConfirmation();
              }}
              onCancel={hideDeleteConfirmation}
              title={deleteConfirmation.title}
              message={deleteConfirmation.message}
            />
          )}
        </NavThemeProvider>
      </GestureHandlerRootView>
    </>
  );
}
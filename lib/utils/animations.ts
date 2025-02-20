
import { Easing } from 'react-native';
import type { StackNavigationOptions } from '@react-navigation/stack';
import { requestNotificationsPermissions } from './notifications';
import { useUIStore } from '@/lib/store/uiStore';

export const screenAnimations: Pick<StackNavigationOptions, 'transitionSpec' | 'cardStyleInterpolator'> = {
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.bezier(0.2, 0.2, 0.38, 0.9),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.bezier(0.2, 0.2, 0.38, 0.9),
      },
    },
  },
  cardStyleInterpolator: ({ current, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
      ],
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
    },
  }),
};

export async function initializeNotifications() {
    try {
      const permissionGranted = await requestNotificationsPermissions();
      if (!permissionGranted) {
        useUIStore.getState().showToast(
          'Notifications permission denied',
          'error'
        );
        return false;
      }
      return true;
    } catch (error) {
      useUIStore.getState().showToast(
        'Failed to initialize notifications',
        'error'
      );
      return false;
    }
}
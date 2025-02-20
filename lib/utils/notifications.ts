import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useUIStore } from '../store/uiStore';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationsPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  return true;
}

export async function scheduleTaskNotification(
    taskId: string,
    title: string,
    expirationTime: string
  ) {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Task Reminder',
          body: `The task "${title}" is due now!`,
          data: { taskId },
        },
        trigger: getNotificationTrigger(expirationTime),
        identifier: taskId,
      });
      return notificationId;
    } catch (error) {
      useUIStore.getState().showToast(
        'Failed to schedule notification',
        'error'
      );
      return null;
    }
  }

export async function cancelTaskNotification(taskId: string) {
  await Notifications.cancelScheduledNotificationAsync(taskId);
}

function getNotificationTrigger(expirationTime: string): Notifications.NotificationTriggerInput {
  // Parse the HH:mm format
  const [hours, minutes] = expirationTime.split(':').map(Number);
  
  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(hours, minutes, 0, 0);
  
  // If the time has already passed today, schedule for tomorrow
  if (scheduledTime < now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }
  
  return {
    type: Notifications.SchedulableTriggerInputTypes.DATE,
    date: scheduledTime,
  };
}

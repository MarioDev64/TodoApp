import React from 'react';
import { View, Switch, Pressable, Alert } from 'react-native';
import { Text } from '@/components/nativewindui/Text';
import { Bell, Trash2 } from 'lucide-react-native';
import { useSettingsStore } from '@/lib/store/settingsStore';
import { useTaskStore } from '@/lib/store/taskStore';

export default function SettingsScreen() {
  const { 
    theme, 
    setTheme, 
    notificationsEnabled, 
    toggleNotifications,
    clearAllData 
  } = useSettingsStore();
  
  const clearTasks = useTaskStore((state) => state.clearTasks);

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all tasks and reset settings? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            clearAllData();
            clearTasks();
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-lg text-gray-900 font-semibold mt-6 mb-4">Notifications</Text>
        <View className="bg-white rounded-lg">
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <Bell size={24} className="text-gray-600" />
              <Text className="text-gray-900 ml-3">Enable Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
            />
          </View>
        </View>

        <Text className="text-lg text-gray-900 font-semibold mt-6 mb-4">Data</Text>
        <View className="bg-white rounded-lg">
          <Pressable
            onPress={handleClearData}
            className="flex-row items-center justify-between p-4"
          >
            <View className="flex-row items-center">
              <Trash2 size={24} className="text-red-500" />
              <Text className="ml-3 text-red-500">Clear All Data</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
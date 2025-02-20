import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/nativewindui/Text';
import { useAppTheme } from '@/lib/utils/theme';

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

export function DeleteConfirmation({
  onConfirm,
  onCancel,
  title = 'Delete Task',
  message = 'Are you sure you want to delete this task? This action cannot be undone.',
}: DeleteConfirmationProps) {
  const { colors } = useAppTheme();

  return (
    <View className="p-4 rounded-lg" style={{ backgroundColor: colors.card }}>
      <Text className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
        {title}
      </Text>
      <Text className="mb-4" style={{ color: colors.text }}>
        {message}
      </Text>
      <View className="flex-row justify-end space-x-3">
        <Pressable
          onPress={onCancel}
          className="px-4 py-2 rounded-md"
          style={{ backgroundColor: colors.border }}
        >
          <Text style={{ color: colors.text }}>Cancel</Text>
        </Pressable>
        <Pressable
          onPress={onConfirm}
          className="px-4 py-2 rounded-md bg-red-500"
        >
          <Text className="text-white">Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}
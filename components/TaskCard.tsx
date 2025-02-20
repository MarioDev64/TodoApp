import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/nativewindui/Text';
import { formatDistanceToNow } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react-native';
import type { Task } from '@/lib/store/taskStore';
import { Button } from '@/components/nativewindui/Button';
import { useColorScheme } from '@/theme/useColorScheme';
import { COLORS } from '@/theme/colors';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskCardProps) {
  const { colorScheme } = useColorScheme();
  const timeAgo = formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true });
  const isUpdated = task.createdAt !== task.updatedAt;

  const colors = COLORS[colorScheme];

  return (
    <View
      className={`p-4 mx-4 mb-4 rounded-lg border ${
        colorScheme === 'dark'
          ? 'bg-card border-border'
          : 'bg-white border-gray-200'
      }`}
    >
      <View className="flex-row items-center">
        <Pressable
          onPress={onToggleComplete}
          className="mr-4"
        >
          <View
            className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
              task.completed
                ? 'bg-primary border-primary'
                : 'border-gray-300'
            }`}
          >
            {task.completed && (
              <Text className="text-white text-xs">✓</Text>
            )}
          </View>
        </Pressable>

        <View className="flex-1">
          <Text
            variant="heading"
            className={`${task.completed ? 'text-muted-foreground line-through' : ''}`}
          >
            {task.title}
          </Text>

          {task.description ? (
            <Text
              variant="body"
              className={`mt-2 ${task.completed ? 'text-muted-foreground line-through' : ''}`}
              numberOfLines={2}
            >
              {task.description}
            </Text>
          ) : null}

          <View className="flex-row items-center mt-3space-x-2">
            <Text variant="caption1" className="text-muted-foreground">
              {isUpdated ? `Updated ${timeAgo}` : `Created ${timeAgo}`}
            </Text>

            {task.expirationTime && (
              <>
                <View className="w-1 h-1 rounded-full mx-2 bg-muted-foreground" />
                <Text variant="caption1" className="text-primary">
                  Due at {task.expirationTime}
                </Text>
              </>
            )}
          </View>
        </View>

        <View className="flex-row ml-4 gap-1 space-x-2">
          <Button
            onPress={onEdit}
            className="w-10 h-10 rounded-lg"
            style={{ backgroundColor: colors.grey5 }}
          >
            <Pencil size={18} color={colors.primary} />
          </Button>
          <Button
            onPress={onDelete}
            className="w-10 h-10 rounded-lg"
            style={{ backgroundColor: colors.destructive }}
          >
            <Trash2 size={18} color={"#FFF"} />
          </Button>
        </View>
      </View>
    </View>
  );
}
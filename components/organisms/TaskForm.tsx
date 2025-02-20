import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Text } from '@/components/nativewindui/Text';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, TaskFormData, formatTimeFromParts, parseTimeString } from '@/lib/validations/taskSchema';
import { useColorScheme } from '@/theme/useColorScheme';
import type { Task } from '@/lib/store/taskStore';
import { COLORS } from '@/theme/colors';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  initialData?: Task;
}

export default function TaskForm({ onSubmit, onCancel, initialData }: TaskFormProps) {
  const { colorScheme } = useColorScheme();
  const colors = COLORS[colorScheme];

  const initialTime = parseTimeString(initialData?.expirationTime);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      hours: initialTime.hours,
      minutes: initialTime.minutes,
    },
  });

  const description = watch('description');
  const charCount = description?.length || 0;

  const handleFormSubmit = (data: TaskFormData) => {
    const formattedTime = formatTimeFromParts(data.hours, data.minutes);
    onSubmit({
      ...data,
      expirationTime: formattedTime,
    });
  };

  const inputClassName = `w-full px-4 py-3 rounded-xl border ${
    colorScheme
      ? 'bg-card border-border text-foreground'
      : 'bg-white border-gray-200 text-black'
  } focus:border-primary`;

  const timeInputClassName = `w-24 px-4 py-3 rounded-xl border ${
    colorScheme
      ? 'bg-card border-border text-foreground'
      : 'bg-white border-gray-200 text-black'
  } focus:border-primary`;

  const labelClassName = "text-sm font-medium text-foreground mb-2";

  return (
    <View className="p-6">
      {/* Title and Description fields remain the same */}
      <View className="mb-6">
        <Text variant="subhead" className={labelClassName}>
          Task Title *
        </Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={inputClassName}
              onChangeText={onChange}
              value={value}
              placeholder="Enter task title"
              placeholderTextColor={colors.grey}
            />
          )}
        />
        {errors.title && (
          <Text variant="caption2" className="text-destructive mt-2">
            {errors.title.message}
          </Text>
        )}
      </View>

      <View className="mb-6">
        <Text variant="subhead" className={labelClassName}>
          Description
        </Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                className={`${inputClassName} min-h-32`}
                onChangeText={(text) => {
                  if (text.length <= 400) {
                    onChange(text);
                  }
                }}
                value={value}
                placeholder="Enter task description"
                placeholderTextColor={colors.grey}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <Text variant="caption2" className="text-muted-foreground mt-2 text-right">
                {charCount}/400 characters
              </Text>
            </View>
          )}
        />
        {errors.description && (
          <Text variant="caption2" className="text-destructive mt-2">
            {errors.description.message}
          </Text>
        )}
      </View>

      {/* New Time Input Section */}
      <View className="mb-8">
        <Text variant="subhead" className={labelClassName}>
          Due Time
        </Text>
        <View className="flex-row items-center space-x-4">
          <View className="flex-1">
            <Text variant="caption1" className="text-muted-foreground mb-2">
              Hours (0-23)
            </Text>
            <Controller
              control={control}
              name="hours"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={timeInputClassName}
                  onChangeText={(text) => onChange(text ? parseInt(text, 10) : undefined)}
                  value={value?.toString() || ''}
                  placeholder="00"
                  placeholderTextColor={colors.grey}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              )}
            />
            {errors.hours && (
              <Text variant="caption2" className="text-destructive mt-2">
                {errors.hours.message}
              </Text>
            )}
          </View>

          <View className="flex-1">
            <Text variant="caption1" className="text-muted-foreground mb-2">
              Minutes (1-59)
            </Text>
            <Controller
              control={control}
              name="minutes"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={timeInputClassName}
                  onChangeText={(text) => onChange(text ? parseInt(text, 10) : undefined)}
                  value={value?.toString() || ''}
                  placeholder="00"
                  placeholderTextColor={colors.grey}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              )}
            />
            {errors.minutes && (
              <Text variant="caption2" className="text-destructive mt-2">
                {errors.minutes.message}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View className="flex-row justify-end space-x-4 gap-2">
        <Pressable
          onPress={onCancel}
          className={`px-6 py-3 rounded-xl border ${
            colorScheme ? 'border-border' : 'border-gray-200'
          }`}
        >
          <Text className="font-medium text-gray-800">Cancel</Text>
        </Pressable>
        <Pressable
          onPress={handleSubmit(handleFormSubmit)}
          className="px-6 py-3 rounded-xl bg-primary"
        >
          <Text className="text-white font-medium">{initialData ? 'Update' : 'Create'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
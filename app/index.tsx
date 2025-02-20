import React from 'react';
import { View } from 'react-native';
import { useTaskStore } from '@/lib/store/taskStore';
import TaskList from '@/components/organisms/TaskList';

export default function HomeScreen() {
  const { tasks, reorderTasks, toggleTaskComplete, deleteTask } = useTaskStore();

  return (
    <View className="flex-1 bg-gray-50">
      <TaskList
        tasks={tasks}
        onReorder={reorderTasks}
        onDeleteTask={deleteTask}
        onToggleComplete={toggleTaskComplete}
      />
    </View>
  );
}
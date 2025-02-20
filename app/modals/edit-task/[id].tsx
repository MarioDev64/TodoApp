import { Alert, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import TaskForm from '@/components/organisms/TaskForm';
import { useTaskStore } from '@/lib/store/taskStore';
import { TaskFormData } from '@/lib/validations/taskSchema';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, updateTask } = useTaskStore();
  
  const task = tasks.find(t => t.id === id);
  
  if (!task) {
    Alert.alert('Error', 'Task not found');
    router.back();
    return null;
  }

  const handleSubmit = (data: TaskFormData) => {
    updateTask(id, {
      title: data.title,
      description: data.description || '',
      expirationTime: data.expirationTime || '',
    });
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
      <TaskForm
        initialData={task}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </View>
  );
}
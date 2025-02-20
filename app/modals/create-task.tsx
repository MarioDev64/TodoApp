import { View } from 'react-native';
import { router } from 'expo-router';
import TaskForm from '@/components/organisms/TaskForm';
import { useTaskStore } from '@/lib/store/taskStore';
import { TaskFormData } from '@/lib/validations/taskSchema';
import { useUIStore } from '@/lib/store/uiStore';

export default function CreateTaskScreen() {
  const { addTask } = useTaskStore();
  const { showToast } = useUIStore();

  const handleSubmit = (data: TaskFormData) => {
    try {
      addTask({
        title: data.title,
        description: data.description || '',
        expirationTime: data.expirationTime || '',
        completed: false,
      });
      
      showToast('Task created successfully', 'success');
      router.back();
    } catch (error) {
      console.error('Error creating task:', error);
      showToast('Error creating task', 'error');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </View>
  );
}
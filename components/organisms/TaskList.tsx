import React, { useCallback, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/nativewindui/Text';
import DragList, { DragListRenderItemInfo } from 'react-native-draglist';
import { Plus, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import TaskCard from '@/components/TaskCard';
import { Task } from '@/lib/store/taskStore';

interface TaskListProps {
  tasks: Task[];
  onReorder: (tasks: Task[]) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export default function TaskList({
  tasks,
  onReorder,
  onDeleteTask,
  onToggleComplete
}: TaskListProps) {
  const router = useRouter();

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [tasks]);

  const renderItem = useCallback(
    (info: DragListRenderItemInfo<Task>) => {
      const { item, onDragStart, onDragEnd } = info;
      if (!item?.id) return null;

      return (
        <TouchableOpacity
          onPressIn={onDragStart}
          onPressOut={onDragEnd}
          activeOpacity={0.8}
        >
          <TaskCard
            task={item}
            onEdit={() => {
              router.push({
                pathname: '/modals/edit-task/[id]',
                params: { id: item.id }
              });
            }}
            onDelete={() => onDeleteTask(item.id)}
            onToggleComplete={() => onToggleComplete(item.id)}
          />
        </TouchableOpacity>
      );
    },
    [router, onDeleteTask, onToggleComplete]
  );

  const handleReordered = useCallback(
    (fromIndex: number, toIndex: number) => {
      const newTasks = [...sortedTasks];
      const [movedItem] = newTasks.splice(fromIndex, 1);
      newTasks.splice(toIndex, 0, movedItem);

      // Update the property "order" for each task
      const reorderedTasks = newTasks.map((task, index) => ({
        ...task,
        order: index
      }));

      onReorder(reorderedTasks);
    },
    [sortedTasks, onReorder]
  );

  if (!sortedTasks.length) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        <Header />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <Text style={{ color: '#6b7280', textAlign: 'center' }}>
            No tasks yet. Tap the + button to create one!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <Header />
      <DragList
        data={sortedTasks}
        keyExtractor={(item: any) => item.id}
        onReordered={handleReordered}
        renderItem={renderItem}
        style={{ flexGrow: 1 }}
      />
    </View>
  );
}

function Header() {
  const router = useRouter();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e5e7eb', marginBottom: 8 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: '600', color: "#000" }}>My Tasks</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <TouchableOpacity
          onPress={() => router.push('/settings')}
          style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
        >
          <Settings size={24} color="#6b7280" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/modals/create-task')}
          style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3b82f6' }}
        >
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

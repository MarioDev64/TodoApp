import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { scheduleTaskNotification, cancelTaskNotification } from '@/lib/utils/notifications';
import { useSettingsStore } from './settingsStore';

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  expirationTime: string;
  completed: boolean;
  order: number;
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;
  toggleTaskComplete: (id: string) => void;
  clearTasks: () => void;
}

// Helper function to print the current log state
const logState = (message: string, tasks: Task[]) => {
  console.log(`[TaskStore] ${message}`, {
    tasksCount: tasks.length,
    tasks: tasks
  });
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: async (newTask) => {
        console.log('[TaskStore] Adding new task:', newTask);
        
        const now = new Date().toISOString();
        const task: Task = {
          ...newTask,
          id: Date.now().toString(),
          createdAt: now,
          updatedAt: now,
          order: get().tasks.length,
        };

        set((state) => {
          const newTasks = [...state.tasks, task];
          logState('After adding task', newTasks);
          return { tasks: newTasks };
        });

        // Verify if the task was added correctly
        const currentState = get();
        console.log('[TaskStore] State after adding task:', currentState);

        if (useSettingsStore.getState().notificationsEnabled && task.expirationTime) {
          await scheduleTaskNotification(task.id, task.title, task.expirationTime);
        }
      },
      updateTask: async (id, updatedTask) => {
        set((state) => {
          const newTasks = state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() }
              : task
          );

          return { tasks: newTasks };
        });
      },
      deleteTask: async (id) => {
        const currentTasks = get().tasks;
        const deletedTask = currentTasks.find(task => task.id === id);

        if (!deletedTask) {
          console.log('[TaskStore] Task not found:', id);
          return;
        }

        const updatedTasks = currentTasks
          .filter(task => task.id !== id)
          .map(task => ({
            ...task,
            order: task.order > deletedTask.order ? task.order - 1 : task.order
          }));

        set({ tasks: updatedTasks });
        await cancelTaskNotification(id);
      },
      reorderTasks: (newOrderedTasks) => {
        if (!Array.isArray(newOrderedTasks) || !newOrderedTasks.every(task => task && task.id)) {
          console.error('[TaskStore] Invalid tasks array for reordering');
          return;
        }

        const updatedTasks = newOrderedTasks.map((task, index) => ({
          ...task,
          order: index,
          updatedAt: new Date().toISOString()
        }));

        set({ tasks: updatedTasks });
      },
      toggleTaskComplete: (id) => {
        set((state) => {
          const newTasks = state.tasks.map((task) =>
            task.id === id
              ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
              : task
          );
          logState('After toggling task completion', newTasks);
          return { tasks: newTasks };
        });
      },
      clearTasks: async () => {
        const currentTasks = get().tasks;
        await Promise.all(currentTasks.map(task => cancelTaskNotification(task.id)));
        set({ tasks: [] });
      },
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
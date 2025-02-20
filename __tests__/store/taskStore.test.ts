import { useTaskStore } from '@/lib/store/taskStore';
import { act } from '@testing-library/react-native';

describe('TaskStore', () => {
  // Clear the store before each test
  beforeEach(() => {
    useTaskStore.setState({ tasks: [] });
  });

  describe('addTask', () => {
    it('should add a new task correctly', () => {
      const newTask = {
        title: 'Test Task',
        description: 'Test Description',
        expirationTime: '14:30',
        completed: false,
      };

      act(() => {
        useTaskStore.getState().addTask(newTask);
      });

      const tasks = useTaskStore.getState().tasks;
      expect(tasks).toHaveLength(1);
      expect(tasks[0]).toMatchObject({
        ...newTask,
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        order: 0,
      });
    });
  });

  describe('deleteTask', () => {
    it('should delete a task correctly', () => {
      // Add a task first
      act(() => {
        useTaskStore.getState().addTask({
          title: 'Task to Delete',
          description: '',
          expirationTime: '',
          completed: false,
        });
      });

      const tasks = useTaskStore.getState().tasks;
      const taskId = tasks[0].id;

      act(() => {
        useTaskStore.getState().deleteTask(taskId);
      });

      expect(useTaskStore.getState().tasks).toHaveLength(0);
    });
  });

  describe('toggleTaskComplete', () => {
    it('should toggle task completion status', () => {
      // Add a task first
      act(() => {
        useTaskStore.getState().addTask({
          title: 'Task to Toggle',
          description: '',
          expirationTime: '',
          completed: false,
        });
      });

      const tasks = useTaskStore.getState().tasks;
      const taskId = tasks[0].id;

      act(() => {
        useTaskStore.getState().toggleTaskComplete(taskId);
      });

      expect(useTaskStore.getState().tasks[0].completed).toBe(true);

      act(() => {
        useTaskStore.getState().toggleTaskComplete(taskId);
      });

      expect(useTaskStore.getState().tasks[0].completed).toBe(false);
    });
  });

  describe('clearTasks', () => {
    it('should clear all tasks', async () => {
        act(() => {
          useTaskStore.getState().addTask({
            title: 'Task 1',
            description: '',
            expirationTime: '',
            completed: false,
          });
          useTaskStore.getState().addTask({
            title: 'Task 2',
            description: '',
            expirationTime: '',
            completed: false,
          });
        });
      
        expect(useTaskStore.getState().tasks).toHaveLength(2);
      
        await act(async () => {
          await useTaskStore.getState().clearTasks();
          await new Promise((resolve) => setImmediate(resolve));
        });
      
        expect(useTaskStore.getState().tasks).toHaveLength(0);
      });
  });
});
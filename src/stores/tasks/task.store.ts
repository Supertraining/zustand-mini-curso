import { StateCreator, create } from 'zustand';
import { Task, TaskStatus } from '../../interfaces';
import { devtools } from 'zustand/middleware';

interface TaskState {
  tasks: Record<string, Task>; // esta linea es lo mismo que: {[key: string]: Task}
  draggingTaskId?: string;

  getTaskByStatus: (status: TaskStatus) => Task[];

  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
    'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
    'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
    'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'done' },
  },

  getTaskByStatus: (status: TaskStatus): Task[] => {
    const tareas = get().tasks;

    return Object.values(tareas).filter((t) => t.status == status);
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },
  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),

  changeTaskStatus(taskId, status) {
    const task = get().tasks[taskId];
    task.status = status;

    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
    }));
  },
});

export const useTaskStore = create<TaskState>()(devtools(storeApi));

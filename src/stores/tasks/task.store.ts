import { StateCreator, create } from 'zustand';
import { Task, TaskStatus } from '../../interfaces';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
// import { produce } from 'immer';
import { immer } from 'zustand/middleware/immer';
interface TaskState {
  tasks: Record<string, Task>; // esta linea es lo mismo que: {[key: string]: Task}
  draggingTaskId?: string;

  getTaskByStatus: (status: TaskStatus) => Task[];

  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
  addTask: (title: string, status: TaskStatus) => void;
  deleteTask: (taskId: string) => void;
  totalTasks: () => number;
}

const storeApi: StateCreator<TaskState, [['zustand/immer', never]]> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
    'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
    'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
    'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'done' },
  },

  totalTasks() {
      return Object.keys(get().tasks).length
  },

  getTaskByStatus: (status: TaskStatus): Task[] => {
    const tasks = get().tasks;

    return Object.values(tasks).filter((t) => t.status == status);
  },
  addTask(title, status) {
    const newTask = { id: uuidv4(), title, status };

    //notes: Hecho en el middelware immer de zustand
    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    //notes: Requiere npm install immer(2)
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask;
    //   })
    // );

    //notes: Forma nativa de zustand(3)
    // set(state => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask
    //   }
    // }))
  },
  deleteTask(taskId: string) {
    const tasks = get().tasks
    
    const filteredTasks = Object.entries(tasks).filter(t => t[0] !== taskId);
    
    const updatedTasks = Object.fromEntries(filteredTasks);
    
    set((state) => {
        state.tasks = updatedTasks
      })
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },
  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),

  changeTaskStatus(taskId: string, status: TaskStatus) {
    // const task = get().tasks[taskId];
    // task.status = status;

    set((state) => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status
      }
    });
   
  },
  onTaskDrop(status: TaskStatus) {
    const taskId = get().draggingTaskId;
    if (!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
});

export const useTaskStore = create<TaskState>()(devtools(immer(persist(storeApi, {name: 'task-storage'}) )));

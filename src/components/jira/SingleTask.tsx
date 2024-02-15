import { IoRemove } from 'react-icons/io5';
import { Task } from '../../interfaces';
import { useTaskStore } from '../../stores';

interface Props {
  task: Task;
}

export const SingleTask = ({ task }: Props) => {
  const setDraggingTaskId = useTaskStore((state) => state.setDraggingTaskId);
  const removeDraggingTaskId = useTaskStore((state) => state.removeDraggingTaskId);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <div
      draggable
      onDragStart={() => setDraggingTaskId(task.id)}
      onDragEnd={() => removeDraggingTaskId()}
      className='mt-5 flex items-center justify-between p-2'>
      <div className='flex items-center justify-center gap-2'>
        <p className='text-base font-bold text-navy-700'>{task.title}</p>
      </div>
      <button
        className='p-2'
        onClick={() => deleteTask(task.id)}>
        <IoRemove />
      </button>
    </div>
  );
};

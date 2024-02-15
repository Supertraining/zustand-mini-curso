import { useState } from "react";
import { useTaskStore } from "../stores";
import swal from 'sweetalert2';
import { TaskStatus } from "../interfaces";


interface Options {
  status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {

  const isDragging = useTaskStore(state => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore(state => state.onTaskDrop);
  const addtask = useTaskStore(state => state.addTask);

  const [onDragOver, setOndragOver] = useState(false)

  const handleAddTask = async () => {

    const { isConfirmed, value } = await swal.fire({
      title: 'Nueva tarea',
      input: 'text',
      inputLabel: 'Nombre de la tarea',
      inputPlaceholder: 'ingrese el nombre de la tarea',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un nombre para la tarea'
        }
      }
    })

    if (!isConfirmed) return;

    addtask(value, status)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOndragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOndragOver(false);
  };
  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onTaskDrop(status);
    setOndragOver(false);
  };



  return {
    isDragging,

    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleOnDrop,
  };
}



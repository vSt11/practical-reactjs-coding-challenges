export type Task = {
    id: string;
    title: string;
    priority: string;
    status: string;
    progress: number;
  };

 export type AddEditTaskFormProps = {
    handleClose: () => void;
    handleAddTask: (newTask: Task) => void;
  };
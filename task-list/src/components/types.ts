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
    showEditModal: (taskId: string) => void;
    isShowEditModal:boolean;
    task:Task;
    selectedPriority:string;
    handlePriorityClick :any;
    taskIdToEdit:string;
    handleEditTask:any;
    taskToEdit:Task;
  };

  export type TaskCardProps={
    task:Task,
    ShowDeleteModal:()=>void; 
    showEditModal:any;
    handleTaskClick :any;
  };
  
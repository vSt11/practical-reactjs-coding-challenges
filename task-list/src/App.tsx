import { useState } from "react"
import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList } from "./siteData/taskList"
import {Task} from "./components/types"
import { stringify } from "querystring"

export const App = () => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isFormOpened, setisFormOpened]=useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState('');
  const [tasks, setTasks]=useState(()=> {
    const storedTask = localStorage.getItem('tasks');
    return storedTask ? JSON.parse(storedTask):taskList;
  });

  const [taskTitlesToEdit, setTaskTitlesToEdit] = useState('');
  const [taskProgressToEdit, setTaskProgressToEdit] = useState('');
  const [taskStatusToEdit, setTaskStatusToEdit] = useState(0);
  const [taskPriorityToEdit, setTaskPriorityToEdit] = useState('');

  const handleOpenForm = () =>{
    console.log("open form");
    setisFormOpened(true);
  }

  const handleCloseForm = () =>{
    console.log("close form");
    setisFormOpened(false);
  }

  const handleAddTask= (newTask:Task) =>{
    const updatedTask = [newTask, ...tasks];
    setTasks(updatedTask);
    localStorage.setItem('tasks', JSON.stringify(updatedTask));

  };

  const ShowDeleteModal = (taskId: string) => {
    setTaskIdToDelete(taskId)
    setShowDeleteModal(true);
  };

  const CloseDeleteModal=() => {
    setShowDeleteModal(false);
  }

  const handleOpenEditForm=(taskId:string)=>{
    setisFormOpened(true);
    setTaskIdToEdit(taskId);
    setTaskTitlesToEdit(TaskTitle);
    setTaskProgressToEdit(TaskProgress);
    setTaskStatusToEdit(TaskStatus);
    setTaskPriorityToEdit(TaskPriority);
  }

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>

          <Button 
          title="Add Task" 
          icon={<Add />} 
          onClick={handleOpenForm} 
          />

          {isFormOpened && <AddEditTaskForm handleAddTask={handleAddTask} handleClose={handleCloseForm} />}
          
        </div>
        <div className="task-container">
          {tasks.map((task: Task) => (
            <TaskCard 
            task={task} 
            ShowDeleteModal={()=>ShowDeleteModal(task.id)}
            openEditForm={(taskIdToEdit: any, taskTitlesToEdit: any, taskProgressToEdit: any,taskStatusToEdit: any )=>
              handleOpenEditForm(tasks.id, tasks.title, tasks.progress, tasks.status, task.priority)
            
            }
            />
          ))}
        </div>
      </div>
      {showDeleteModal && <DeleteModal  closeDeleteModal={CloseDeleteModal} tasks={tasks} setTasks={setTasks} taskId={taskIdToDelete}/>}
    </div>
  )
}

export default App

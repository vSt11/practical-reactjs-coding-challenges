import { useState } from "react"
import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList } from "./siteData/taskList"
import {Task} from "./components/types"

export const App = () => {

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isFormOpened, setisFormOpened]=useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState('');
  const [taskIdToEdit, setTaskIdToEdit] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('')
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          return parsedTasks;
        }
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
      }
    }
    return taskList;
  });


  const handleOpenForm = () =>{
    setisFormOpened(true);
  }

  const handleCloseForm = () =>{
    setisFormOpened(false);
    setIsShowEditModal(false);
  }

  const handleAddTask= (newTask:Task) =>{
    const updatedTask = [newTask, ...tasks];
    setTasks(updatedTask);
    localStorage.setItem('tasks', JSON.stringify(updatedTask));
  };

  const showDeleteModal = (taskId: string) => {
    setTaskIdToDelete(taskId);
    setIsShowDeleteModal(true); 
  };

  const CloseDeleteModal=() => {
    setIsShowDeleteModal(false);
  }

  const handlePriorityClick = (priority: string) => {
    setSelectedPriority(priority)
  }

  const showEditModal=(taskId:string)=>{
    setisFormOpened(true)
    setIsShowEditModal(true);

    const taskToEdit:Task | undefined = tasks.find((task:Task)=>task.id===taskId);
    if (taskToEdit){
      const updatedTasks= tasks.map((task:Task)=>{
        if (task.id===taskId){
          return {
            ...task,
            title:taskToEdit.title,
            priority:taskToEdit.priority
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      setTaskIdToEdit(taskId); 
      setSelectedPriority(taskToEdit.priority);
    }
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

          {isFormOpened && <AddEditTaskForm 
          handleAddTask={handleAddTask} 
          handleClose={handleCloseForm} 
          showEditModal={showEditModal} 
          isShowEditModal={isShowEditModal} 
          selectedPriority={selectedPriority}
          handlePriorityClick={handlePriorityClick}
          
          />}
          
        </div>
        <div className="task-container">
          {tasks.map((task: Task) => (
            <TaskCard 
            key={task.id}
            task={task} 
            showDeleteModal={()=>showDeleteModal(task.id)} 
            showEditModal={showEditModal} 
            isShowEditModal={isShowEditModal} />
          ))}
        </div>
      </div>
      {isShowDeleteModal && <DeleteModal  closeDeleteModal={CloseDeleteModal} tasks={tasks} setTasks={setTasks} taskIdToDelete={taskIdToDelete} taskIdToEdit={taskIdToEdit}/>}
    </div>
  )
}

export default App

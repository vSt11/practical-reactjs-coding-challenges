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
  const showAddEditModal = false
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isFormOpened, setisFormOpened]=useState(false);
  const [tasks, setTasks]=useState(()=> {
    const storedTask = localStorage.getItem('tasks');
    return storedTask ? JSON.parse(storedTask):taskList;
  });

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

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  

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
            <TaskCard task={task} handleShowDeleteModal={handleShowDeleteModal}/>
          ))}
        </div>
      </div>
      {showAddEditModal && <AddEditTaskForm handleClose={handleCloseForm} handleAddTask={handleAddTask} />}
      {showDeleteModal && <DeleteModal/>}
    </div>
  )
}

export default App

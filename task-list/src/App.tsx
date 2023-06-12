import { useState } from "react"
import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList } from "./siteData/taskList"

const App = () => {
  const showAddEditModal = false
  const showDeleteModal = false
  const [isFormOpened, setisFormOpened]=useState(false)

  const handleOpenForm = () =>{
    console.log("open form");
    setisFormOpened(true);
  }

  const handleCloseForm = () =>{
    console.log("close form");
    setisFormOpened(false);
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

          {isFormOpened && <AddEditTaskForm handleClose={handleCloseForm} />}
          
        </div>
        <div className="task-container">
          {taskList.map((task) => (
            <TaskCard task={task} />
          ))}
        </div>
      </div>
      {showAddEditModal && <AddEditTaskForm handleClose={handleCloseForm} />}
      {showDeleteModal && <DeleteModal />}
    </div>
  )
}

export default App

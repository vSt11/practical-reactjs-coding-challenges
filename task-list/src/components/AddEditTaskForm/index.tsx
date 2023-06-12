import classNames from "classnames"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"
import React, { useState } from "react"
import { taskList } from "../../siteData/taskList"

export const AddEditTaskForm = ({handleClose}: {handleClose:()=>void}) => {

const [task, setTask] = useState('');
const [selectedPriority, setSelectedPriority]= useState('');
const [id, setId] = useState('');
const [status, setStatus] = useState('To Do');
const [progress, setProgress] = useState(0);

const handleTaskChange = (event: { target: { value: React.SetStateAction<string> } }) => {
  setTask(event.target.value)
  }

const handlePriorityClick=(priority: string)=>{
  setSelectedPriority(priority);
}

const handleAddTask=(id:string, title:string, priority:string, status:string, progress:number )=>{
  const newTask={
  id,
  title:task,
  priority:selectedPriority,
  status,
  progress }

  const updatedTaskList = [...taskList, newTask];

};


  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">Adding Task </span>
            <Close className="cp" onClick={handleClose}/>
          </div>
          <Input label="Task" 
          placeholder="Type your task here..." 
          onChange={handleTaskChange} 
          name="title" 
          value={task} />

          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((priority) => (
                <li 
                key={priority} 
                className={classNames({
                  [`${priority}-selected`]:selectedPriority === priority,
                  [priority] : true,
                  
                })}
                onClick={()=>handlePriorityClick(priority)}
                
                >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button title="Add" onClick={()=>handleAddTask(id, task, selectedPriority, status, progress)} />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm

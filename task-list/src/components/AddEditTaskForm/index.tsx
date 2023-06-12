import classNames from "classnames"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"
import React, { useState } from "react"
import { Task, AddEditTaskFormProps } from '../types';

export const AddEditTaskForm = ({handleClose, handleAddTask}:AddEditTaskFormProps) => {

const [task, setTask] = useState('');
const [selectedPriority, setSelectedPriority]= useState('');
const [isEditClicked, setIsEditClicked]=useState(false);


const handleTaskChange = (event: { target: { value: React.SetStateAction<string> } }) => {
  setTask(event.target.value)
  }

const handlePriorityClick=(priority: string)=>{
  setSelectedPriority(priority);
}


const handleFormSubmit=(event: any)=>{
  event.preventDefault();

  const newTask:Task={
  id:(Math.random()*100).toString(),
  title:task,
  priority:selectedPriority,
  status:'To Do',
  progress:0, };

  handleAddTask(newTask);
  handleClose();

};

const showEditModal=() => {
  setIsEditClicked(true);
};


  return (
    <Modal>
      
      <form onSubmit={handleFormSubmit}>
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
          {task !=='' &&(
          <div className="flx-right mt-50">
            <Button title="Add" onClick={handleFormSubmit} />
          </div>
          )}
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm



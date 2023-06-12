import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"
import { taskList } from "../../siteData/taskList"
import { useState } from "react"

const TaskCard = ({ task, ShowDeleteModal, openEditForm }: any) => {
  const { id, title, priority, status, progress } = task

  const handleEditClick = () =>{
    openEditForm(id, title, progress, status, priority);
  };
  
  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>
      <div className="task-status-wrapper">
        <button className="status">{status}</button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
      </div>
      <div className="actions">
        <EditIcon className="mr-20 cp" 
        onClick={handleEditClick} />

        <DeleteIcon className="cp" onClick={ShowDeleteModal} />
      </div>
    </div>
  )
  }

export default TaskCard

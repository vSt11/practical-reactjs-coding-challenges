import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"
import { taskList } from "../../siteData/taskList"
import { useState } from "react";
import { Task } from "../types";

interface TaskCardProps {
  task:Task;
  showDeleteModal:()=>void;
  showEditModal:(taskId:string)=>void;
  isShowEditModal:boolean;
}

const TaskCard:React.FC<TaskCardProps> = ({ 
  task, 
  showDeleteModal, 
  showEditModal }: any) => {
  const { id, title, priority, status, progress } = task
  
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
        <EditIcon className="mr-20 cp" onClick={()=>showEditModal(task.id)} />
        <DeleteIcon className="cp" onClick={showDeleteModal(task.id)} />
      </div>
    </div>
  )
  }

export default TaskCard

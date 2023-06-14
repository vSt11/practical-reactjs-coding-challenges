import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"




const TaskCard = ({ task, ShowDeleteModal, showEditModal, handleTaskClick }: any) => {

  const getProgress = (status:string) => {
    if (status === 'To Do') {
      return 0;
    } else if (status === 'In Progress') {
      return 50;
    } else if (status === 'Done') {
      return 100;
    }
  };

  const { id,title, priority, status } = task
  const progress = getProgress(status);
  
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
      <button className="status" onClick={() => handleTaskClick(task.id)}>{status}</button>      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
      </div>
      <div className="actions">
        <EditIcon className="mr-20 cp" onClick={()=>showEditModal(task.id)} />
        <DeleteIcon className="cp" onClick={ShowDeleteModal} />
      </div>
    </div>
  )
  }

export default TaskCard

import { useState } from "react"
import Button from "../Button"
import Modal from "../Modal"
import "./style.scss"
import {AddEditTaskForm} from "../AddEditTaskForm"
import { taskList } from "../../siteData/taskList"



const DeleteModal = ({closeDeleteModal, tasks}:any) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = (taskId:string) => {
    const updatedTasks = tasks.filter((tasks: { id: string }) => tasks.id !== taskId);
    
  };

  const handleCancel= () => {
    closeDeleteModal();
  };

  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button title="Delete" onClick={()=>handleDelete} />
          <Button title="Cancel" outline onClick={handleCancel} />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal

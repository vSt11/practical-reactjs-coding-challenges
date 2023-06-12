import { useState } from "react"
import Button from "../Button"
import Modal from "../Modal"
import "./style.scss"
import {AddEditTaskForm} from "../AddEditTaskForm"
import { taskList } from "../../siteData/taskList"


const DeleteModal = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = (taskId:string) => {
    const updatedTaskList = taskList.filter((task) => task.id !== taskId);
    

  };

  const handleCancel= () => {

  };

  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button title="Delete" onClick={()=>handleDelete} />
          <Button title="Cancel" outline onClick={() => {}} />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal

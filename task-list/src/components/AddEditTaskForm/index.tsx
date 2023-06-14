import classNames from 'classnames'
import { ReactComponent as Close } from '../../assets/icons/close.svg'
import Button from '../Button'
import Input from '../Input'
import Modal from '../Modal'
import './style.scss'
import React, { useState } from 'react'
import { taskList } from '../../siteData/taskList'
import { Task, AddEditTaskFormProps } from '../types'

export const AddEditTaskForm: React.FC<AddEditTaskFormProps> = ({
  handleClose,
  handleAddTask,
  handleEditTask,
  isShowEditModal,
  selectedPriority,
  taskIdToEdit,
  taskToEdit,
  handlePriorityClick
}: AddEditTaskFormProps) => {
  const [task, setTask] = useState('')

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value)
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const newTask: Task = {
      id: (Math.random() * 100).toString(),
      title: task,
      priority: selectedPriority,
      status: 'To Do',
      progress: 0
    }

    handleAddTask(newTask)
    handleClose()
  }

  const handleFormEdit = (event: React.FormEvent) => {
    event.preventDefault()

    const updatedTask: Task = {
      id: taskIdToEdit,
      title: task !== '' ? task : taskToEdit.title,
      priority: selectedPriority,
      status: 'To Do',
      progress: 0
    }

    handleEditTask(updatedTask)
    handleClose()
  }

  return (
    <Modal>
      {isShowEditModal ? (
        // Editing Task

        <form onSubmit={handleFormEdit}>
          <div className='add-edit-modal'>
            <div className='flx-between'>
              <span className='modal-title'>Editing Task </span>
              <Close className='cp' onClick={handleClose} />
            </div>
            <Input
              label='Task'
              onChange={handleTaskChange}
              name='title'
              value={task || taskToEdit.title}
              placeholder={''}
            />

            <div className='modal-priority'>
              <span>Priority</span>
              <ul className='priority-buttons'>
                {['high', 'medium', 'low'].map(priority => (
                  <li
                    key={priority}
                    className={classNames({
                      [`${priority}-selected`]: selectedPriority === priority,
                      [priority]: true
                    })}
                    onClick={() => handlePriorityClick(priority)}
                  >
                    {priority}
                  </li>
                ))}
              </ul>
            </div>
            {(task !== '' || taskToEdit.priority!==selectedPriority) &&(
              <div className='flx-right mt-50'>
                <Button title='Edit' onClick={handleFormEdit} />
              </div>
            )}
    
          </div>
        </form>
      ) : (
        //Else, Adding task

        <form onSubmit={handleFormSubmit}>
          <div className='add-edit-modal'>
            <div className='flx-between'>
              <span className='modal-title'>Adding Task </span>
              <Close className='cp' onClick={handleClose} />
            </div>
            <Input
              label='Task'
              placeholder='Type your task here...'
              onChange={handleTaskChange}
              name='title'
              value={task}
            />

            <div className='modal-priority'>
              <span>Priority</span>
              <ul className='priority-buttons'>
                {['high', 'medium', 'low'].map(priority => (
                  <li
                    key={priority}
                    className={classNames({
                      [`${priority}-selected`]: selectedPriority === priority,
                      [priority]: true
                    })}
                    onClick={() => handlePriorityClick(priority)}
                  >
                    {priority}
                  </li>
                ))}
              </ul>
            </div>
            {task !== '' && (
              <div className='flx-right mt-50'>
                <Button title='Add' onClick={handleFormSubmit} />
              </div>
            )}
          </div>
        </form>
      )}
    </Modal>
  )
}

export default AddEditTaskForm

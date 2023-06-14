import { useState } from 'react'
import './App.scss'
import { ReactComponent as Add } from './assets/icons/add.svg'
import AddEditTaskForm from './components/AddEditTaskForm'
import Button from './components/Button'
import DeleteModal from './components/DeleteModal'
import TaskCard from './components/TaskCard'
import { taskList } from './siteData/taskList'
import { Task } from './components/types'

export const App = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isFormOpened, setisFormOpened] = useState(false)
  const [taskIdToDelete, setTaskIdToDelete] = useState('')
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
  const [selectedPriority, setSelectedPriority] = useState('')
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [taskIdToEdit, setTaskIdToEdit] = useState('');

  const [tasks, setTasks] = useState(() => {
    const storedTask = localStorage.getItem('tasks')
    return storedTask ? JSON.parse(storedTask) : taskList
  })

  const handleOpenForm = () => {
    console.log('open form')
    setisFormOpened(true)
  }

  const handleEditTask=(updatedTask:Task) => {
    const updatedTasks=tasks.map((task:Task) => {
      if (task.id===updatedTask.id) {
        console.log("updated task change")
        return updatedTask;
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleCloseForm = () => {
    console.log('close form')
    setisFormOpened(false)
    setIsShowEditModal(false)
  }

  const handleAddTask = (newTask: Task) => {
    const updatedTask = [newTask, ...tasks]
    setTasks(updatedTask)
    localStorage.setItem('tasks', JSON.stringify(updatedTask))
  }

  const ShowDeleteModal = (taskId: string) => {
    setTaskIdToDelete(taskId)
    setShowDeleteModal(true)
  }

  const CloseDeleteModal = () => {
    setShowDeleteModal(false)
  }

  const handlePriorityClick = (priority: string) => {
    setSelectedPriority(priority)
  }

  const findTaskById = (taskId: string) => {
    return tasks.find((task: Task) => task.id === taskId)
  }

  const showEditModal = (taskId: string) => {
    setisFormOpened(true);
    setIsShowEditModal(true);
    setTaskIdToEdit(taskId) ;
    setTaskToEdit(findTaskById(taskId));    
  }

  return (
    <div className='container'>
      <div className='page-wrapper'>
        <div className='top-title'>
          <h2>Task List</h2>

          <Button 
          title='Add Task' 
          icon={<Add />} 
          onClick={handleOpenForm} 
          />

          {isFormOpened && taskToEdit && (
            <AddEditTaskForm
              task={taskToEdit}
              handleAddTask={handleAddTask}
              handleClose={handleCloseForm}
              showEditModal={showEditModal}
              isShowEditModal={isShowEditModal}
              selectedPriority={taskToEdit.priority}
              handlePriorityClick={handlePriorityClick}
              taskIdToEdit={taskIdToEdit}
              handleEditTask={handleEditTask}
              taskToEdit={taskToEdit}
            />
          )}
        </div>
        <div className='task-container'>
          {tasks.map((task: Task) => (
            <TaskCard
              task={task}
              ShowDeleteModal={() => ShowDeleteModal(task.id)}
              showEditModal={showEditModal}
              isShowEditModal={isShowEditModal}
            />
          ))}
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal 
        closeDeleteModal={CloseDeleteModal} 
        tasks={tasks} 
        setTasks={setTasks} 
        taskId={taskIdToDelete} 
        />
      )}
    </div>
  )
}

export default App

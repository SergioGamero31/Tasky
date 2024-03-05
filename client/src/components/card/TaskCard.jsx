import { useState } from 'react'
import { useAuthStore } from '../../stores/auth'
import { useColumnStore } from '../../stores/Column'
import CloseButton from '../button/CloseButton'
import taskService from '../../services/taskService'

const TaskCard = ({ columnId, closeCard }) => {
  const [editMode, setEditMode] = useState(true)
  const [title, setTitle] = useState('')

  const { accessToken } = useAuthStore()
  const { columns, setColumns } = useColumnStore()

  const handleCreateTask = () => {
    if (!title) {
      closeCard()
    }
    setEditMode(false)
    createTask()
  }

  const createTask = async () => {
    try {
      if (!title) return
      const response = await taskService.createTask(accessToken, title, columnId)
      if (response.ok) {
        const newTask = await response.json()
        const newColumns = [...columns]
        const index = newColumns.findIndex(c => c._id === columnId)
        newColumns[index].tasks.push(newTask)
        setColumns(newColumns)
        closeCard()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className='flex flex-col gap-2 mt-2.5 min-h-24 h-24 rounded-md p-2 text-sm bg-white dark:bg-rich-black'>
      <CloseButton onClick={closeCard} />
      {editMode ? (
        <textarea
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCreateTask()}
          onBlur={handleCreateTask}
          autoFocus
          placeholder='Ingresa el título de la tarea'
          className='h-full p-1 resize-none bg-rich-black/5 dark:bg-white/5'
        />
      ) : (
        <h2 onClick={() => setEditMode(true)} className='h-full font-medium'>
          {title ? title : 'Ingresa el título de la tarea'}
        </h2>
      )}
    </form>
  )
}

export default TaskCard

import { useState } from 'react'
import { useColumnStore } from '../../stores/Column'
import { useBoardStore } from '../../stores/Board'
import { useAuthStore } from '../../stores/auth'
import taskService from '../../services/taskService'
import useModal from '../../hooks/useModal'
import CloseButton from '../button/CloseButton'
import DeleteIcon from '../icons/DeleteIcon'
import StatusMessage from '../common/StatusMessage'

const TaskModal = ({ openModal, closeModal, task }) => {
  const { accessToken } = useAuthStore()
  const { columns, setTask, deleteTask } = useColumnStore()
  const { board } = useBoardStore()

  const [deleteMenu, setDeleteMenu] = useState(false)
  const [newTask, setNewTask] = useState({ ...task })
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const { ref, handleCloseModal } = useModal(openModal, closeModal)
  const currentColumn = columns?.find(col => col._id == task.columnId)

  const updateProperty = (property, value) => {
    setNewTask({ ...newTask, [property]: value })
  }

  const updateTask = async () => {
    if (!newTask.title) {
      return
    }
    try {
      const res = await taskService.updateTask(accessToken, newTask._id, newTask)
      if (!res.ok) {
        setError(true)
        setMessage('Tarea no encontrada')
        setTimeout(() => setMessage(null), 2500)
      }
      const task = await res.json()
      setTask(task)
    } catch (error) {
      setError(true)
      setMessage('Erro al actualizar tarea. Inténtalo más tarde')
      setTimeout(() => setMessage(null), 2500)
    }
  }

  const handleDeleteTask = async () => {
    try {
      const res = await taskService.deleteTask(accessToken, newTask._id)
      if (!res.ok) {
        setError(true)
        setMessage('Tarea no encontrada')
        setTimeout(() => setMessage(null), 2500)
      }
      const task = await res.json()
      deleteTask(task)
      closeModal()
    } catch (error) {
      setError(true)
      setMessage('Error al eliminar tarea. Inténtalo más tarde')
      setTimeout(() => setMessage(null), 2500)
    }
  }

  return (
    <dialog
      ref={ref}
      onKeyDown={handleCloseModal}
      className='w-full md:w-3/5 lg:w-[400px] p-6 rounded-2xl border border-slate-300 dark:border-slate-800 bg-athens-gray dark:bg-rich-black dark:text-white backdrop:backdrop-blur-sm'
    >
      <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-3'>
        <header className='flex justify-between gap-3'>
          <input
            value={newTask.title}
            onChange={e => updateProperty('title', e.target.value)}
            onBlur={updateTask}
            className='w-full rounded-md text-lg font-medium focus-within:outline outline-azure bg-transparent focus:bg-slate-200 focus:dark:bg-vulcan'
          />
          <CloseButton onClick={closeModal} />
        </header>
        <StatusMessage message={message} error={error} />
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400'>
            <span>Lista:</span>
            <span className='py-1 px-2 rounded-lg bg-slate-200 dark:bg-vulcan'>
              {currentColumn.title}
            </span>
          </div>
          <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400'>
            <span>Vencimiento:</span>
            <input
              value={newTask.date}
              onChange={e => updateProperty('date', e.target.value)}
              onBlur={updateTask}
              type='date'
              min={new Date().toISOString().split('T')[0]}
              className='py-1 px-2 rounded-lg focus-within:outline outline-azure-400 text-eerie-black dark:text-slate-400 bg-slate-200 dark:bg-vulcan'
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h4 className='font-medium'>Descripción</h4>
          <textarea
            value={newTask.description}
            onChange={e => updateProperty('description', e.target.value)}
            onBlur={updateTask}
            maxLength='80'
            className='h-28 p-3 rounded-lg resize-none focus-within:outline outline-azure-400 bg-slate-200 dark:bg-vulcan'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <h4 className='font-medium'>Responsable</h4>
          <select
            value={newTask.assignedTo ?? ''}
            onChange={e => updateProperty('assignedTo', e.target.value)}
            onBlur={updateTask}
            className='p-2 rounded-lg focus-within:outline outline-azure-400 bg-slate-200 dark:bg-vulcan'
          >
            <option value=''>Selecciona un miembro</option>
            {board.members.map(member => (
              <option value={member._id} key={member._id}>
                {member.userName}
              </option>
            ))}
          </select>
        </div>
        <button
          type='button'
          onClick={() => setDeleteMenu(true)}
          className='rounded-lg p-2 border-2 font-medium border-rose-800 hover:bg-rose-800 hover:text-white dark:text-white transition-colors'
        >
          Eliminar
        </button>
        {deleteMenu && (
          <menu className='flex gap-3'>
            <button
              type='button'
              onClick={() => setDeleteMenu(false)}
              className='w-full p-2 rounded-lg border border-border-slate-300 dark:border-slate-800 bg-athens-gray-100 dark:bg-vulcan hover:bg-athens-gray-200 dark:hover:bg-slate-800 text-eerie-black dark:text-white'
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteTask}
              type='button'
              className='flex gap-2 items-center justify-center w-full rounded-lg p-2 bg-rose-700 hover:bg-rose-800 text-white'
            >
              Eliminar
              <DeleteIcon width='1.2rem' />
            </button>
          </menu>
        )}
      </form>
    </dialog>
  )
}

export default TaskModal

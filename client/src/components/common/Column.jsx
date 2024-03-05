import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useState } from 'react'
import { useAuthStore } from '../../stores/auth'
import { useColumnStore } from '../../stores/Column'
import ConfirmModal from '../modal/ConfirmModal'
import AddCircleIcon from '../icons/AddCircleIcon'
import DeleteIcon from '../icons/DeleteIcon'
import TaskCard from '../card/TaskCard'
import Task from './Task'
import columnService from '../../services/columnService'

const Column = ({ column, index, createToast }) => {
  const [editMode, setEditMode] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [taskCard, setTaskCard] = useState(false)
  const [title, setTitle] = useState(column.title)

  const { accessToken } = useAuthStore()
  const { updateTitle } = useColumnStore()

  const handleUpdateTitle = async () => {
    if (!title) return
    try {
      const res = await columnService.updateTitle(accessToken, column._id, title)
      if (!res.ok) {
        const json = await res.json()
        createToast('error', json.error)
      }
      updateTitle(column._id, title)
      setEditMode(false)
    } catch (error) {
      createToast('error', 'Error al actualizar lista. Inténtalo más tarde')
    }
  }

  return (
    <Draggable draggableId={column._id} index={index}>
      {provided => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className='flex flex-col mx-2 h-fit max-h-full w-72 rounded-xl shadow-lg dark:shadow-none bg-athens-gray-100 dark:bg-vulcan text-eerie-black dark:text-white overflow-hidden'
        >
          <div
            {...provided.dragHandleProps}
            className='flex items-center justify-between py-2.5 px-4'
          >
            {!editMode && (
              <h2 onClick={() => setEditMode(true)} className='font-medium'>
                {title}
              </h2>
            )}
            {editMode && (
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && setEditMode(false)}
                autoFocus
                onBlur={handleUpdateTitle}
                className='rounded-md border-2 font-medium bg-black bg-opacity-15 focus:outline-none'
              />
            )}
            <button
              onClick={() => setConfirmModal(true)}
              aria-label='Borrar'
              className='rounded-full p-1 hover:bg-athens-gray-200 dark:hover:bg-gunmetal transition-colors'
            >
              <DeleteIcon width='1.2em' height='1.2em' />
            </button>
          </div>
          <Droppable droppableId={column._id} type='Task' direction='vertical'>
            {provided => (
              <ol
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex flex-col flex-auto py-1.5 px-3 overflow-x-hidden overflow-y-auto scrollbar:w-1.5 scrollbar:bg-transparent scrollbar-track:bg-slate-100 scrollbar-thumb:rounded scrollbar-thumb:bg-slate-300 scrollbar-track:rounded dark:scrollbar-track:bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50`}
              >
                {column.tasks.map((task, index) => (
                  <Task key={task._id} index={index} task={task} />
                ))}

                {taskCard && (
                  <TaskCard
                    columnId={column._id}
                    closeCard={() => setTaskCard(false)}
                  />
                )}
                {provided.placeholder}
              </ol>
            )}
          </Droppable>

          <button
            onClick={() => setTaskCard(true)}
            className='flex items-center py-1.5 px-3 m-2 gap-2 rounded-md hover:bg-athens-gray-200 dark:hover:bg-gunmetal transition-colors'
          >
            <AddCircleIcon /> Añadir tarea
          </button>

          {confirmModal && (
            <ConfirmModal
              openModal={confirmModal}
              closeModal={() => setConfirmModal(false)}
              column={column}
            />
          )}
        </li>
      )}
    </Draggable>
  )
}

export default Column

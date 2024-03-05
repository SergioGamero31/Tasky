import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import TaskModal from '../modal/TaskModal'
import MoreIcon from '../icons/MoreIcon'

const Task = ({ task, index }) => {
  const [taskModal, setTaskModal] = useState(false)

  return (
    <>
      <Draggable draggableId={task._id} index={index}>
        {provided => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='flex flex-col p-2 mt-2.5 rounded-md min-h-24 h-24 text-sm shadow-sm dark:shadow-none dark:text-white bg-white dark:bg-rich-black dark:hover:border border-azure-400/35'
          >
            <button
              onClick={() => setTaskModal(true)}
              className='self-end rounded-full p-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors'
            >
              <MoreIcon />
            </button>
            <h3 className='h-full font-medium break-words overflow-y-auto scrollbar:w-1.5 scrollbar:bg-transparent scrollbar-track:bg-slate-100 scrollbar-thumb:rounded scrollbar-thumb:bg-slate-300 scrollbar-track:rounded dark:scrollbar-track:bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50'>
              {task.title}
            </h3>
          </li>
        )}
      </Draggable>

      {taskModal && (
        <TaskModal
          openModal={taskModal}
          closeModal={() => setTaskModal(false)}
          task={task}
        />
      )}
    </>
  )
}

export default Task

import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useEffect, useState, Suspense } from 'react'
import { useParams, useNavigate, Await, useLoaderData } from 'react-router-dom'
import { useAuthStore } from '../stores/auth'
import { useColumnStore } from '../stores/Column'
import { useBoardStore } from '../stores/Board'
import { AnimatePresence } from 'framer-motion'
import useToast from '../hooks/useToast'
import Column from '../components/common/Column'
import MemberModal from '../components/modal/MemberModal'
import Button from '../components/button/Button'
import Loader from '../components/common/Loader'
import AddIcon from '../components/icons/AddIcon'
import AddUserIcon from '../components/icons/AddUserIcon'
import BackIcon from '../components/icons/BackIcon'
import ColumnCard from '../components/card/ColumnCard'
import columnService from '../services/columnService'
import ToastCointainer from '../components/common/ToastCointainer'
import taskService from '../services/taskService'

const Board = () => {
  const [memberModal, setMemberModal] = useState(false)
  const [columnCard, setColumnCard] = useState(false)
  const { toastList, createToast } = useToast()

  const { accessToken, clearTokens } = useAuthStore()
  const { columns, setColumns } = useColumnStore()
  const { board, setCurrentBoard, clearCurrentBoard } = useBoardStore()

  const navigate = useNavigate()
  const { boardId } = useParams()

  const boardPromise = useLoaderData()

  useEffect(() => {
    getBoardData()
  }, [])

  const getBoardData = async () => {
    try {
      const res = await boardPromise.board
      if (res.ok) {
        const json = await res.json()
        setCurrentBoard(json)
        setColumns(json.columns)
      }
      if (res.status === 403) {
        clearTokens()
        alert('La sesión expiró. Porfavor, inicia sesión nuevamente')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const goBack = () => {
    navigate(-1)
    clearCurrentBoard()
  }

  const swapColumn = async (token, activeId, overId) => {
    try {
      await columnService.swapColumnOrder(token, boardId, activeId, overId)
    } catch (error) {
      createToast('error', 'Error al actualizar lista')
    }
  }

  const shiftColumn = async (token, tasks) => {
    try {
      await taskService.shiftColumn(token, tasks)
    } catch (error) {
      createToast('error', 'Error al actualizar tarea')
    }
  }

  const handleOnDragEnd = result => {
    const { destination, source, type } = result

    if (!destination) return

    if (type === 'Column') {
      const sourceCol = columns[source.index]
      const destinationCol = columns[destination.index]

      const sourceColId = sourceCol._id
      const destinationColId = destinationCol._id

      const newColumns = Array.from(columns)
      const [reorderedColumn] = newColumns.splice(source.index, 1)
      newColumns.splice(destination.index, 0, reorderedColumn)
      setColumns(newColumns)

      swapColumn(accessToken, sourceColId, destinationColId)
    }

    if (type === 'Task') {
      const sourceColIndex = columns.findIndex(c => c._id === source.droppableId)
      //prettier-ignore
      const destinationColIndex = columns.findIndex(c => c._id === destination.droppableId)
      const sourceCol = columns[sourceColIndex]
      const destinationCol = columns[destinationColIndex]

      const sourceColId = sourceCol._id
      const destinationColId = destinationCol._id

      const sourceTasks = [...sourceCol.tasks]
      const destinationTasks = [...destinationCol.tasks]

      if (source.droppableId !== destination.droppableId) {
        const [removed] = sourceTasks.splice(source.index, 1)
        removed.columnId = destinationColId
        destinationTasks.splice(destination.index, 0, removed)
        columns[sourceColIndex].tasks = sourceTasks
        columns[destinationColIndex].tasks = destinationTasks
      } else {
        const [removed] = destinationTasks.splice(source.index, 1)
        destinationTasks.splice(destination.index, 0, removed)
        columns[destinationColIndex].tasks = destinationTasks
      }

      shiftColumn(accessToken, {
        sourceList: sourceTasks,
        destinationList: destinationTasks,
        sourceColId: sourceColId,
        destinationColId: destinationColId
      })
    }
  }

  return (
    <Suspense fallback={<Loader width='3.5em' height='3.5em' />}>
      <Await resolve={boardPromise.board}>
        <div className='flex relative w-full'>
          <div className='flex flex-col absolute h-full w-full pl-8 pt-4 pb-2'>
            <section className='flex relative items-center justify-between gap-3 mr-8'>
              <div className='flex items-center gap-3 dark:text-white'>
                <button
                  onClick={goBack}
                  className='rounded-full p-2 hover:bg-slate-200 dark:hover:bg-vulcan transition-colors'
                >
                  <BackIcon width='1.2em' height='1.2em' />
                </button>
                <h1 className='text-lg font-medium '>
                  {board ? board.title : 'Nuevo tablero'}
                </h1>
              </div>
              <div className='flex gap-2'>
                <Button
                  onclick={() => setMemberModal(true)}
                  padding='p-2.5'
                  icon={<AddUserIcon width='1.1em' height='1.1em' />}
                  buttonStyle='secondary'
                />
              </div>
            </section>
            <section className='flex relative w-full h-full mt-4 overflow-y-hidden text-eerie-black scrollbar:h-2 scrollbar:bg-transparent scrollbar-track:bg-slate-100 scrollbar-thumb:rounded scrollbar-thumb:bg-slate-300 scrollbar-track:rounded dark:scrollbar-track:bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50'>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className='flex absolute pb-3 h-full max-h-full overflow-y-hidden overflow-x-auto'>
                  <Droppable
                    droppableId={boardId}
                    type='Column'
                    direction='horizontal'
                  >
                    {provided => (
                      <ol
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='flex'
                      >
                        {columns.map((col, index) => (
                          <Column
                            key={col._id}
                            index={index}
                            column={col}
                            createToast={createToast}
                          />
                        ))}
                        {provided.placeholder}
                      </ol>
                    )}
                  </Droppable>
                  <AnimatePresence>
                    {columnCard && (
                      <ColumnCard
                        boardId={boardId}
                        closeCard={() => setColumnCard(false)}
                        createToast={createToast}
                      />
                    )}
                  </AnimatePresence>
                  <button
                    onClick={() => setColumnCard(true)}
                    className='flex items-center justify-center gap-2 p-3 ml-2 mr-8 h-fit min-w-64 rounded-xl text-slate-500 border border-slate-500 border-dashed hover:bg-athens-gray-200/60 hover:dark:bg-vulcan transition-colors'
                  >
                    <AddIcon />
                    Añadir lista
                  </button>
                </div>
              </DragDropContext>
            </section>
          </div>
          <ToastCointainer toastList={toastList} />
        </div>
        {memberModal && (
          <MemberModal
            openModal={memberModal}
            closeModal={() => setMemberModal(false)}
          />
        )}
      </Await>
    </Suspense>
  )
}

export default Board

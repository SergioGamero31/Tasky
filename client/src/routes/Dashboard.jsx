import { useState, useEffect } from 'react'
import { useAuthStore } from '../stores/auth'
import { useBoardStore } from '../stores/Board'
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AddIcon from '../components/icons/AddIcon'
import BoardModal from '../components/modal/BoardModal'
import boardService from '../services/boardService'

const Dashboard = () => {
  const [boardModal, setBoardModal] = useState(false)
  const { accessToken, user, clearTokens } = useAuthStore()
  const { boards, setBoards, isEmpty } = useBoardStore()

  //prettier-ignore
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
  const currentDate = new Date().toLocaleDateString('es-ES', options)
  const formatedDate = currentDate.split(',')

  useEffect(() => {
    getAllBoards(accessToken)
  }, [])

  const getAllBoards = async token => {
    try {
      const response = await boardService.getAllBoards(token)
      if (response.ok) {
        const json = await response.json()
        setBoards(json)
      }
      if (response.status == 403) {
        clearTokens()
        alert('La sesión expiró. Porfavor, inicia sesión nuevamente')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex flex-col gap-4 py-5 px-8 w-full'>
      <AnimatePresence>
        {boardModal && (
          <BoardModal
            openModal={boardModal}
            closeModal={() => setBoardModal(false)}
          />
        )}
      </AnimatePresence>
      <span className='text-slate-500'>
        <span className='text-azure capitalize'>{formatedDate[0]}</span>,
        {formatedDate[1]}
      </span>
      <section className='flex relative justify-center p-4 pb-0 gap-20 h-48 rounded-xl bg-athens-gray-200 dark:bg-gunmetal overflow-hidden'>
        <img
          width={280}
          height={180}
          src='/assets/dashboard.svg'
          alt='Ilustración de bienvenida'
          className='hidden md:block z-40'
        />
        <div className='flex flex-col gap-2 self-center mb-4 z-40'>
          <h1 className='text-xl font-medium dark:text-white'>
            Bienvenido {user.userName}
          </h1>
          <span className='font-medium text-slate-700 dark:text-manatee-500 w-60'>
            ¿Estás listo para organizar tus tareas y alcanzar tus objetivos?
          </span>
        </div>
        <span className='absolute top-0 left-0 -ml-7 -mt-10 z-0 rounded-full size-24 lg:size-40 lg:-mt-14 lg:-ml-10 bg-athens-gray-300 dark:bg-slate-600'></span>
        <span className='absolute bottom-0 right-0 -mr-7 -mb-10 z-0 rounded-full size-24 lg:size-40 lg:-mb-14 lg:-mr-10 bg-athens-gray-300 dark:bg-slate-600'></span>
      </section>
      <section className='flex flex-col flex-1 gap-4'>
        <div className='flex gap-3 items-center justify-between'>
          <h2 className='text-lg text-slate-500'>Mis tableros</h2>
          <button
            onClick={() => setBoardModal(true)}
            className='flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm bg-azure hover:bg-azure-600 text-white transition-colors'
          >
            <AddIcon />
            Nuevo tablero
          </button>
        </div>
        {!isEmpty && boards.length > 0 ? (
          <ol className='flex flex-col md:flex-row flex-wrap gap-4'>
            {boards.map(board => (
              <li key={board._id}>
                <Link
                  to={`/board/${board._id}`}
                  className='flex items-end p-2 h-28 w-full md:w-52 rounded-lg text-white font-medium hover:opacity-70 transition-opacity shadow-lg dark:shadow-none'
                  style={{ background: board.color }}
                >
                  <span className='drop-shadow-[1px_2px_3px_rgba(0,0,0,0.7)]'>
                    {board.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyDashboard />
        )}
      </section>
    </div>
  )
}

const EmptyDashboard = () => {
  return (
    <div className='flex flex-col flex-1 items-center justify-center'>
      <img
        width={320}
        height={320}
        src='/assets/empty_state.svg'
        aria-label='Ilustración de estado vacio'
      />
      <span className='md:w-1/2 lg:w-1/3 lg:text-lg text-slate-500 text-center'>
        Tu espacio está un poco vacío por ahora. Crea un nuevo tablero para que tus
        proyectos cobren vida
      </span>
    </div>
  )
}

export default Dashboard

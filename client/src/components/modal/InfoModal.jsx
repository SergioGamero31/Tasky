import { motion } from 'framer-motion'
import useModal from '../../hooks/useModal'
import CloseButton from '../button/CloseButton'

const InfoModal = ({ openModal, closeModal }) => {
  const { ref, handleCloseModal } = useModal(openModal, closeModal)

  return (
    <motion.dialog
      ref={ref}
      onKeyDown={handleCloseModal}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className='flex flex-col items-center w-full md:w-3/5 lg:w-[30rem] p-6 rounded-2xl border border-slate-300 dark:border-slate-800 bg-athens-gray dark:bg-rich-black dark:text-white backdrop:backdrop-blur-sm'
    >
      <CloseButton onClick={closeModal} />
      <img
        src='/assets/welcome_state.svg'
        alt='Ilustración de bienvenida'
        width={170}
        height={170}
      />
      <div className='flex flex-col items-center gap-2 mt-5 w-full md:w-3/4 text-slate-500 dark:text-slate-400'>
        <header className='flex gap-3 justify-between'>
          <span className='text-xl font-medium text-slate-900 dark:text-white'>
            Bienvenido
          </span>
        </header>
        <p>
          Por el momento el registro de usuarios está desactivado. Inicia sesión con
          las siguientes credenciales:
        </p>
        <div className='self-center'>
          <p>
            <span className='text-slate-800 dark:text-white font-medium'>
              Correo:
            </span>{' '}
            andre@gmail.com
          </p>
          <p>
            <span className='text-slate-800 dark:text-white font-medium'>
              Contraseña:
            </span>{' '}
            12345678A
          </p>
        </div>
      </div>
    </motion.dialog>
  )
}

export default InfoModal

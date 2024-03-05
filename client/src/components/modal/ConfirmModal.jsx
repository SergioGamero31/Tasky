import { useColumnStore } from '../../stores/Column'
import { useAuthStore } from '../../stores/auth'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import useModal from '../../hooks/useModal'
import CloseButton from '../button/CloseButton'
import Button from '../button/Button'
import columnService from '../../services/columnService'

const ConfirmModal = ({ openModal, closeModal, column }) => {
  const { accessToken } = useAuthStore()
  const { deleteColumn } = useColumnStore()

  const { boardId } = useParams()
  const { ref, handleCloseModal } = useModal(openModal, closeModal)

  const handleDeleteColumn = async () => {
    try {
      const res = await columnService.deleteColumn(accessToken, boardId, column._id)
      if (res.ok) {
        const column = await res.json()
        deleteColumn(column._id)
        closeModal()
      } else {
        const json = await res.json()
        console.log(json)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.dialog
      ref={ref}
      onKeyDown={handleCloseModal}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className='flex flex-col gap-4 p-6 w-full md:w-3/5 lg:w-96 rounded-2xl border border-slate-300 dark:text-white dark:border-slate-800 bg-athens-gray dark:bg-rich-black backdrop:backdrop-blur-sm'
    >
      <header className='flex gap-3 justify-between'>
        <span className='font-medium'> {`¿Quieres eliminar ${column.title}?`}</span>
        <CloseButton onClick={closeModal} />
      </header>
      <span>Si la eliminas no se podrá recuperar</span>
      <footer className='self-end'>
        <menu className='flex gap-3'>
          <Button
            focus={true}
            onclick={closeModal}
            text='Cancelar'
            buttonStyle='secondary'
          />
          <Button onclick={handleDeleteColumn} text='Eliminar' />
        </menu>
      </footer>
    </motion.dialog>
  )
}

export default ConfirmModal

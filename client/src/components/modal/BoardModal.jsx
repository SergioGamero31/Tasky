import { useState } from 'react'
import { useAuthStore } from '../../stores/auth'
import { useBoardStore } from '../../stores/Board'
import { motion } from 'framer-motion'
import boardService from '../../services/boardService'
import useInput from '../../hooks/useInput'
import useModal from '../../hooks/useModal'
import validate from '../../utils/validate'
import Input from '../common/Input'
import CloseButton from '../button/CloseButton'
import ColorSelector from '../common/ColorSelector'
import StatusMessage from '../common/StatusMessage'

const BoardModal = ({ openModal, closeModal }) => {
  const name = useInput('')
  const [selectedColor, setSelectedColor] = useState('#8498BE')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const { ref, handleCloseModal } = useModal(openModal, closeModal)
  const { accessToken } = useAuthStore()
  const { setBoards } = useBoardStore()

  const handleBoard = () => validate.validateField(name, validate.boardName)

  const handleColorChange = color => {
    setSelectedColor(prevColor => (prevColor === color ? null : color))
  }

  const handleCreateBoard = async e => {
    e.preventDefault()
    const boardError = handleBoard()

    if (boardError) {
      setError(true)
      setMessage('Corrige los errores antes de enviar el formulario')
      setTimeout(() => setMessage(null), 2500)
      return
    }

    try {
      const response = await boardService.createBoard(
        name.value,
        selectedColor,
        accessToken
      )
      if (response.ok) {
        const json = await response.json()
        closeModal()
        setBoards(json.boards)
      }
    } catch (error) {
      setError(true)
      setMessage('Error al crear tablero')
      setTimeout(() => setMessage(null), 2500)
    }
  }

  return (
    <motion.dialog
      ref={ref}
      onKeyDown={handleCloseModal}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className='w-full md:w-3/5 xl:w-1/4 p-6 rounded-2xl border border-slate-300 dark:border-slate-800 bg-athens-gray dark:bg-rich-black backdrop:backdrop-blur-md'
    >
      <form
        onSubmit={handleCreateBoard}
        className='flex flex-col gap-5 dark:text-white'
      >
        <header className='flex items-center justify-between'>
          <span className='text-lg font-medium'>
            {name.value ? name.value : 'Nuevo Tablero'}
          </span>
          <CloseButton onClick={closeModal} />
        </header>
        {message && <StatusMessage message={message} error={error} />}
        <div className='flex flex-col gap-2'>
          <span className='self-start text-sm'>Nombre del tablero</span>
          <Input
            onKeyUp={handleBoard}
            placeholder='ej. Proyecto 01'
            padding={'p-2'}
            {...name}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='self-start text-sm'>Elige un color</span>
          <ColorSelector
            selectedColor={selectedColor}
            onColorClick={handleColorChange}
          />
        </div>
        <button className='py-1.5 px-3 self-end rounded-md bg-azure hover:bg-azure-600 text-white transition-colors'>
          Crear Tablero
        </button>
      </form>
    </motion.dialog>
  )
}

export default BoardModal

import { useState } from 'react'
import { useAuthStore } from '../../stores/auth'
import { useColumnStore } from '../../stores/Column'
import { motion } from 'framer-motion'
import columnService from '../../services/columnService'
import CloseButton from '../button/CloseButton'
import Button from '../button/Button'

const ColumnCard = ({ boardId, createToast, closeCard }) => {
  const [editMode, setEditMode] = useState(true)
  const [title, setTitle] = useState('')
  const { accessToken } = useAuthStore()
  const { addColumn } = useColumnStore()

  const createColumn = async e => {
    e.preventDefault()
    try {
      if (!title) return
      const response = await columnService.createColumn(accessToken, title, boardId)
      if (response.ok) {
        const json = await response.json()
        addColumn(json)
        closeCard()
      }
    } catch (error) {
      createToast('error', 'Algo salió mal. Inténtalo más tarde')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
      className='flex py-2.5 px-4 h-fit w-72 min-w-72 mx-2 rounded-xl shadow-lg dark:shadow-none bg-athens-gray-100 dark:bg-vulcan text-eerie-black dark:text-white overflow-hidden'
    >
      <form
        onSubmit={createColumn}
        className='flex flex-col gap-3 justify-between w-full'
      >
        <div className='flex gap-2 justify-between '>
          {editMode ? (
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false)
              }}
              placeholder={title ? title : 'Ingresa el título de la lista'}
              className='w-full rounded-md px-1 font-medium bg-black bg-opacity-10 placeholder:text-gray-600 placeholder:dark:text-white '
            />
          ) : (
            <h2
              onClick={() => setEditMode(true)}
              className='w-full font-medium rounded-md px-1 hover:bg-black hover:bg-opacity-10'
            >
              {title ? title : 'Ingresa el título de la lista'}
            </h2>
          )}
          <CloseButton onClick={closeCard} />
        </div>
        <Button type='submit' text='Crear' padding='p-1.5' />
      </form>
    </motion.div>
  )
}

export default ColumnCard

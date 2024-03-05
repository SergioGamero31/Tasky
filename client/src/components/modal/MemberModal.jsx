import { useState } from 'react'
import { useAuthStore } from '../../stores/auth'
import { useBoardStore } from '../../stores/Board'
import { motion } from 'framer-motion'
import useModal from '../../hooks/useModal'
import useInput from '../../hooks/useInput'
import Input from '../common/Input'
import Button from '../button/Button'
import CloseButton from '../button/CloseButton'
import MemberCard from '../card/MemberCard'
import ErrorMessage from '../common/StatusMessage'
import validate from '../../utils/validate'
import boardService from '../../services/boardService'

const MemberModal = ({ openModal, closeModal }) => {
  const email = useInput()
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const { accessToken } = useAuthStore()
  const { board, setCurrentBoard } = useBoardStore()
  const { ref, handleCloseModal } = useModal(openModal, closeModal)

  const handleEmail = () => validate.validateField(email, validate.email)

  const handleInviteMember = async e => {
    e.preventDefault()
    const emailError = handleEmail()

    if (emailError) {
      setError(true)
      setMessage('Corrige los errores antes de enviar el formulario')
      setTimeout(() => setMessage(null), 2500)
      return
    }

    try {
      const res = await boardService.inviteMember(
        accessToken,
        board._id,
        email.value.toLowerCase()
      )
      if (res.ok) {
        const json = await res.json()
        setCurrentBoard(json.updatedBoard)
      } else {
        const json = await res.json()
        setError(true)
        setMessage(json.error)
        setTimeout(() => setMessage(null), 2500)
      }
    } catch (error) {
      setError(true)
      setMessage('Oops, algo salió mal. Inténtalo más tarde')
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
      className='flex flex-col gap-4 p-6 w-full md:w-3/5 lg:w-[30rem] rounded-2xl border border-slate-300 dark:text-white dark:border-slate-800 bg-athens-gray dark:bg-rich-black backdrop:backdrop-blur-sm'
    >
      <header className='flex gap-3 justify-between'>
        <h2 className='font-medium'>Agregar nuevo miembro</h2>
        <CloseButton onClick={closeModal} />
      </header>
      {message && <ErrorMessage message={message} error={error} />}
      <form onSubmit={handleInviteMember} className='flex gap-2 w-full'>
        <Input
          onKeyUp={handleEmail}
          type='email'
          placeholder='JuanPerez@ejemplo.com'
          {...email}
        />
        <Button text='Invitar' />
      </form>

      {board.members.length > 0 && (
        <section>
          <h3 className='text-slate-500'>Miembros</h3>
          <ul className='flex flex-col gap-1 mt-2'>
            {board.members.map(member => (
              <MemberCard
                key={member._id}
                member={member}
                setError={setError}
                setMessage={setMessage}
              />
            ))}
          </ul>
        </section>
      )}
    </motion.dialog>
  )
}

export default MemberModal

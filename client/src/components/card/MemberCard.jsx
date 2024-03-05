import { useBoardStore } from '../../stores/Board'
import { useAuthStore } from '../../stores/auth'
import DeleteIcon from '../icons/DeleteIcon'
import boardService from '../../services/boardService'

const MemberCard = ({ member, setError, setMessage }) => {
  const { user, accessToken } = useAuthStore()
  const { board, setCurrentBoard } = useBoardStore()

  const handleDeleteMember = async () => {
    try {
      const response = await boardService.removeMember(
        accessToken,
        board._id,
        member._id
      )
      if (response.ok) {
        const json = await response.json()
        setCurrentBoard(json.updatedBoard)
      } else {
        setError(true)
        setMessage('Error al eliminar miembro ')
        setTimeout(() => setMessage(null), 2500)
      }
    } catch (error) {
      setError(true)
      setMessage('Oops, algo salió mal. Inténtalo más tarde')
      setTimeout(() => setMessage(null), 2500)
    }
  }

  return (
    <li className='group/member flex items-center justify-between gap-2 px-1 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-vulcan transition-colors'>
      <div className='flex gap-2'>
        <img
          className='w-9 rounded-full bg-fuchsia-200'
          aria-label={`Imagen de perfil de`}
          src='/assets/frontend.webp'
        />
        <div className='flex flex-col'>
          <span className='text-sm'>{member.userName}</span>
          <span className='text-xs text-slate-500'>{member.email}</span>
        </div>
      </div>
      {user.id === member._id ? (
        <span className='text-sm text-slate-400'>(Tú)</span>
      ) : (
        <button
          onClick={handleDeleteMember}
          className='invisible flex items-center justify-center rounded-lg w-8 h-8 p-1 group-hover/member:visible hover:bg-rose-500/70 transition-colors'
        >
          <DeleteIcon width='1.1em' height='1.1em' />
        </button>
      )}
    </li>
  )
}

export default MemberCard

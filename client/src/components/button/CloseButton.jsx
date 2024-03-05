import CloseIcon from '../icons/CloseIcon'

const CloseButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      aria-label='Cerrar'
      className='self-end rounded-full p-1 hover:bg-athens-gray-200 dark:hover:bg-slate-700 transition-colors'
    >
      <CloseIcon />
    </button>
  )
}

export default CloseButton

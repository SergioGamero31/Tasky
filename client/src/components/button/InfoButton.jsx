import InfoIcon from '../icons/InfoIcon'

const InfoButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label='open info'
      className='absolute bottom-8 right-8 lg:bottom-16 lg:right-16 text-slate-600 hover:text-slate-500 dark:text-athens-gray-400 dark:hover:text-white transition-colors'
    >
      <InfoIcon width='1.7em' height='1.7em' />
    </button>
  )
}

export default InfoButton

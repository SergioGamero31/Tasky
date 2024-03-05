import { motion } from 'framer-motion'

const Tooltip = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role='tooltip'
      className='absolute -top-8 rounded-md text-xs p-1 px-2 font-medium bg-eerie-black text-white dark:bg-athens-gray-100 dark:text-eerie-black'
    >
      {message}
      <svg
        width='30'
        height='20'
        className='absolute rotate-180 text-eerie-black dark:text-athens-gray-100'
      >
        <polygon points='15, 10 30, 25 0, 25' fill='currentColor' />
      </svg>
    </motion.div>
  )
}

export default Tooltip

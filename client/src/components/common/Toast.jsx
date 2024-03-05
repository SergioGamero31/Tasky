import { motion } from 'framer-motion'
import CloseIcon from '../icons/CloseIcon'

const Toast = ({ type, message }) => {
  const colorVariants = {
    success: 'bg-emerald-500 text-eerie-black',
    error: 'bg-rose-500 text-white'
  }

  return (
    <motion.output
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ duration: 0.3 }}
      role='status'
      className={`flex items-center justify-between md:w-96 h-fit rounded-lg py-2 px-4 shadow-md font-medium ${colorVariants[type]}`}
    >
      {message}
      <button className='rounded-full p-1 hover:bg-black/15 transition-colors'>
        <CloseIcon />
      </button>
    </motion.output>
  )
}

export default Toast

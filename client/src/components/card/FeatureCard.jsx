import { motion } from 'framer-motion'

const FeatureCard = ({ title, content, img }) => {
  return (
    <motion.li className='flex flex-col items-center justify-between gap-3 w-full p-6 rounded-2xl shadow-md dark:shadow-none dark:text-white bg-white dark:bg-vulcan'>
      <img width={260} height={150} src={img} className='min-h-36 h-36' />
      <div className='flex flex-col gap-1'>
        <h3 className='text-lg font-medium'>{title}</h3>
        <p className='text-gray-500'>{content}</p>
      </div>
    </motion.li>
  )
}

export default FeatureCard

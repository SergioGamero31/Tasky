import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Tooltip from './Tooltip'

const DraggableWidget = ({ role, constraints }) => {
  const [tooltip, setToolTip] = useState(false)

  const colorVariants = {
    violet: 'bg-violet-200 text-violet-800',
    orange: 'bg-orange-200 text-orange-800',
    green: 'bg-green-200 text-green-800'
  }

  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragMomentum={false}
      dragConstraints={constraints}
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setToolTip(true)}
      onHoverEnd={() => setToolTip(false)}
      onDrag={() => setToolTip(false)}
      className={`hidden lg:flex flex-col items-center absolute cursor-grab active:cursor-grabbing`}
      style={role.position}
    >
      <AnimatePresence>
        {tooltip && <Tooltip message='Arrástrame!' />}
      </AnimatePresence>
      <img
        draggable='false'
        className='select-none w-20 rounded-full bg-slate-300'
        title='Drag me!'
        src={role.img}
        alt={role.role}
      />

      <span
        className={`py-2 px-4 rounded-2xl -mt-3 -rotate-3 text-xs font-bold ${
          colorVariants[role.color]
        }`}
      >
        {role.role}
      </span>
    </motion.div>
  )
}

export default DraggableWidget

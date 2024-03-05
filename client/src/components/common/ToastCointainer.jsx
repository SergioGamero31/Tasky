import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import Toast from './Toast'

const ToastCointainer = ({ toastList }) => {
  return createPortal(
    <div className='fixed flex flex-col gap-3 right-8 bottom-8 '>
      <AnimatePresence>
        {toastList?.map(t => (
          <Toast key={t.id} type={t.type} message={t.message} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  )
}

export default ToastCointainer

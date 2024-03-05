import { useRef, useEffect } from 'react'

const useModal = (openModal, closeModal) => {
  const ref = useRef()

  useEffect(() => {
    if (openModal) ref.current.showModal()
    else ref.current.close()
  }, [openModal])

  const handleCloseModal = e => e.key === 'Escape' && closeModal()

  return { ref, handleCloseModal }
}
export default useModal

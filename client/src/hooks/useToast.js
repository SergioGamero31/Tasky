import { useState } from 'react'

const useToast = () => {
  const [toastList, setToastList] = useState([])

  const createToast = (type, message) => {
    const id = Date.now().toString(36)
    setToastList(prevList => [...prevList, { id, type, message }])

    setTimeout(() => {
      setToastList(prevList => prevList.slice(1))
    }, 4000)
  }

  return { toastList, createToast }
}

export default useToast

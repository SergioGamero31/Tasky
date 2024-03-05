import { useState } from 'react'

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState()

  const handleChange = e => {
    setValue(e.target.value)
  }

  return { value, error, setError, onChange: handleChange }
}

export default useInput

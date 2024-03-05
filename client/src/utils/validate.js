import { errors } from '../constants/authErrors'

const validateField = (field, validateFn) => {
  const error = validateFn(field.value)
  field.setError(error)
  return !!error
}

//autenticacion
const email = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email) return errors.email.MISSING
  else if (!regex.test(email)) return errors.email.INVALID_FORMAT
  else return null
}

const userName = userName => {
  if (!userName) return errors.userName.MISSING
  else if (userName.length < 4) return errors.userName.TOO_SHORT
  else return null
}

const password = password => {
  const regex = /^(?=.*[A-Z])(?=.*\d)/

  if (!password) return errors.password.MISSING
  else if (password.length < 8) return errors.password.TOO_SHORT
  else if (!regex.test(password)) return errors.password.MISSING_UPPERCASE
  else return null
}

const confirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return errors.password.MISSING
  if (password !== confirmPassword) return errors.password.MISSMATCH
  else return null
}

//board
const boardName = name => {
  if (!name) return errors.field.MISSING
  else return null
}

export default {
  validateField,
  email,
  userName,
  password,
  confirmPassword,
  boardName
}

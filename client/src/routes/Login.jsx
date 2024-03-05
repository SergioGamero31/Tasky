import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/auth'
import { motion, AnimatePresence } from 'framer-motion'
import authService from '../services/authService'
import validate from '../utils/validate'
import InfoModal from '../components/modal/InfoModal'
import LargeButton from '../components/button/LargeButton'
import useInput from '../hooks/useInput'
import Input from '../components/common/Input'
import StatusMessage from '../components/common/StatusMessage'
import AtIcon from '../components/icons/AtIcon'
import LockIcon from '../components/icons/LockIcon'
import InfoButton from '../components/button/InfoButton'

const Login = () => {
  const email = useInput()
  const password = useInput()
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)
  const [infoModal, setInfoModal] = useState(false)

  const { isAuth, setTokens, setUser } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) navigate('/dashboard')
  })

  const handleEmail = () => validate.validateField(email, validate.email)
  const handlePassword = () => validate.validateField(password, validatePassword)

  const validatePassword = () => {
    if (!password.value) return 'La contraseña es obligatoria'
    else return null
  }

  const handleLogin = async e => {
    e.preventDefault()

    const emailError = handleEmail()
    const passwordError = handlePassword()

    if (emailError || passwordError) {
      setError(true)
      setMessage('Corrige los errores antes de enviar el formulario')
      setTimeout(() => setMessage(null), 2500)
      return
    }

    try {
      const response = await authService.login(email.value, password.value)
      if (response.ok) {
        const data = await response.json()
        setTokens(data.accessToken, data.refreshToken)
        setUser(data.user)
        navigate('/dashboard')
      } else {
        const json = await response.json()
        setError(true)
        setMessage(json.error)
        setTimeout(() => setMessage(null), 2500)
      }
    } catch (error) {
      setError(true)
      setMessage('Oops, algo salió mal. Inténtalo más tarde')
      setTimeout(() => setMessage(null), 2500)
    }
  }

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className='flex items-center justify-center gap-12 w-full'
    >
      <form
        onSubmit={handleLogin}
        className='flex shrink-0 flex-col gap-8 py-8 px-12 rounded-3xl w-[25rem] md:border border-azure-400 text-[#252525] dark:text-white'
      >
        <h2 className='self-center text-2xl font-bold text-rich-black-900 dark:text-white'>
          Iniciar Sesión
        </h2>
        {message && <StatusMessage message={message} error={error} />}
        <div className='flex flex-col gap-4'>
          <Input
            onKeyUp={handleEmail}
            type='email'
            placeholder='Email'
            icon={<AtIcon />}
            {...email}
          />
          <Input
            onKeyUp={handlePassword}
            type='password'
            placeholder='Contraseña'
            icon={<LockIcon />}
            {...password}
          />
        </div>
        <a
          href='#'
          className='text-sm font-medium text-[#000932] dark:text-white underline underline-offset-4'
        >
          ¿Olvidaste tu Contraseña?
        </a>
        <LargeButton text='Iniciar Sesión' />
        <span className='text-sm self-center text-gray-400'>
          ¿Aun no tienes una cuenta?{' '}
          <Link
            to='/signup'
            className='font-medium text-[#000932] dark:text-white underline underline-offset-4'
          >
            Registrate
          </Link>
        </span>
      </form>
      <img
        width={450}
        height={450}
        src='/assets/welcome.svg'
        alt='Ilustración de bienvenida'
        className='hidden lg:block'
      />
      <InfoButton onClick={() => setInfoModal(true)} />
      <AnimatePresence>
        {infoModal && (
          <InfoModal openModal={infoModal} closeModal={() => setInfoModal(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Login

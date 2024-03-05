import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/auth'
import { motion, AnimatePresence } from 'framer-motion'
import LargeButton from '../components/button/LargeButton'
import StatusMessage from '../components/common/StatusMessage'
import InfoModal from '../components/modal/InfoModal'
import InfoButton from '../components/button/InfoButton'
import Input from '../components/common/Input'
import AtIcon from '../components/icons/AtIcon'
import UserIcon from '../components/icons/UserIcon'
import LockIcon from '../components/icons/LockIcon'
import useInput from '../hooks/useInput'
import validate from '../utils/validate'

const SignUp = () => {
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const storedModal = JSON.parse(localStorage.getItem('info-modal') || 'true')
  const [infoModal, setInfoModal] = useState(storedModal)

  const { isAuth } = useAuthStore()

  const email = useInput()
  const userName = useInput()
  const password = useInput()

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) navigate('/dashboard')
  })
  useEffect(() => {
    localStorage.setItem('info-modal', JSON.stringify(infoModal))
  }, [infoModal])

  const handleEmail = () => validate.validateField(email, validate.email)
  const handleUserName = () => validate.validateField(userName, validate.userName)
  const handlePassword = () => validate.validateField(password, validate.password)

  const handleSignUp = async e => {
    e.preventDefault()
    const emailError = handleEmail()
    const userError = handleUserName()
    const passwordError = handlePassword()

    if (emailError || userError || passwordError) {
      setError(true)
      setMessage('Corrige los errores antes de enviar el formulario')
      setTimeout(() => setMessage(null), 2500)
      return
    }
    setInfoModal(true)

    /*try {
      const response = await authService.signUp(
        email.value,
        userName.value,
        password.value
      )
      if (response.ok) {
        //Redirigir a dashboard o login
        navigate('/login')
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
    }*/
  }

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      className='flex items-center justify-center gap-12 w-full'
    >
      <form
        onSubmit={handleSignUp}
        className='flex shrink-0 flex-col gap-8 py-8 px-12 w-[25rem] rounded-3xl md:border border-azure-400 text-[#252525] dark:text-white'
      >
        <h2 className='self-center text-2xl font-bold text-rich-black-900 dark:text-white'>
          Regístrate
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
            onKeyUp={handleUserName}
            type='text'
            placeholder='Nombre de usuario'
            icon={<UserIcon />}
            {...userName}
          />
          <Input
            onKeyUp={handlePassword}
            type='password'
            placeholder='Contraseña'
            icon={<LockIcon />}
            {...password}
          />
        </div>
        <LargeButton text='Registrarse' />
        <span className='text-sm self-center text-gray-400'>
          ¿Ya tienes una cuenta?{' '}
          <Link
            to='/login'
            className='font-medium text-[#000932] dark:text-white underline underline-offset-4'
          >
            Inicia Sesión
          </Link>
        </span>
      </form>
      <img
        width={450}
        height={450}
        src='/assets/task_list.svg'
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

export default SignUp

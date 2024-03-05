import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../../stores/auth'
import { useBoardStore } from '../../stores/Board'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeSwitcher from './ThemeSwitcher'
import PowerIcon from '../icons/PowerIcon'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { isAuth, user, clearTokens } = useAuthStore()
  const { clearBoards } = useBoardStore()

  const handleLogOut = () => {
    setOpenMenu(false)
    clearBoards()
    clearTokens()
  }

  return (
    <header className='flex items-center justify-between px-8 py-3 border-b border-slate-300 dark:border-slate-800 bg-athens-gray dark:bg-rich-black'>
      <Link
        to={isAuth ? '/dashboard' : '/'}
        className='text-xl font-bold text-azure hover:text-azure-600 transition-colors drop-shadow-[1px_2px_1px_rgba(0,0,0,0.1)]'
      >
        Tasky
      </Link>
      {isAuth && (
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className='flex items-center gap-3 py-1.5 px-4 rounded-md hover:cursor-pointer hover:bg-slate-200 dark:hover:bg-vulcan transition-colors'
        >
          <span className='dark:text-white'>{user ? user.userName : 'Usuario'}</span>
          <img
            className='w-9 rounded-full bg-fuchsia-200'
            aria-label={`Imagen de perfil de ${user.userName}`}
            src='/assets/frontend.webp'
          />
        </button>
      )}

      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='absolute top-16 right-8 z-50'
          >
            <ul className='flex flex-col gap-1 py-4 px-5 rounded-lg dark:text-white bg-athens-gray dark:bg-rich-black border border-slate-300 dark:border-slate-800'>
              <li className='flex gap-3 items-center py-1 px-2 '>
                Modo Oscuro <ThemeSwitcher />
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className='flex items-center gap-3 w-full py-1 px-2 rounded-md hover:cursor-pointer hover:bg-slate-200 dark:hover:bg-vulcan transition-colors'
                >
                  Cerrar Sesión <PowerIcon />
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

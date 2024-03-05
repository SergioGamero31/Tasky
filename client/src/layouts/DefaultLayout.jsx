import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeStore } from '../stores/theme'
import Header from '../components/common/Header'

const DefaultLayout = () => {
  const theme = useThemeStore(state => state.theme)

  useEffect(() => {
    document.querySelector('html').classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className='flex flex-col h-dvh overflow-hidden'>
      <Header />
      <main className='flex h-full bg-athens-gray dark:bg-rich-black'>
        <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout

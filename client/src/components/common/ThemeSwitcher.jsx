import { useThemeStore } from '../../stores/theme'

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <label className='relative inline-flex items-center cursor-pointer'>
      <input
        name='themeSwitch'
        onChange={toggleTheme}
        type='checkbox'
        checked={theme === 'dark'}
        className='sr-only peer'
      />
      <div className="group peer ring-0 bg-slate-400 rounded-full outline-none duration-300 after:duration-300 w-12 h-6 shadow-md peer-checked:bg-vulcan peer-focus:outline-none  after:content-[' ']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-checked:after:content-[' '] peer-hover:after:scale-95 peer-checked:after:rotate-0"></div>
    </label>
  )
}

export default ThemeSwitcher

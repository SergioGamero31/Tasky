import { create } from 'zustand'
import { persist } from 'zustand/middleware'

//prettier-ignore
export const useThemeStore = create(
  persist(
    set => ({
        theme: 'ligth',
        toggleTheme: () => set(state => ({ theme: state.theme === 'ligth' ? 'dark' : 'ligth' }))
    }),
    {
      name:'theme-store'
    }
  )
)

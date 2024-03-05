import { create } from 'zustand'
import Cookies from 'js-cookie'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    set => ({
      isAuth: Cookies.get('accessToken') || Cookies.get('refreshToken'),
      accessToken: Cookies.get('accessToken'),
      refreshToken: Cookies.get('refreshToken'),
      user: null,

      setTokens: (accessToken, refreshToken) => {
        Cookies.set('accessToken', accessToken, { expires: 1 })
        Cookies.set('refreshToken', refreshToken, { expires: 7 })
        set({ accessToken, refreshToken, isAuth: true })
      },
      clearTokens: () => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuth: false
        })
      },
      setUser: user => {
        set({ user })
      }
    }),
    {
      name: 'user',
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ['user'].includes(key))
        )
    }
  )
)

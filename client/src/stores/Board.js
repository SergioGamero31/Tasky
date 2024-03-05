import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useBoardStore = create(
  persist(
    set => ({
      board: {},
      boards: [],
      isEmpty: null,
      setCurrentBoard: newBoard => set({ board: newBoard }),
      setBoards: boards => set({ boards: boards }),
      clearBoards: () => set({ boards: {}, isEmpty: true }),
      clearCurrentBoard: () => set({ board: {} })
    }),
    {
      name: 'boards',
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ['boards'].includes(key))
        )
    }
  )
)

import { create } from 'zustand'

//prettier-ignore
export const useColumnStore = create(
    set => ({
        columns: [],
        setColumns: (newColumns) => set({columns: newColumns}),
        addColumn: (column) => set(state => ({
            columns: state.columns.concat({...column})
        })),
        deleteColumn: id => set(state => ({ columns: state.columns.filter(col => col._id != id)})),
        updateTitle: (id, title) => {
            set(state => ({
                columns: state.columns.map(col => col._id !== id ? col : {...col, title})
            }))
        },
        setTask: (task) => {
            set((state) => {
              const newColumns = [...state.columns];
              const columnIndex = newColumns.findIndex((c) => c._id === task.columnId);
              const taskIndex = newColumns[columnIndex].tasks.findIndex((t) => t._id === task._id);
              newColumns[columnIndex].tasks[taskIndex] = task;
              return { columns: newColumns };
            });
        },
        deleteTask: (task) =>{
            set((state) =>{
                const newColumns = [...state.columns];
                const columnIndex = newColumns.findIndex((c) => c._id === task.columnId);
                const taskIndex = newColumns[columnIndex].tasks.findIndex((t) => t._id === task._id);
                newColumns[columnIndex].tasks.splice(taskIndex, 1);
                return {columns: newColumns}
            })
        }
    }),    
)

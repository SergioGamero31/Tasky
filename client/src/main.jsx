import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import BoardError from './components/common/BoardError.jsx'
import Loader from './components/common/Loader.jsx'
import Login from './routes/Login.jsx'
import SignUp from './routes/SignUp.jsx'
import DefaultLayout from './layouts/DefaultLayout.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
const Dashboard = lazy(() => import('./routes/Dashboard.jsx'))
const Board = lazy(() => import('./routes/Board.jsx'))
import { useAuthStore } from './stores/auth.js'
import boardService from './services/boardService.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        element: (
          <Suspense fallback={<Loader width='3.5em' height='3.5em' />}>
            <ProtectedRoute />
          </Suspense>
        ),
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />
          },
          {
            path: '/board/:boardId',
            element: <Board />,
            errorElement: <BoardError />,
            async loader({ params }) {
              const accessToken = useAuthStore.getState().accessToken
              const data = boardService
                .getBoardById(accessToken, params.boardId)
                .then(res => {
                  if (res.status === 404) {
                    throw { message: 'Tablero no encontrado', status: res.status }
                  }
                  if (res.status === 500) {
                    throw { message: 'Internal Server Error', status: res.status }
                  }
                  return res
                })
              return { board: data }
            }
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)

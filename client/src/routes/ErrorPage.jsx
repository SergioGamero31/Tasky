import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center justify-center p-5 lg:p-0 h-screen bg-white dark:bg-rich-black'>
      <img
        src='/assets/notFound.svg'
        alt='Illustración de error 404'
        width={500}
        height={500}
      />
      <div className='flex flex-col gap-3 items-center text-center text-slate-700 dark:text-white'>
        <span className='text-xl font-bold'>
          ¡Uh-oh! Te has aventurado en un callejón sin salida
        </span>
        <span className='text-balance md:w-9/12 text-slate-500 dark:text-slate-400'>
          ¿Por qué no volvemos al camino principal?
        </span>
      </div>
      <Link
        to='/'
        className='py-3 px-6 mt-5 rounded-lg self-center text-white bg-azure hover:bg-azure-600 transition-colors'
      >
        Volver al inicio
      </Link>
    </div>
  )
}

export default ErrorPage

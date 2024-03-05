import { Link, useRouteError } from 'react-router-dom'

const BoardError = () => {
  const error = useRouteError()
  let description = 'Opps! algo salío mal. Inténtalo más tarde.'
  let imgSrc = '/assets/error_state.svg'

  if (error.status === 404) {
    imgSrc = '/assets/404.svg'
    description = 'Ingresa un enlace correcto o vuelve al inicio.'
  } else if (error.status === 500) {
    imgSrc = '/assets/500.svg'
  }

  return (
    <div className='flex flex-col md:flex-row flex-1 items-center justify-center p-5 gap-10'>
      <img src={imgSrc} width={370} height={370} className='hidden md:block' />
      <div className='flex flex-col gap-5  text-center lg:text-left'>
        <span className='text-8xl lg:text-9xl text-azure'>{error.status}</span>
        <div className='flex flex-col'>
          <span className='uppercase font-medium text-lg text-slate-600 dark:text-slate-400'>
            {error.message}
          </span>
          <span className='text-slate-500'>{description}</span>
        </div>
        <Link
          to='/dashboard'
          className='lg:self-start py-2.5 px-5 rounded-lg bg-azure hover:bg-azure-600 text-white transition-colors'
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default BoardError

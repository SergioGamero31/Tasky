import { Suspense, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../stores/theme'
import { roles, questions } from '../constants/landingData'
import Header from '../components/common/Header'
import FeatureCard from '../components/card/FeatureCard'
import DraggableWidget from '../components/common/DraggableWidget'
import Question from '../components/common/Question'

const Root = () => {
  const theme = useThemeStore(state => state.theme)
  const constraintsRef = useRef()
  const windowWidth = window.innerWidth

  useEffect(() => {
    document.querySelector('html').classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <Suspense>
      <div className='flex flex-col overflow-x-hidden bg-athens-gray dark:bg-rich-black text-eerie-black dark:text-white'>
        <Header />
        <main className='flex-1'>
          <section
            ref={constraintsRef}
            className='flex relative flex-col items-center justify-center gap-9 h-dvh lg:h-[95vh] '
          >
            <h1 className='text-center text-2xl lg:text-4xl font-semibold '>
              Organiza, Visualiza, Realiza <br />
              <span className='text-azure'>Tasky</span>, tu nuevo gestor de tareas
            </h1>
            <Link
              to='/login'
              className='py-2.5 px-4 rounded-lg text-white bg-azure hover:bg-azure-600 transition-colors'
            >
              Empieza Ahora
            </Link>

            {windowWidth > 768 &&
              roles.map(role => (
                <DraggableWidget
                  key={role.id}
                  role={role}
                  constraints={constraintsRef}
                />
              ))}
          </section>
          <section className='flex items-center justify-center p-8 m-auto max-w-6xl lg:h-screen'>
            <div className='flex flex-col gap-16'>
              <div className='flex flex-col gap-3'>
                <h2 className='text-xl lg:text-3xl font-bold dark:text-white'>
                  Encuentra el Equilibrio en tu día a día
                </h2>
                <p className='lg:text-lg md:w-3/4 lg:w-2/5 text-slate-500'>
                  Tasky es mas que un simple organizador, es tu tablero visual que
                  transforma tus listas de tareas en flujos de trabajo intuitivos.
                </p>
              </div>
              <ul className='flex flex-wrap lg:flex-nowrap gap-5'>
                <FeatureCard
                  img='/assets/board.svg'
                  title='Flujo de trabajo sencillo'
                  content='Diseñado para la máxima simplicidad. Gestiona tus tareas con un simple arrastrar y soltar, sin complicaciones.'
                />
                <FeatureCard
                  img='/assets/puzzle.svg'
                  title='Colaboración de tareas'
                  content='Trabaja en equipo de manera eficiente. Colabora con colegas, asigna tareas y mantén a todos en la misma página.'
                />
                <FeatureCard
                  img='/assets/devices.svg'
                  title='Acceso desde Cualquier Lugar'
                  content='Sincroniza tus tareas en todos tus dispositivos y mantén el control, ¡siempre gratis!'
                />
              </ul>
            </div>
          </section>
          <section className='flex items-center justify-center p-8 max-w-6xl m-auto lg:h-screen dark:text-white'>
            <div className='flex flex-col md:flex-row justify-between gap-8'>
              <div className='flex flex-col items-center gap-7'>
                <h2 className='text-xl lg:text-3xl font-bold text-nowrap dark:text-white'>
                  Preguntas Frecuentes
                </h2>
                <img
                  width={220}
                  height={320}
                  src='/assets/faq.svg'
                  alt='ilustracion FAQ'
                  className='hidden md:block'
                />
              </div>
              <div className='flex flex-col gap-7 lg:w-3/5'>
                {questions.map(qn => (
                  <Question key={qn.id} question={qn.question} answer={qn.answer} />
                ))}
              </div>
            </div>
          </section>
        </main>
        <footer className='flex flex-col items-center gap-1 p-4 border-t border-slate-300 dark:border-slate-800 text-slate-500'>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://storyset.com/'
            className='underline underline-offset-2 hover:text-slate-700 dark:hover:text-slate-400 transition-colors'
          >
            Illustrations by Storyset
          </a>
        </footer>
      </div>
    </Suspense>
  )
}

export default Root

import UpIcon from '../icons/UpIcon'

const Question = ({ question, answer }) => {
  return (
    <details className='group'>
      <summary className='flex items-baseline justify-between gap-3 cursor-pointer'>
        <h3 className='lg:text-lg lg:font-medium hover:text-azure-400 transition-colors'>
          {question}
        </h3>
        <UpIcon width='1.2em' height='1.2em' />
      </summary>
      <p className='text-slate-500 mt-2'>{answer}</p>
    </details>
  )
}

export default Question

const LargeButton = ({ text }) => {
  return (
    <button className='p-3 rounded-lg font-medium text-lg text-white dark:text-rich-black bg-[#000932] dark:bg-white dark:hover:bg-gray-200 transition-colors'>
      {text}
    </button>
  )
}

export default LargeButton

const Input = ({ onChange, onKeyUp, type, placeholder, error, icon, padding }) => {
  return (
    <div className='flex flex-col flex-grow'>
      <label
        className={`flex items-center px-3 rounded-xl bg-slate-200 dark:bg-vulcan focus-within:outline outline-azure-400 outline-offset-0 outline-1
        ${error ? 'outline outline-rose-500' : 'outline-azure-400'}`}
      >
        {icon}
        <input
          onChange={onChange}
          onKeyUp={onKeyUp}
          type={type}
          placeholder={placeholder}
          className={` ${
            padding ? padding : 'p-3'
          } w-full bg-transparent focus:outline-none`}
        />
      </label>
      <span className='text-sm text-rose-500'>{error}</span>
    </div>
  )
}

export default Input

const Button = ({ onclick, type, text, buttonStyle, icon, padding }) => {
  const primaryStyle = `bg-azure hover:bg-azure-600 text-white`
  const secondaryStyle = `border border-border-slate-300 dark:border-slate-800 bg-athens-gray-100 dark:bg-vulcan hover:bg-athens-gray-200 dark:hover:bg-slate-800 text-eerie-black dark:text-white`

  return (
    <button
      type={type}
      onClick={onclick}
      className={`rounded-lg transition-colors ${
        padding ? padding : 'py-2.5 px-4'
      } ${buttonStyle == 'secondary' ? secondaryStyle : primaryStyle}`}
    >
      {text}
      {icon}
    </button>
  )
}

export default Button

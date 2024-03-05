//prettier-ignore
const StatusMessage = ({ message, error, position }) => {
  const errorStyle = `flex ${position} py-2 px-4 rounded-lg border border-rose-500 bg-rose-500 bg-opacity-25`
  const defaultStyle = `flex ${position} py-2 px-4 rounded-lg border border-emerald-500 bg-emerald-500 bg-opacity-25`

  if (message === null) return null
  return <span className={error ? errorStyle : defaultStyle}>{message}</span>
}

export default StatusMessage

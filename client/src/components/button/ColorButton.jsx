const ColorButton = ({ color, selectedColor, onClick }) => {
  return (
    <button
      type='button'
      onClick={() => onClick(color)}
      className={`h-6 w-6 rounded-full ${
        selectedColor === color &&
        'ring-1 ring-rich-black dark:ring-white ring-offset-2 dark:ring-offset-rich-black'
      }`}
      aria-label={`Seleccionar color ${color}`}
      style={{ backgroundColor: color }}
    ></button>
  )
}

export default ColorButton

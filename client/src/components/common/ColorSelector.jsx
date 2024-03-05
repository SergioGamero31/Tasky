import ColorButton from '../button/ColorButton'

const ColorSelector = ({ selectedColor, onColorClick }) => {
  const colors = ['#8498BE', '#607EBF', '#26282E', '#60AEBC', '#FABFB7']

  return (
    <fieldset className='flex gap-2'>
      {colors.map(color => (
        <ColorButton
          key={color}
          color={color}
          selectedColor={selectedColor}
          onClick={onColorClick}
        />
      ))}
    </fieldset>
  )
}

export default ColorSelector

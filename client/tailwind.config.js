/** @type {import('tailwindcss').Config} */
// prettier-ignore
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        'eerie-black': '#252525',
        'vulcan': '#1A1D26',
        'manatee': {
          DEFAULT: '#808694',
          500: '#A0A8B4',
          600: '#8A92A1'
        }, 
        'gunmetal': '#282D39',
        'azure': {
          DEFAULT: '#407BFF',
          400:'#5998FF',
          600: '#1B50F5'
        },
        'rich-black': {
          DEFAULT: '#0F1117',
          800: '#353F57',
          900: '#30374A'
        },
        'athens-gray': {
          DEFAULT: '#F5F6F9',
          100: '#EBEDF3',
          200: '#D6DBE7',
          300: '#BAC2d6',
          400: '#99A4C1'
        } 
      }
    },
  },
  plugins: [
   (
    function ({addVariant}){
      addVariant('supports-scrollbars', '@supports selector(::-webkit-scrollbar)')
      addVariant('children', '& > *')
      addVariant('scrollbar', '&::-webkit-scrollbar')
      addVariant('scrollbar-track', '&::-webkit-scrollbar-track')
      addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb')
    })
  ],
}

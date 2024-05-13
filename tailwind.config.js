/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {},
    colors: {
      'navbarpurple': '#4A4E70',
      'primarybutton': '#A0EBD1',
      'primarybuttondark': '#8DE7C8',
      'generalbackground': '#F5F4F4',
      'widgetaccent': '#D7DEE1',
      'white': '#FFFFFF',
      
      primary: {
        //flowbite
        50: '#FFF5F2',
        100: '#FFF1EE',
        200: '#FFE4DE',
        300: '#FFD5CC',
        400: '#FFBCAD',
        500: '#FE795D',
        600: '#EF562F',
        700: '#EB4F27',
        800: '#CC4522',
        900: '#A5371B'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}


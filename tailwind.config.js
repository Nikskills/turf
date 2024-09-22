/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'navbarpurple': '#4A4E70',
        'primarybutton': '#8656b5',
        'primarybuttondark': '#8DE7C8',
        'generalbackground': '#fbfafd',
        'widgetaccent': '#D7DEE1',
        'white': '#FFFFFF',
        'black': '#110b1a',
        'primary': '#8656b5',
        'secondary': '#d8a6ab',
        'accent': '#f83b7b',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}


import plugin from 'tailwindcss/plugin';

// noinspection JSUnusedGlobalSymbols
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        extend: 'extend 250ms ease-in-out forwards'
      },
      inset: ({ theme }) => ({
        dropdown: `calc(100% + ${ theme('spacing.1') })`
      }),
      keyframes: {
        extend: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      }
    }
  },
  plugins: [
    plugin(({ addVariant }) => addVariant('nav', '&>*:not(:first-child)'))
  ]
};


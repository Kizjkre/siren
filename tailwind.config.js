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
      height: {
        timbral: '100px',
        time: '50px',
        track: '150px'
      },
      inset: ({ theme }) => ({
        dropdown: `calc(100% + ${ theme('spacing.1') })`
      }),
      keyframes: {
        extend: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
      minHeight: ({ theme }) => ({
        ...theme('spacing')
      }),
      spacing: {
        'track-header': '200px'
      }
    }
  },
  plugins: [
    plugin(({ addVariant }) => addVariant('aside-action', '&>button')),
    plugin(({ addVariant }) => addVariant('nav', '&>*:not(:first-child)'))
  ]
};


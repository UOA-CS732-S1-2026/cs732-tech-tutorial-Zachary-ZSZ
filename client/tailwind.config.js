/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // ── Color tokens (migrated from prototype inline config) ──────────────
      colors: {
        // Core brand
        'primary':                   '#e6c364',
        'primary-container':         '#c9a84c',
        'primary-fixed':             '#ffe08f',
        'primary-fixed-dim':         '#e6c364',
        'on-primary':                '#3d2e00',
        'on-primary-container':      '#503d00',
        'on-primary-fixed':          '#241a00',
        'on-primary-fixed-variant':  '#584400',
        'inverse-primary':           '#755b00',

        // Secondary
        'secondary':                 '#d8c598',
        'secondary-container':       '#554825',
        'secondary-fixed':           '#f5e1b2',
        'secondary-fixed-dim':       '#d8c598',
        'on-secondary':              '#3b2f0e',
        'on-secondary-container':    '#c9b78b',
        'on-secondary-fixed':        '#241a00',
        'on-secondary-fixed-variant':'#524523',

        // Tertiary
        'tertiary':                  '#b9c4ff',
        'tertiary-container':        '#9ba8eb',
        'tertiary-fixed':            '#dde1ff',
        'tertiary-fixed-dim':        '#b9c3ff',
        'on-tertiary':               '#1e2b66',
        'on-tertiary-container':     '#2e3b77',
        'on-tertiary-fixed':         '#041451',
        'on-tertiary-fixed-variant': '#35437e',

        // Surface hierarchy (depth stack: lowest → low → base → high → highest)
        'surface':                   '#131313',
        'surface-dim':               '#131313',
        'surface-container-lowest':  '#0e0e0e',
        'surface-container-low':     '#1c1b1b',
        'surface-container':         '#201f1f',
        'surface-container-high':    '#2a2a2a',
        'surface-container-highest': '#353534',
        'surface-bright':            '#3a3939',
        'surface-variant':           '#353534',
        'surface-tint':              '#e6c364',

        // On-surface
        'on-surface':                '#e5e2e1',
        'on-surface-variant':        '#d0c5b2',
        'on-background':             '#e5e2e1',
        'inverse-surface':           '#e5e2e1',
        'inverse-on-surface':        '#313030',

        // Outline
        'outline':                   '#99907e',
        'outline-variant':           '#4d4637',

        // Background
        'background':                '#131313',

        // Error
        'error':                     '#ffb4ab',
        'error-container':           '#93000a',
        'on-error':                  '#690005',
        'on-error-container':        '#ffdad6',
      },

      // ── Border radius ─────────────────────────────────────────────────────
      borderRadius: {
        DEFAULT: '1rem',
        lg:      '2rem',
        xl:      '3rem',
        full:    '9999px',
      },

      // ── Font families ─────────────────────────────────────────────────────
      fontFamily: {
        headline: ['"Noto Serif"', 'Georgia', 'serif'],
        body:     ['Inter', 'system-ui', 'sans-serif'],
        label:    ['Inter', 'system-ui', 'sans-serif'],
      },

      // ── Semantic type scale (fills the gap from DESIGN.md) ───────────────
      fontSize: {
        'display-lg': ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display':    ['3.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'headline':   ['2.25rem', { lineHeight: '1.2',  letterSpacing: '-0.005em' }],
        'title-lg':   ['1.375rem',{ lineHeight: '1.4' }],
        'title':      ['1.125rem',{ lineHeight: '1.5' }],
        'title-sm':   ['0.875rem',{ lineHeight: '1.5' }],
        'body-lg':    ['1rem',    { lineHeight: '1.7' }],
        'body':       ['0.9375rem',{ lineHeight: '1.6' }],
        'body-sm':    ['0.875rem',{ lineHeight: '1.6' }],
        'label':      ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05rem' }],
        'label-sm':   ['0.625rem',{ lineHeight: '1.4', letterSpacing: '0.1rem' }],
      },

      // ── Letter spacing extras ─────────────────────────────────────────────
      letterSpacing: {
        'label':   '0.1rem',
        'catalog': '0.2rem',
        'wide-xl': '0.3rem',
      },

      // ── Transitions (luxury timing) ───────────────────────────────────────
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
      },

      // ── Max widths ────────────────────────────────────────────────────────
      maxWidth: {
        'screen-2xl': '1536px',
      },
    },
  },
  plugins: [],
}

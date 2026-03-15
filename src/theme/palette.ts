import '@mui/material/styles'
import { alpha } from '@mui/material/styles'

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

declare module '@mui/material/styles' {
  interface TypeBackground {
    neutral: string
  }
  interface SimplePaletteColorOptions {
    lighter?: string
    darker?: string
  }
  interface PaletteColor {
    lighter?: string
    darker?: string
  }
}

// SETUP COLORS

// Derived directly from component — warm greige neutrals
const GREY = {
  0: '#FFFFFF',
  100: '#FAFAF7', // warm off-white (background.default)
  200: '#EDEAE2', // linen section bg (background.neutral)
  300: '#D8D2C6', // divider line color
  400: '#E0D9D0', // input border color
  500: '#B8A898', // placeholder / disabled text
  600: '#6B5344', // muted warm brown (text.secondary, icons)
  700: '#8C4A28', // deep terracotta
  800: '#2C1A0E', // dark warm brown (text.primary, headings)
  900: '#1A0F08' // near-black espresso (dark bg default)
}

// 🍑 Primary — Healingy peach (buttons, CTAs)
const PRIMARY = {
  lighter: '#FDF2EC', // barely-there blush
  light: '#FAD9C0', // soft pastel peach
  main: '#F5C5A3', // ✅ exact button fill (#f5c5a3 from component)
  dark: '#EDB48A', // ✅ exact hover state (#edb48a from component)
  darker: '#8C4A28', // deep terracotta for text on peach
  contrastText: '#2C1A0E' // ✅ dark brown button label
}

// 🌿 Secondary — warm sage (complements linen)
const SECONDARY = {
  lighter: '#F2F3EE',
  light: '#D4D9C5',
  main: '#A8B08E', // muted sage
  dark: '#6B7855',
  darker: '#3A4228',
  contrastText: '#FFFFFF'
}

// 🩵 Info — muted dusty blue
const INFO = {
  lighter: '#EBF3FA',
  light: '#B8D4EC',
  main: '#7EB0D5',
  dark: '#4180A8',
  darker: '#1D4F72',
  contrastText: '#FFFFFF'
}

// 🌿 Success — exact from component submit success state
const SUCCESS = {
  lighter: '#EDF7F1',
  light: '#C8EDD4',
  main: '#A8DFBA', // ✅ exact success button bg (#a8dfba from component)
  dark: '#3A8A57',
  darker: '#1A5232', // ✅ exact success button text (#1a5232 from component)
  contrastText: '#1A5232'
}

// 🌼 Warning — warm butter, stays in the brand's warm family
const WARNING = {
  lighter: '#FEF9EC',
  light: '#FAEAB4',
  main: '#F5D57A',
  dark: '#C9A030',
  darker: '#7A5E0A',
  contrastText: '#2C1A0E'
}

// 🌸 Error — dusty rose, soft not harsh
const ERROR = {
  lighter: '#FDF0EE',
  light: '#F5C4BB',
  main: '#E8917F',
  dark: '#C05040',
  darker: '#7A2318',
  contrastText: '#FFFFFF'
}

const COMMON = {
  common: { black: '#000000', white: '#FFFFFF' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: '#D8D2C6', // ✅ exact divider from component
  action: {
    hover: alpha('#6B5344', 0.08),
    selected: alpha('#6B5344', 0.16),
    disabled: alpha('#B8A898', 0.8),
    disabledBackground: alpha('#B8A898', 0.24),
    focus: alpha('#6B5344', 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  }
}

export function palette(mode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: '#2C1A0E', // ✅ headings, body — from component
      secondary: '#6B5344', // ✅ subtext, icons, eyebrow — from component
      disabled: '#B8A898' // ✅ placeholder color — from component
    },
    background: {
      paper: '#FFFFFF', // ✅ card background — from component
      default: '#FAFAF7', // warm near-white
      neutral: '#EDEAE2' // ✅ linen section background — from component
    },
    action: {
      ...COMMON.action,
      active: '#6B5344' // ✅ active icon/element color
    }
  }

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#F5EDE6', // warm white — stays in the peach family
      secondary: '#C4A898', // muted peach-grey
      disabled: '#6B5344'
    },
    background: {
      paper: '#2C1A0E', // ✅ dark warm brown — heading color inverted as surface
      default: '#1A0F08', // ✅ near-black espresso
      neutral: alpha('#6B5344', 0.16)
    },
    action: {
      ...COMMON.action,
      active: '#C4A898'
    }
  }

  return mode === 'light' ? light : dark
}

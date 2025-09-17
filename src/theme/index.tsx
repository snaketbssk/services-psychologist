'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider as MuiThemeProvider, ThemeOptions } from '@mui/material/styles'
import { createContext, useContext, useMemo, useState } from 'react'

import { customShadows } from './custom-shadows'
import { componentsOverrides } from './overrides'
import { palette } from './palette'
import { shadows } from './shadows'
import { typography } from './typography'

type Props = {
  children: React.ReactNode
}

type ColorModeContextType = {
  toggleColorMode: () => void
  mode: 'light' | 'dark'
}

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light'
})

export function useColorMode() {
  return useContext(ColorModeContext)
}

export default function ThemeProvider({ children }: Props) {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const toggleColorMode = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const baseOption = useMemo(
    () => ({
      palette: palette(mode),
      shadows: shadows(mode),
      customShadows: customShadows(mode),
      typography,
      shape: { borderRadius: 8 }
    }),
    [mode]
  )

  const theme = useMemo(() => {
    const t = createTheme(baseOption as ThemeOptions)
    t.components = componentsOverrides(t)
    return t
  }, [baseOption])

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  )
}

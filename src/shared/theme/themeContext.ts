import { createContext } from 'react'
import type { ThemeId, themeOptions } from './themeOptions'

export interface ThemeContextValue {
  setTheme: (theme: ThemeId) => void
  theme: ThemeId
  themes: typeof themeOptions
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

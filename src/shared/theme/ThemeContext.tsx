import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { ThemeContext } from './themeContext'
import {
  defaultThemeId,
  isThemeId,
  themeOptions,
  type ThemeId,
} from './themeOptions'

const storageKey = 'previpost:theme'

const getStoredTheme = (): ThemeId => {
  if (typeof window === 'undefined') {
    return defaultThemeId
  }

  const storedTheme = window.localStorage.getItem(storageKey)

  if (isThemeId(storedTheme)) {
    return storedTheme
  }

  if (storedTheme) {
    window.localStorage.removeItem(storageKey)
  }

  return defaultThemeId
}

function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState(getStoredTheme)

  const setTheme = useCallback((nextTheme: ThemeId) => {
    setThemeState(nextTheme)

    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(storageKey, nextTheme)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    document.documentElement.dataset.theme = theme
  }, [theme])

  const value = useMemo(
    () => ({
      setTheme,
      theme,
      themes: themeOptions,
    }),
    [setTheme, theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

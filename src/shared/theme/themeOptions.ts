export const defaultThemeId = 'dark-previpost'

export const themeOptions = [
  { id: 'dark-previpost', label: 'Dark previPost' },
  { id: 'light-previpost', label: 'Light previPost' },
  { id: 'dark-previred', label: 'Dark Previred' },
  { id: 'light-previred', label: 'Light Previred' },
] as const

export type ThemeId = (typeof themeOptions)[number]['id']

export const isThemeId = (value: string | null): value is ThemeId =>
  themeOptions.some((theme) => theme.id === value)

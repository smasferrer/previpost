export const defaultThemeId = 'dark-previpost'

export const themeOptions = [
  { id: 'dark-previpost', label: 'Dark previPost' },
  { id: 'dark-contrast', label: 'Dark alto contraste' },
  { id: 'light-neutral', label: 'Light neutral' },
  { id: 'light-warm', label: 'Light calido' },
  { id: 'light-contrast', label: 'Light alto contraste' },
  { id: 'brand-dark', label: 'Dark Previred' },
  { id: 'brand-light', label: 'Light Previred' },
] as const

export type ThemeId = (typeof themeOptions)[number]['id']

export const isThemeId = (value: string | null): value is ThemeId =>
  themeOptions.some((theme) => theme.id === value)

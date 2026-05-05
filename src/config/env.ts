const parseNumber = (value: string | undefined, fallback: number) => {
  const parsedValue = Number(value)

  return Number.isFinite(parsedValue) ? parsedValue : fallback
}

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  apiAuthToken: import.meta.env.VITE_API_AUTH_TOKEN ?? '',
  apiTimeoutMs: parseNumber(import.meta.env.VITE_API_TIMEOUT_MS, 15_000),
  securityHeaderName:
    import.meta.env.VITE_API_SECURITY_HEADER_NAME ?? 'X-Previpost-Client',
  securityHeaderValue:
    import.meta.env.VITE_API_SECURITY_HEADER_VALUE ?? 'previpost-frontend',
} as const
